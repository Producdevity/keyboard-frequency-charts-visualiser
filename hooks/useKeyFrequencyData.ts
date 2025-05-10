import { useState, useEffect } from 'react'

interface KeyFrequencyData {
  [key: string]: number
}

 function useKeyFrequencyData() {
  const [data, setData] = useState<KeyFrequencyData>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: Replace with actual API call
        // For now, using mock data
        const mockData: KeyFrequencyData = {
          a: 8.2,
          b: 1.5,
          c: 2.8,
          d: 4.3,
          e: 13,
          f: 2.2,
          g: 2.0,
          h: 6.1,
          i: 7.0,
          j: 0.15,
          k: 0.77,
          l: 4.0,
          m: 2.4,
          n: 6.7,
          o: 7.5,
          p: 1.9,
          q: 0.095,
          r: 6.0,
          s: 6.3,
          t: 9.1,
          u: 2.8,
          v: 0.98,
          w: 2.4,
          x: 0.15,
          y: 2.0,
          z: 0.074,
          ' ': 20,
        }

        setData(mockData)
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'))
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, isLoading, error }
}

export default useKeyFrequencyData
