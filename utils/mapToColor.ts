import keyColorMap from '../data/keyColorMap'
import removeBrackets from './removeBrackets'

function mapToColor(key: string) {
  return keyColorMap[removeBrackets(key)] ?? '#fff'
}

export default mapToColor
