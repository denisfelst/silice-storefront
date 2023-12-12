import React from "react"
import { onlyUnique } from "@lib/util/only-unique"
import { NullValue } from "@lib/constants"
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
  // remove nulls from select options view
  const selectableOptions = option.values
    .map((v) => v.value)
    .filter(onlyUnique)
    .filter((value) => value !== NullValue)

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-sm">Select {title}</span>
      <div className="flex flex-wrap justify-between gap-2">
        {selectableOptions.map((v) => {
          return (
            <button
              onClick={() => updateOption(v, { [option.id]: v })}
              key={v}
              className={clsx(
                "border-ui-border-base bg-ui-bg-subtle border text-small-regular h-10 rounded-rounded p-2 flex-1 ",
                {
                  "border-ui-border-interactive": v === current,
                  "hover:shadow-elevation-card-rest transition-shadow ease-in-out duration-150":
                    v !== current,
                }
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
