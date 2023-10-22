import React from "react"
import { onlyUnique } from "@lib/util/only-unique"
import { ProductOption } from "@medusajs/medusa"
import clsx from "clsx"

type OptionSelectProps = {
  option: ProductOption
  current: string
  updateOption: (title: string, option: Record<string, string>) => void
  title: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
}) => {
  const validOptions = option.values
    .map((v) => v.value)
    .filter(onlyUnique)
    .filter((value) => value !== "null")

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-base-semi">Select {title}</span>
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
        {validOptions.map((v) => {
          return (
            <button
              onClick={() => updateOption(v, { [option.id]: v })}
              key={v}
              className={clsx(
                "border-gray-200 border text-xsmall-regular h-[50px] transition-all duration-200",
                { "border-gray-900": v === current }
              )}
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
