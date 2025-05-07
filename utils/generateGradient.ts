import { KeystrokeData } from '@/types'

/**
 * Generates a gradient color for a given index and sorted data (blue to red)
 *
 * @param index - The index of the data item
 * @param sortedData - The sorted data array
 * @returns A CSS color string in HSL format
 */
function generateGradient(index: number, sortedData: KeystrokeData[]) {
  const hue = 240 - (index / sortedData.length) * 240
  return `hsl(${hue}, 80%, 60%)`
}

export default generateGradient
