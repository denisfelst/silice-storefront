import {
  FormatValueEnum,
  NullValue,
  SizeValueEnum,
  TypeValueEnum,
  EngravingEnum,
} from "./constants"

export class SelectOptions {
  public format: FormatValueEnum | typeof NullValue
  public type: TypeValueEnum | typeof NullValue
  public size: SizeValueEnum | typeof NullValue
  public engraving: EngravingEnum | typeof NullValue

  constructor(obj?: {
    format: FormatValueEnum | typeof NullValue
    type: TypeValueEnum | typeof NullValue
    size: SizeValueEnum | typeof NullValue
    engraving: EngravingEnum | typeof NullValue
  }) {
    this.format = obj?.format ?? NullValue
    this.type = obj?.type ?? NullValue
    this.size = obj?.size ?? NullValue
    this.engraving = obj?.engraving ?? NullValue
  }

  public isSelectionComplete(): boolean {
    if (this.type === NullValue && this.size === NullValue) {
      return false
    }
    return true
  }

  public setValue(value: string): void {
    if (!value) {
      console.error("setValue error - type undefined", value)
    }

    if (value === NullValue) {
      console.log("setValue error - value is null", value)
    }

    switch (value) {
      case FormatValueEnum.Single as string:
        this.format = FormatValueEnum.Single
        this.type = NullValue
        break
      case FormatValueEnum.Group as string:
        this.format = FormatValueEnum.Group
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

      case TypeValueEnum.Asdw as string:
        this.type = TypeValueEnum.Asdw
        break
      case TypeValueEnum.Arrows as string:
        this.type = TypeValueEnum.Arrows
        break
      case TypeValueEnum.FRow as string:
        this.type = TypeValueEnum.FRow
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
    this.type = NullValue
    this.size = NullValue
  }
}
