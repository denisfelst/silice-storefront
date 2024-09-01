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

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
    <>
      {showLetterInput || showCommentInput ? (
        <div className="additional-info-container bg-white mt-4 p-6 rounded-lg shadow-lg border border-gray-200">
          {showLetterInput && (
            <div className="additional-info-field mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Enter character(s) to engrave (max.{" "}
                <span className="font-bold">{getCharLimit()}</span> chars -
                <span className="font-bold"> case sensitive!</span>)
              </label>
              <input
                type="text"
                maxLength={getCharLimit()}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-[#87c4ef] focus:ring-[#87c4ef] focus:ring-opacity-50 transition-colors duration-300"
                onChange={handleCharacterChange}
              />
              <div className="border-b border-gray-200 pb-4 mb-2"></div>
            </div>
          )}

          {showCommentInput && (
            <div className="additional-info-field">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Any additional comments or observations? (Optional)
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-[#87c4ef] focus:ring-[#87c4ef] focus:ring-opacity-50 transition-colors duration-300"
                onChange={handleCommentChange}
              />
            </div>
          )}
        </div>
      ) : null}
    </>
  )
}

export default forwardRef(AdditionalInfo)
