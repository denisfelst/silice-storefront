import React from "react"
import { onlyUnique } from "@lib/util/only-unique"
import {
  EngravingEnum,
  MatteEnum,
  NullValue,
  OptionsEnum,
} from "@lib/constants"
import { ProductOption } from "@medusajs/medusa"
import clsx from "clsx"

type OptionSelectProps = {
  option: ProductOption
  current: string
  title: string
  updateOption: (title: string, option: Record<string, string>) => void
  checkIfFilterOutValues: (
    title: string,
    filteredOptionValues: string[]
  ) => any[]
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  title,
  updateOption,
  checkIfFilterOutValues,
}) => {
  // remove nulls from select options view
  const filteredOptionValues = option.values
    .map((v) => v.value)
    .filter(onlyUnique)
    .filter((value) => value !== NullValue)

  const finalOptionValues = ensureNoFirstYesAfter(
    checkIfFilterOutValues(title, filteredOptionValues) as string[]
  )

  function ensureNoFirstYesAfter(optionValues: string[]) {
    if (
      option.title !== OptionsEnum.Matte &&
      option.title !== OptionsEnum.Engraving
    ) {
      return optionValues
    }
    // Separate the "No" and "Yes" elements
    const noFirst = optionValues.filter((item) => item.startsWith("No_"))
    const yesSecond = optionValues.filter((item) => item.startsWith("Yes_"))

    // Return a new array with "No" first, followed by "Yes"
    return [...noFirst, ...yesSecond]
  }

  const reformatValue = (optionValue: string) => {
    switch (optionValue) {
      case MatteEnum.No:
        return "No"
      case MatteEnum.Yes:
        return "Yes"
      case EngravingEnum.No:
        return "No"
      case EngravingEnum.Yes:
        return "Yes"
      default:
        return optionValue
    }
  }

  const reformatTitle = (title: string) => {
    // switch (title) {} // Extend if needed
    return title
  }

  return (
    <div className="flex flex-col gap-y-4">
      <span className="text-base font-semibold text-gray-900">
        Select {reformatTitle(title)}
      </span>
      <div className="flex flex-wrap gap-3">
        {finalOptionValues.map((optionValue) => (
          <button
            onClick={() =>
              updateOption(optionValue, { [option.id]: optionValue })
            }
            key={optionValue}
            className={clsx(
              "border border-gray-200 bg-transparent text-gray-800 text-sm font-medium rounded py-2 px-4 flex-1 transition-colors duration-200",
              {
                " text-black border-[#87c4ef] border-[3px]":
                  optionValue === current,
                "hover:bg-gray-100": optionValue !== current,
              }
            )}
          >
            {reformatValue(optionValue)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default OptionSelect
