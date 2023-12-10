const API_BASE_URL = "http://localhost:8000"

export const handleAdditionalInfoSubmission = async (
  orderId: string,
  email: string
) => {
  // Retrieve color from session storage TEMPORARY
  const selectedValue = sessionStorage.getItem("selectedValue")

  // submission to write on google spreadsheet
  const response = await fetch(`${API_BASE_URL}/api/submission`, {
    method: "POST",
    // prettier-ignore
    headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
    body: JSON.stringify({ orderId, email, selectedValue }),
  })
}
