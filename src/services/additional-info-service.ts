import { InfoObjectType } from "@lib/constants"

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"

export const handleAdditionalInfoSubmission = async (
  additionalInfo: InfoObjectType[]
) => {
  await Promise.all(
    additionalInfo.map(async (item, index) => {
      const variant_id = item.variant_id
      const variant_title = item.variant_title
      const letters = item.letters

      console.log(variant_id, variant_title, letters)
      console.log("->", JSON.stringify({ variant_id, variant_title, letters }))

      // submission to write on google spreadsheet
      const response = await fetch(`${API_BASE_URL}/api/submission`, {
        method: "POST",
        // prettier-ignore
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ variant_id, variant_title, letters, index }),
      })
    })
  )
}
