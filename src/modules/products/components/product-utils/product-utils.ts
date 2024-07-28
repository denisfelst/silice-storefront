import { MatchingRowsBySize, OptionsEnum, SizeValueEnum } from "@lib/constants"
import { SelectOptions } from "../model/select-options"

// given an option, set which values will be displayed. If all of them, omit
export const checkIfFilterOutValues = (
  title: string,
  originalSelectedOptions: SelectOptions,
  selectableOptions: string[]
): any[] => {
  if (title === OptionsEnum.Row) {
    switch (true) {
      case originalSelectedOptions.size === SizeValueEnum.Ctrl:
        return MatchingRowsBySize.Ctrl
      case originalSelectedOptions.size === SizeValueEnum.Spacebar:
        return MatchingRowsBySize.Spacebar
      case originalSelectedOptions.size === SizeValueEnum.Shift:
        return MatchingRowsBySize.Shift
    }
  }
  return selectableOptions
}
