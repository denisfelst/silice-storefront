import { FormEvent, useState } from "react"

const AdditionalInfo = () => {
  const API_BASE_URL = "http://localhost:8000"

  const [info, setInfo] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sessionStorage.setItem("selectedValue", info)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter Info</label>
        <input
          style={{ border: "1px solid red" }}
          onChange={(e) => setInfo(e.target.value)}
        ></input>

        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AdditionalInfo
