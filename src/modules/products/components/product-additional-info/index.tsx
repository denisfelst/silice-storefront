import {
  ChangeEvent,
  ForwardRefRenderFunction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react"

interface AdditionalInfoProps {
  getInfo: (info: string) => void
}

const AdditionalInfo: ForwardRefRenderFunction<any, AdditionalInfoProps> = (
  { getInfo },
  ref
) => {
  const [info, setInfo] = useState("")

  useEffect(() => {
    getInfo(info)
  }, [info, getInfo])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setInfo(e.target.value)
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
      <br />
      <input
        style={{ border: "1px solid red" }}
        onChange={(e) => handleChange(e)}
      ></input>
    </div>
  )
}

export default forwardRef(AdditionalInfo)
