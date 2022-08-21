import { FrequencyCountMap } from '../types'

function createFrequencyCountMap(keystrokesArray: string[]): FrequencyCountMap {
  return keystrokesArray.reduce((acc: any, curr: string) => {
    acc[curr] = acc[curr] ? acc[curr] + 1 : 1
    return acc
  }, {})
}

export default createFrequencyCountMap
