import { KeystrokeData } from '@/types'
import findFrequency from './findFrequency'
import splitKeystrokes from './splitKeystrokes'
import { uniqBy } from 'lodash'

const mapToInterface = (keystrokes: string, key: string): KeystrokeData => ({
  key,
  frequency: findFrequency(keystrokes, key),
})

// map to KeystrokeData
function mapKeystrokeData(keystrokes: string): KeystrokeData[] {
  const keystrokesArray: string[] = splitKeystrokes(keystrokes)

  const keystrokesData: KeystrokeData[] = keystrokesArray.map((key) =>
    mapToInterface(keystrokes, key),
  )

  const filteredKeystrokesData: KeystrokeData[] = uniqBy(keystrokesData, 'key')

  return filteredKeystrokesData.sort((a, b) => b.frequency - a.frequency)
}

export default mapKeystrokeData
