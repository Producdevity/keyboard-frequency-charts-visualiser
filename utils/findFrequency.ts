/**
 * find how many times string appears in string
 * @param string
 * @param query
 */
function findFrequency(string: string, query: string): number {
  let count = 0
  for (let i = 0; i < string.length; i++) {
    if (string.substring(i, i + query.length) === query) {
      count++
    }
  }
  return count
}

export default findFrequency
