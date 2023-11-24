import { FormatValueEnum, SizeValueEnum, TypeValueEnum } from "./constants"

export class SelectOptions {
  public format: FormatValueEnum = FormatValueEnum.Null
  public type: TypeValueEnum = TypeValueEnum.Null
  public size: SizeValueEnum = SizeValueEnum.Null

  public resetOptions(): void {
    this.format = FormatValueEnum.Null
    this.type = TypeValueEnum.Null
    this.size = SizeValueEnum.Null
  }
}
