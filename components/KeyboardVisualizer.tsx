import { KeyData } from '@/data/keyboardLayout'
import styles from '@/styles/Charts.module.css'

interface KeyboardVisualizerProps {
  layout: KeyData[][]
  data: Record<string, number>
}

export function KeyboardVisualizer(props: KeyboardVisualizerProps) {
  const maxFrequency = Math.max(...Object.values(props.data))

  return (
    <div className={styles.keyboardContainer}>
      {props.layout.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.keyboardRow}>
          {row.map((key) => {
            const frequency = props.data[key.key] || 0
            const intensity = frequency / maxFrequency
            const backgroundColor = `rgba(99, 102, 241, ${intensity})`

            return (
              <div
                key={key.key}
                className={styles.key}
                style={{
                  width: `${(key.position.width || 1) * 40}px`,
                  height: '40px',
                  backgroundColor,
                }}
              >
                <span className={styles.keyLabel}>{key.key}</span>
                <span className={styles.keyFrequency}>
                  {frequency.toFixed(0)}
                </span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
} 