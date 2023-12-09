import { NextApiRequest, NextApiResponse } from "next"
import { google } from "googleapis"

type SheetForm = {
  info1: string
  info2: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" })
  }

  const body = req.body as SheetForm

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    })

    const sheets = google.sheets({
      auth,
      version: "v4",
    })

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A1:B1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[body.info1, body.info2]],
      },
    })

    return res.status(200).json({
      data: response.data,
    })
  } catch (e: any) {
    console.error("Error accessing spreadsheet")
    return res.status(e.code).send({ message: e.message })
  }
}
