import {
  EngravingEnum,
  FormatValueEnum,
  NullValue,
  OptionsEnum,
  SizeValueEnum,
  CombinationValueEnum,
  ProfileValueEnum,
  RowValueEnum,
} from "@lib/constants"

export class SelectOptions {
  public format: FormatValueEnum | typeof NullValue
  public profile: ProfileValueEnum | typeof NullValue
  public size: SizeValueEnum | typeof NullValue
  public row: RowValueEnum | typeof NullValue
  public combination: CombinationValueEnum | typeof NullValue
  public engraving: EngravingEnum | typeof NullValue

  constructor(obj?: {
    format: FormatValueEnum | typeof NullValue
    profile: ProfileValueEnum | typeof NullValue
    size: SizeValueEnum | typeof NullValue
    row: RowValueEnum | typeof NullValue
    combination: CombinationValueEnum | typeof NullValue
    engraving: EngravingEnum | typeof NullValue
  }) {
    this.format = obj?.format ?? NullValue
    this.profile = obj?.profile ?? NullValue
    this.size = obj?.size ?? NullValue
    this.row = obj?.row ?? NullValue
    this.combination = obj?.combination ?? NullValue
    this.engraving = obj?.engraving ?? NullValue
  }

  public isSelectionComplete(engravingValue?: string): boolean {
    if (this.format === NullValue) {
      return false
    }
    if (this.combination === NullValue && this.size === NullValue && this.profile === NullValue) {
      return false
    }
    if (this.engraving === NullValue) {
      return false
    }
    if (this.format === FormatValueEnum.Single && (this.profile === NullValue || this.size === NullValue || this.row === NullValue)){
      return false
    }
    if (this.format === FormatValueEnum.Single && this.engraving === EngravingEnum.Yes) {
      // engraving letter value from user input
      if (!engravingValue || engravingValue === "") {
        return false
      }
    }
    return true
  }

  public getFullTitle(): string {
    return `Format: ${this.format}, Profile: ${this.profile}, Size: ${this.size}, Row: ${this.profile}, Combination Type: ${this.combination}, Engraving: ${this.engraving}`
  }

  public getOrderedOptions(): string[] {
    return [
      OptionsEnum.Format as string,
      OptionsEnum.Profile as string,
      OptionsEnum.Size as string,
      OptionsEnum.Row as string,
      OptionsEnum.Combination as string,
      OptionsEnum.Engraving as string,
    ]
  }

  public setValue(value: string): void {
    if (!value) {
      console.error("setValue error - type undefined", value)
    }

    if (value === NullValue) {
      console.log("setValue error - value is null", value)
    }

    switch (value.trim()) {

      case FormatValueEnum.Single as string:
        this.format = FormatValueEnum.Single
        this.combination = NullValue
        break
      case FormatValueEnum.Group as string:
        this.format = FormatValueEnum.Group
        this.size = NullValue
        break

      case ProfileValueEnum.OEM as string:
        this.profile = ProfileValueEnum.OEM
        this.combination = NullValue
        break
      case ProfileValueEnum.SA as string:
        this.profile = ProfileValueEnum.SA
        this.size = NullValue
        break

      case SizeValueEnum.Unit as string:
        this.size = SizeValueEnum.Unit
        break
      case SizeValueEnum.Ctrl as string:
        this.size = SizeValueEnum.Ctrl
        break
      case SizeValueEnum.Shift as string:
        this.size = SizeValueEnum.Shift
        break
      case SizeValueEnum.Spacebar as string:
        this.size = SizeValueEnum.Spacebar
        break

      case RowValueEnum.R1 as string:
        this.row = RowValueEnum.R1
        break
      case RowValueEnum.R2 as string:
        this.row = RowValueEnum.R2
        break
      case RowValueEnum.R3 as string:
        this.row = RowValueEnum.R3
        break
      case RowValueEnum.R4 as string:
        this.row = RowValueEnum.R4
        break

      case CombinationValueEnum.Asdw as string:
        this.combination = CombinationValueEnum.Asdw
        break
      case CombinationValueEnum.Arrows as string:
        this.combination = CombinationValueEnum.Arrows
        break
      case CombinationValueEnum.FRow as string:
        this.combination = CombinationValueEnum.FRow
        break
      case CombinationValueEnum.CWA as string:
        this.combination = CombinationValueEnum.CWA
        break
      case CombinationValueEnum.SpecialsLeft as string:
        this.combination = CombinationValueEnum.SpecialsLeft
        break
      case CombinationValueEnum.ModifierLeft as string:
        this.combination = CombinationValueEnum.ModifierLeft
        break
      case CombinationValueEnum.Numpad as string:
        this.combination = CombinationValueEnum.Numpad
        break

      case EngravingEnum.Yes as string:
        this.engraving = EngravingEnum.Yes
        break
      case EngravingEnum.No as string:
        this.engraving = EngravingEnum.No
        break
    }
  }

  public resetOptions(): void {
    this.format = NullValue
    this.profile = NullValue
    this.size = NullValue
    this.row = NullValue
    this.combination = NullValue
    this.engraving = NullValue
  }
}
