import { KeystrokeData, FrequencyCountMap } from '../types'

export const processKeystrokeFile = (fileContent: string): KeystrokeData[] => {
  try {
    // Create a map to count frequencies
    const frequencyMap: FrequencyCountMap = {}
    
    // First, normalize the content to handle potential irregularities
    // Replace consecutive '[' characters with a single '['
    let normalizedContent = fileContent.replace(/\[+/g, '[');
    
    // Replace malformed bracket sequences
    normalizedContent = normalizedContent.replace(/\[\\/g, '[');
    
    // Regular expression to match properly formed bracketed keys or individual characters
    const keyRegex = /\[([^\]]+)\]|[a-zA-Z0-9-_+;:'",.\/\\<>?!@#$%^&*()=]/g;
    
    // Process the entire content as a stream of keystrokes
    let match;
    while ((match = keyRegex.exec(normalizedContent)) !== null) {
      // The match will either be a character or a bracketed key
      let key = match[0];
      
      // If it's a bracketed key, extract the contents
      if (key.startsWith('[') && key.endsWith(']')) {
        key = match[1]; // Use the captured group (contents inside brackets)
        
        // Skip empty keys
        if (!key || key.trim() === '') continue;
        
        // Normalize modifier key names
        if (key.includes('ctrl')) key = 'ctrl';
        else if (key.includes('shift')) key = 'shift';
        else if (key.includes('option') || key.includes('alt')) key = 'alt';
        else if (key.includes('cmd') || key.includes('command')) key = 'cmd';
        else if (key.includes('return')) key = 'return';
        else if (key.includes('del') || key.includes('delete')) key = 'delete';
        else if (key.includes('tab')) key = 'tab';
        else if (key.includes('esc')) key = 'esc';
      }
      
      // Increment the count for this key
      frequencyMap[key] = (frequencyMap[key] || 0) + 1;
    }
    
    // Convert the map to an array of KeystrokeData
    return Object.entries(frequencyMap)
      .map(([key, frequency]) => ({
        key,
        frequency
      }))
      .filter(item => item.key !== ' ' && item.key !== '\n' && item.key !== '\r') // Filter out spaces and newlines
      .sort((a, b) => b.frequency - a.frequency); // Sort by frequency in descending order
  } catch (error) {
    console.error('Error processing keystroke file:', error)
    return []
  }
} 