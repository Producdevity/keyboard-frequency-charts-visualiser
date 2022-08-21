export interface KeystrokeData {
  key: string
  frequency: number
}

export interface KeyColorMap {
  [key: string]: string
}

export interface FrequencyCountMap {
  [key: string]: number
}

export interface DataElement {
  label: string
  value: number
}
