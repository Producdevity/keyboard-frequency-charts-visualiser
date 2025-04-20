import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { KeystrokeData } from '@/types'
import { processKeystrokeFile } from '@/utils/processKeystrokeFile'
import { planckLayout } from '@/data/planckLayout'
import styles from '../styles/Charts.module.css'

const HeatmapPage = () => {
  const [keystrokeData, setKeystrokeData] = useState<KeystrokeData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/keystrokes')
        if (!response.ok) {
          throw new Error('Failed to fetch keystroke data')
        }
        const data = await response.text()
        const processedData = processKeystrokeFile(data)
        setKeystrokeData(processedData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const getKeyFrequency = (key: string): number => {
    const keyData = keystrokeData.find(
      (k) => k.key.toLowerCase() === key.toLowerCase(),
    )
    return keyData?.frequency || 0
  }

  const getColorForFrequency = (frequency: number): string => {
    // Normalize frequency to a value between 0 and 1
    const maxFrequency = Math.max(...keystrokeData.map((k) => k.frequency), 1)
    const normalizedFrequency = frequency / maxFrequency

    // Generate a color from blue (low frequency) to red (high frequency)
    const hue = (1 - normalizedFrequency) * 240 // 240 is blue, 0 is red
    return `hsl(${hue}, 100%, 50%)`
  }

  if (isLoading) {
    return <div className={styles.loading}>Loading heatmap data...</div>
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Keyboard Heatmap</h1>
      <div className="max-w-96">
        {planckLayout.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.keyboardRow}>
            {row.map((keyData) => {
              const frequency = getKeyFrequency(keyData.key)
              const color = getColorForFrequency(frequency)

              return (
                <div
                  key={`${rowIndex}-${keyData.key}`}
                  className={styles.key}
                  style={{
                    backgroundColor: color,
                    width: '100%',

                    // width: keyData.position?.width
                    //   ? `${keyData.position.width * (U + GAP)}px`
                    //   : `${U}px`,
                    height: '60px',
                    margin: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    color: 'white',
                    fontWeight: 'bold',
                    position: 'relative',
                    gridColumn: `span ${keyData.position.width || 1}`,
                  }}
                >
                  <span>{keyData.key}</span>
                  <span className={styles.frequency}> ({frequency})</span>
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div
            className={styles.legendColor}
            style={{ backgroundColor: getColorForFrequency(0) }}
          />
          <span>Low Frequency</span>
        </div>
        <div className={styles.legendItem}>
          <div
            className={styles.legendColor}
            style={{ backgroundColor: getColorForFrequency(0.5) }}
          />
          <span>Medium Frequency</span>
        </div>
        <div className={styles.legendItem}>
          <div
            className={styles.legendColor}
            style={{ backgroundColor: getColorForFrequency(1) }}
          />
          <span>High Frequency</span>
        </div>
      </div>
    </div>
  )
}

export default HeatmapPage
