import { FormEvent, useState } from "react"

const AdditionalInfo = () => {
  const [info1, setInfo1] = useState("")
  const [info2, setInfo2] = useState("")
  const API_BASE_URL = "http://localhost:8000"

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let form = {
      info1,
      info2,
    }

    // submission to write on google spreadsheet
    const response = await fetch(`${API_BASE_URL}/api/submission`, {
      method: "POST",
      // prettier-ignore
      headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
      body: JSON.stringify(form),
    })

    const content = await response.json()
    console.log("content => ", content)
    setInfo1("1")
    setInfo2("2")

    setInfo1("")
    setInfo2("")
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter Info1</label>
        <input onChange={(e) => setInfo1(e.target.value)}></input>
        <label>Enter Info2</label>
        <input onChange={(e) => setInfo2(e.target.value)}></input>

        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AdditionalInfo
