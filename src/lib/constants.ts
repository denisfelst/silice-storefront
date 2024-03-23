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

// -----

export enum OptionsEnum {
  Format = "Format",
  Profile = "Profile",
  Size = "Size",
  Row = "Row",
  Combination = "Combination",
  Engraving = "Character Engraving",
}

// -----

export enum FormatValueEnum {
  Group = "Group",
  Single = "Single",
}


export enum ProfileValueEnum {
  SA = "SA",
  OEM = "OEM",
}

export enum SizeValueEnum {
  Unit = "1u",
  Shift = "1.25u",
  Ctrl = "2.25u",
  Spacebar = "6.25u",
}

export enum RowValueEnum {
  R1 = "R1",
  R2 = "R2",
  R3 = "R3",
  R4 = "R4",
}

export enum CombinationValueEnum {
  Asdw = "Asdw",
  Arrows = "Arrows",
  FRow = "F-Row",
  CWA = "Ctrl + Win + Alt Left",
  ModifierLeft = "Modifier Keys Left",
  Numpad = "Numpad",
  SpecialsLeft = "Lateral Left",
}

export enum EngravingEnum {
  Yes = "Yes",
  No = "No",
}

// -----

export enum AdditionalInfoEnum {
  Letter = "Letter",
  Comments = "Comments",
}


export type InfoObjectType = {
  variant_id: string
  variant_title: string
  letters: string
  index?: number
}
