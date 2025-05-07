export interface KeyColorMap {
  [key: string]: string
}

export interface DataElement {
  label: string
  value: number
}
export interface KeystrokeData {
  key: string
  frequency: number
}

export interface FrequencyCountMap {
  [key: string]: number
}

export interface Key {
  key: string
  width?: number
  height?: number
  x?: number
  y?: number
}

export interface Row {
  keys: Key[]
}

export interface KeyboardLayout {
  rows: Row[]
} 