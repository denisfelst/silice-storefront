export const IS_BROWSER = typeof window !== "undefined"

// Product
export const FORMAT_KEY = "opt_01HQBPQKVSDXKB9YRJZ17QMZ6A"
export const TYPE_KEY = "opt_01HQBPQM12PBBTGXS75FCE6F85"
export const SIZE_KEY = "opt_01HQBPQM0XGBH3NEQG0GZ3JEJV"
export const ENGRAVING_KEY = "opt_01HQBPQM174M682MD2CYPB1Q0D" 
export const PROFILE_KEY= "prod_01HQBMQAXYAD4QXXVF405YDDCS" // not being used rn 


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
