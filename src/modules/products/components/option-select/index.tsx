import React from "react"
import { onlyUnique } from "@lib/util/only-unique"
import {
  EngravingEnum,
  MatteEnum,
  NullValue,
  RowValueEnum,
} from "@lib/constants"
import { ProductOption } from "@medusajs/medusa"
import clsx from "clsx"

type OptionSelectProps = {
  option: ProductOption
  current: string
  title: string
  updateOption: (title: string, option: Record<string, string>) => void
  checkIfFilterOutValues: (title: string, selectableOptions: string[]) => any[]
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  title,
  updateOption,
  checkIfFilterOutValues,
}) => {
  // remove nulls from select options view
  let selectableOptions = option.values
    .map((v) => v.value)
    .filter(onlyUnique)
    .filter((value) => value !== NullValue)

  selectableOptions = checkIfFilterOutValues(title, selectableOptions)

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
    <div className="flex flex-col gap-y-3">
      <span className="text-sm">Select {reformatTitle(title)}</span>
      <div className="flex flex-wrap justify-between gap-2">
        {selectableOptions.map((optionValue) => {
          return (
            <button
              onClick={() =>
                updateOption(optionValue, { [option.id]: optionValue })
              }
              key={optionValue}
              className={clsx(
                "border-ui-border-base bg-ui-bg-subtle border text-small-regular h-10 rounded-rounded p-2 flex-1 ",
                {
                  "border-ui-border-interactive": optionValue === current,
                  "hover:shadow-elevation-card-rest transition-shadow ease-in-out duration-150":
                    optionValue !== current,
                }
              )}
            >
              {reformatValue(optionValue)}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
