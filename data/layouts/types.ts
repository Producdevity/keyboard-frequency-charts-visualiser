export interface KeyPosition {
  row: number
  col: number
  width?: number
}

export interface KeyData {
  key: string
  label?: string
  position: KeyPosition
  isModifier?: boolean
}

export type KeyboardLayout = KeyData[][]
