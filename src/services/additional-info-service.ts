import { InfoObjectType } from "@lib/constants"

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"

export const handleAdditionalInfoSubmission = async (
  additionalInfo: InfoObjectType[],
  email?: string
) => {
  let indexArr: string[] = []
  let variantIdArr: string[] = []
  let variantTitleArr: string[] = []
  let letterArr: string[] = []
  let commentArr: string[] = []

  const arr = []

  for (let i = 0; i < 50; i++) {
    const value = localStorage.getItem(`item${i}`)
    if (value) {
      arr.push(value)
    }
  }

  arr.forEach((str) => {
    // Split the string into its components
    const [variantd, title, letters, comments] = str.split(" // ")

    // Push the components into their respective arrays
    variantIdArr.push(variantd)
    variantTitleArr.push(title)
    letterArr.push(letters)
    commentArr.push(comments)
  })

  const index = arr.length
  const variant_id = variantIdArr.join(" // ")
  const variant_title = variantTitleArr.join(" // ")
  const letters = letterArr.join(" // ")
  const comments = commentArr.join(" // ")

  // submission to write on google spreadsheet
  const response = await fetch(`${API_BASE_URL}/api/submission`, {
    method: "POST",
    // prettier-ignore
    headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
      },
    body: JSON.stringify({
      index,
      variant_id,
      variant_title,
      email,
      letters,
      comments,
    }),
  })
  return response
}
