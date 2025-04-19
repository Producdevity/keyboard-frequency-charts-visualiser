import { KeystrokeData } from '../types'
import { mapToColor } from '../utils/mapToColor'
import { keyboardLayout } from '../data/keyboardLayout'
import styles from '../styles/Charts.module.css'

interface KeyboardLayoutProps {
  data: KeystrokeData[]
}

const KeyboardLayout: React.FC<KeyboardLayoutProps> = ({ data }) => {
  const getKeyFrequency = (key: string): number => {
    const keyData = data.find(item => item.key === key)
    return keyData ? keyData.frequency : 0
  }

  const maxFrequency = Math.max(...data.map(item => item.frequency))

  // Generate legend steps
  const legendSteps = [0, 0.25, 0.5, 0.75, 1].map(step => ({
    value: Math.round(step * maxFrequency),
    color: mapToColor(step * maxFrequency, maxFrequency)
  }))

  return (
    <div className={styles.keyboardContainer}>
      <div className={styles.keyboardLayout}>
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.keyboardRow}>
            {row.map((keyData) => (
              <div
                key={`${keyData.key}-${keyData.position.row}-${keyData.position.col}`}
                className={`${styles.key} ${keyData.isModifier ? styles.modifier : ''}`}
                style={{
                  backgroundColor: mapToColor(getKeyFrequency(keyData.key), maxFrequency),
                  gridColumn: keyData.position.width ? `span ${keyData.position.width}` : 'span 1',
                }}
                data-key={keyData.key}
              >
                {keyData.key}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.legend}>
        <div className={styles.legendTitle}>Key Usage Frequency</div>
        <div className={styles.legendSteps}>
          {legendSteps.map((step, index) => (
            <div key={index} className={styles.legendStep}>
              <div 
                className={styles.legendColor} 
                style={{ backgroundColor: step.color }}
              />
              <div className={styles.legendValue}>{step.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default KeyboardLayout 