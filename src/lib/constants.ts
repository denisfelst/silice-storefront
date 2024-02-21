export const IS_BROWSER = typeof window !== "undefined"

// Product
export const FORMAT_KEY = "opt_01HMRKW3F1VFWRAH2831J7MHP1"
export const TYPE_KEY = "opt_01HMRKQP22BV745ZN80A6QDXN4"
export const SIZE_KEY = "opt_01HMRKQP21FVQPJW0CDFQMSN96"
export const ENGRAVING_KEY = "prod_01HMRKDQTD8KXE6ABM903H6N74" 


export const NullValue = "Null"

export enum ColorValueEnum {
  Red = "Red",
  Blue = "Blue",
  Yellow = "Yellow",
  Green = "Green",
}

export enum FormatValueEnum {
  Group = "Group",
  Single = "Single",
}

export enum TypeValueEnum {
  Asdw = "Asdw",
  Arrows = "Arrows",
  FRow = "FRow",
}

export enum SizeValueEnum {
  Unit = "Unit",
  Shift = "Shift",
  Ctrl = "Ctrl",
  Spacebar = "Spacebar",
}

export enum OptionsEnum {
  Format = "Format",
  Size = "Size",
  Type = "Type",
  Engraving = "Engraving",
}

export enum AdditionalInfoEnum {
  Letter = "Letter",
  Comments = "Comments",
}

export enum EngravingEnum {
  Yes = "Yes",
  No = "No",
}

export enum ProfileEnum {
  R1 = "R1",
  R2 = "R2",
  R3 = "R3",
  R4 = "R4",
}

export type InfoObjectType = {
  variant_id: string
  variant_title: string
  letters: string
  index?: number
}
