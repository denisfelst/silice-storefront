import { SizeValueEnum } from "@lib/constants"
import {
  ChangeEvent,
  ForwardRefRenderFunction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react"

interface AdditionalInfoProps {
  showLetterInput: boolean
  showCommentInput: boolean
  selectedSize: string
  getAdditionalInfo: (info: AdditionalInfoType) => void
}

export class AdditionalInfoType {
  character: string
  comment: string

  constructor(character: string, comment: string) {
    this.character = character
    this.comment = comment
  }
}

const AdditionalInfo: ForwardRefRenderFunction<any, AdditionalInfoProps> = (
  { getAdditionalInfo, showLetterInput, showCommentInput, selectedSize },
  ref
) => {
  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfoType>(
    new AdditionalInfoType("", "")
  )

  useEffect(() => {
    getAdditionalInfo(additionalInfo)
  }, [additionalInfo, getAdditionalInfo])

  const handleCharacterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAdditionalInfo(
      new AdditionalInfoType(e.target.value, additionalInfo.comment)
    )
  }

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAdditionalInfo(
      new AdditionalInfoType(additionalInfo.character, e.target.value)
    )
  }

  const getCharLimit = () => {
    // setAdditionalInfo(new AdditionalInfoType("",""))
    switch (selectedSize) {
      case SizeValueEnum.Spacebar:
      case SizeValueEnum.Shift:
        return 8
      case SizeValueEnum.Ctrl:
        return 4
      case SizeValueEnum.Shift:
        return 3
      default:
        return 3
    }
  }

  const resetInfo = () => {
    setAdditionalInfo(new AdditionalInfoType("", ""))
  }

  useImperativeHandle(ref, () => ({
    resetInfo,
  }))

  return (
    <div className="additionalInfo">
      {showLetterInput && (
        <div className="additionalInfo-character">
          <label>Enter Character (max {getCharLimit()} chars)</label>
          <br />
          <input
            maxLength={getCharLimit()}
            style={{ border: "1px solid red" }}
            onChange={handleCharacterChange}
          />
        </div>
      )}
      {showCommentInput && (
        <div className="additionalInfo-comment">
          <label>Any additional comments or observations?</label>
          <br />
          <input
            style={{ border: "1px solid blue" }}
            onChange={handleCommentChange}
          />
        </div>
      )}
    </div>
  )
}

export default forwardRef(AdditionalInfo)
