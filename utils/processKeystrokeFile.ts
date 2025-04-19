import { KeystrokeData, FrequencyCountMap } from '../types'

export const processKeystrokeFile = (fileContent: string): KeystrokeData[] => {
  try {
    // Split the content into lines and filter out empty lines
    const lines = fileContent.split('\n').filter(line => line.trim())
    
    // Create a map to count frequencies
    const frequencyMap: FrequencyCountMap = {}
    
    // Process each line
    lines.forEach(line => {
      // Split the line into timestamp and key
      const [_, key] = line.split(' ')
      
      if (key) {
        // Normalize the key (remove brackets if present)
        const normalizedKey = key.replace(/[\[\]]/g, '')
        
        // Increment the count for this key
        frequencyMap[normalizedKey] = (frequencyMap[normalizedKey] || 0) + 1
      }
    })
    
    // Convert the map to an array of KeystrokeData
    return Object.entries(frequencyMap).map(([key, frequency]) => ({
      key,
      frequency
    }))
  } catch (error) {
    console.error('Error processing keystroke file:', error)
    return []
  }
} 