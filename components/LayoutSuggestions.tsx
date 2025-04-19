import { KeystrokeData } from '../types'
import styles from '../styles/Charts.module.css'

interface LayoutSuggestionsProps {
  data: KeystrokeData[]
}

const LayoutSuggestions: React.FC<LayoutSuggestionsProps> = ({ data }) => {
  // Get the most frequently used keys
  const mostUsedKeys = [...data]
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 10)

  // Get the least frequently used keys
  const leastUsedKeys = [...data]
    .sort((a, b) => a.frequency - b.frequency)
    .slice(0, 10)

  // Calculate the total frequency for percentage calculations
  const totalFrequency = data.reduce((sum, item) => sum + item.frequency, 0)

  return (
    <div className={styles.suggestions}>
      <h2>Layout Optimization Suggestions</h2>
      
      <div className={styles.suggestionSection}>
        <h3>Most Used Keys</h3>
        <p>Consider placing these keys in more accessible positions:</p>
        <ul>
          {mostUsedKeys.map((keyData) => (
            <li key={keyData.key}>
              {keyData.key}: {((keyData.frequency / totalFrequency) * 100).toFixed(1)}% of total usage
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.suggestionSection}>
        <h3>Least Used Keys</h3>
        <p>These keys could be moved to less accessible positions:</p>
        <ul>
          {leastUsedKeys.map((keyData) => (
            <li key={keyData.key}>
              {keyData.key}: {((keyData.frequency / totalFrequency) * 100).toFixed(1)}% of total usage
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.suggestionSection}>
        <h3>General Recommendations</h3>
        <ul>
          <li>Place frequently used keys on the home row</li>
          <li>Consider using thumb keys for frequently used modifiers</li>
          <li>Group related keys together based on your usage patterns</li>
          <li>Use layers to reduce finger movement for common key combinations</li>
        </ul>
      </div>
    </div>
  )
}

export default LayoutSuggestions 