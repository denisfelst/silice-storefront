import {
  EngravingEnum,
  FormatValueEnum,
  NullValue,
  OptionsEnum,
  SizeValueEnum,
  CombinationValueEnum,
  ProfileValueEnum,
  RowValueEnum,
  MatteEnum,
} from "@lib/constants"

export class SelectOptions {
  public format: FormatValueEnum | typeof NullValue
  public profile: ProfileValueEnum | typeof NullValue
  public size: SizeValueEnum | typeof NullValue
  public row: RowValueEnum | typeof NullValue
  public combination: CombinationValueEnum | typeof NullValue
  public matte: MatteEnum | typeof NullValue
  public engraving: EngravingEnum | typeof NullValue

  constructor(obj?: {
    format: FormatValueEnum | typeof NullValue
    profile: ProfileValueEnum | typeof NullValue
    size: SizeValueEnum | typeof NullValue
    row: RowValueEnum | typeof NullValue
    combination: CombinationValueEnum | typeof NullValue
    matte: MatteEnum | typeof NullValue
    engraving: EngravingEnum | typeof NullValue
  }) {
    this.format = obj?.format ?? NullValue
    this.profile = obj?.profile ?? NullValue
    this.size = obj?.size ?? NullValue
    this.row = obj?.row ?? NullValue
    this.combination = obj?.combination ?? NullValue
    this.matte = obj?.matte ?? NullValue
    this.engraving = obj?.engraving ?? NullValue
  }

  public isSelectionComplete(engravingValue?: string): boolean {
    if (this.format === NullValue) {
      return false
    }
    if (
      this.combination === NullValue &&
      this.size === NullValue &&
      this.profile === NullValue
    ) {
      return false
    }
    if (this.engraving === NullValue) {
      return false
    }
    if (
      this.format === FormatValueEnum.Single &&
      (this.profile === NullValue ||
        this.size === NullValue ||
        this.row === NullValue ||
        this.matte === NullValue)
    ) {
      return false
    }
    if (
      this.format === FormatValueEnum.Single &&
      this.engraving === EngravingEnum.Yes
    ) {
      // engraving letter value from user input
      if (!engravingValue || engravingValue === "") {
        return false
      }
    }
    return true
  }

  public getFullTitle(): string {
    return `Format: ${this.format}, Profile: ${this.profile}, Size: ${this.size}, Row: ${this.row}, Combination Type: ${this.combination}, Matte: ${this.matte}, Engraving: ${this.engraving}`
  }

  public getOrderedOptions(): string[] {
    return [
      OptionsEnum.Format as string,
      OptionsEnum.Profile as string,
      OptionsEnum.Size as string,
      OptionsEnum.Row as string,
      OptionsEnum.Combination as string,
      OptionsEnum.Matte as string,
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
        this.resetAllGroup()
        break
      case FormatValueEnum.Group as string:
        this.format = FormatValueEnum.Group
        this.resetAllSingle()
        break

      case ProfileValueEnum.OEM as string:
        this.profile = ProfileValueEnum.OEM
        this.resetOption(OptionsEnum.Size)
        this.resetOption(OptionsEnum.Row)
        this.resetOption(OptionsEnum.Matte)
        this.resetOption(OptionsEnum.Engraving)
        break
      case ProfileValueEnum.SA as string:
        this.profile = ProfileValueEnum.SA
        this.resetOption(OptionsEnum.Size)
        this.resetOption(OptionsEnum.Row)
        this.resetOption(OptionsEnum.Matte)
        this.resetOption(OptionsEnum.Engraving)
        break

      case SizeValueEnum.Unit as string:
        this.size = SizeValueEnum.Unit
        this.resetOption(OptionsEnum.Row)
        this.resetOption(OptionsEnum.Matte)
        this.resetOption(OptionsEnum.Engraving)
        break
      case SizeValueEnum.Ctrl as string:
        this.size = SizeValueEnum.Ctrl
        this.resetOption(OptionsEnum.Row)
        this.resetOption(OptionsEnum.Matte)
        this.resetOption(OptionsEnum.Engraving)
        break
      case SizeValueEnum.Shift as string:
        this.size = SizeValueEnum.Shift
        this.resetOption(OptionsEnum.Row)
        this.resetOption(OptionsEnum.Matte)
        this.resetOption(OptionsEnum.Engraving)
        break
      case SizeValueEnum.Spacebar as string:
        this.size = SizeValueEnum.Spacebar
        this.resetOption(OptionsEnum.Row)
        this.resetOption(OptionsEnum.Matte)
        this.resetOption(OptionsEnum.Engraving)
        break

      case RowValueEnum.R1 as string:
        this.row = RowValueEnum.R1
        this.resetOption(OptionsEnum.Matte)
        this.resetOption(OptionsEnum.Engraving)
        break
      case RowValueEnum.R2 as string:
        this.row = RowValueEnum.R2
        this.resetOption(OptionsEnum.Matte)
        this.resetOption(OptionsEnum.Engraving)
        break
      case RowValueEnum.R3 as string:
        this.row = RowValueEnum.R3
        this.resetOption(OptionsEnum.Matte)
        this.resetOption(OptionsEnum.Engraving)
        break
      case RowValueEnum.R4 as string:
        this.row = RowValueEnum.R4
        this.resetOption(OptionsEnum.Matte)
        this.resetOption(OptionsEnum.Engraving)
        break

      case CombinationValueEnum.Asdw as string:
        this.combination = CombinationValueEnum.Asdw
        this.resetOption(OptionsEnum.Matte)
        this.resetOption(OptionsEnum.Engraving)
        break
      case CombinationValueEnum.Arrows as string:
        this.combination = CombinationValueEnum.Arrows
        this.resetOption(OptionsEnum.Matte)
        this.resetOption(OptionsEnum.Engraving)
        break
      case CombinationValueEnum.FRow as string:
        this.combination = CombinationValueEnum.FRow
        this.resetOption(OptionsEnum.Matte)
        this.resetOption(OptionsEnum.Engraving)
        break
      case CombinationValueEnum.CWA as string:
        this.combination = CombinationValueEnum.CWA
        this.resetOption(OptionsEnum.Matte)
        this.resetOption(OptionsEnum.Engraving)
        break
      case CombinationValueEnum.SpecialsLeft as string:
        this.combination = CombinationValueEnum.SpecialsLeft
        this.resetOption(OptionsEnum.Matte)
        this.resetOption(OptionsEnum.Engraving)
        break
      case CombinationValueEnum.ModifierLeft as string:
        this.combination = CombinationValueEnum.ModifierLeft
        this.resetOption(OptionsEnum.Matte)
        this.resetOption(OptionsEnum.Engraving)
        break
      case CombinationValueEnum.Numpad as string:
        this.combination = CombinationValueEnum.Numpad
        this.resetOption(OptionsEnum.Matte)
        this.resetOption(OptionsEnum.Engraving)
        break

      case MatteEnum.Yes as string:
        this.matte = MatteEnum.Yes
        this.resetOption(OptionsEnum.Engraving)
        break
      case MatteEnum.No as string:
        this.matte = MatteEnum.No
        this.resetOption(OptionsEnum.Engraving)

        break

      case EngravingEnum.Yes as string:
        this.engraving = EngravingEnum.Yes
        break
      case EngravingEnum.No as string:
        this.engraving = EngravingEnum.No
        break
    }
  }

  public resetAllOptions(): void {
    this.format = NullValue
    this.profile = NullValue
    this.size = NullValue
    this.row = NullValue
    this.combination = NullValue
    this.matte = NullValue
    this.engraving = NullValue
  }
  public resetOption(option?: OptionsEnum): void {
    if (!option) return

    if (option === OptionsEnum.Format) {
      this.format = NullValue
      return
    }
    if (option === OptionsEnum.Profile) {
      this.profile = NullValue
      return
    }
    if (option === OptionsEnum.Size) {
      this.size = NullValue
      return
    }
    if (option === OptionsEnum.Row) {
      this.row = NullValue
      return
    }
    if (option === OptionsEnum.Combination) {
      this.combination = NullValue
      return
    }
    if (option === OptionsEnum.Matte) {
      this.matte = NullValue
      return
    }
    if (option === OptionsEnum.Engraving) {
      this.engraving = NullValue
      return
    }
  }

  private resetAllSingle() {
    this.profile = NullValue
    this.size = NullValue
    this.row = NullValue
    this.matte = NullValue
    this.engraving = NullValue
  }

  private resetAllGroup() {
    this.combination = NullValue
    this.matte = NullValue
    this.engraving = NullValue
  }
}
