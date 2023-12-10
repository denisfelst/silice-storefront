import {
  ChangeEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react"

const AdditionalInfo = forwardRef(function AdditionalInfo(props, ref) {
  const [info, setInfo] = useState("")

  const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const delayDebounceFn = setTimeout(() => {
      sessionStorage.setItem("selectedValue", e.target.value)
      setInfo(e.target.value)
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }

  const resetInfo = () => {
    setInfo("")
  }

  useImperativeHandle(ref, () => ({
    resetInfo,
  }))

  return (
    <div>
      <label>Enter Info</label>
      <input
        style={{ border: "1px solid red" }}
        onChange={(e) => handleSubmit(e)}
      ></input>
    </div>
  )
})

export default AdditionalInfo
