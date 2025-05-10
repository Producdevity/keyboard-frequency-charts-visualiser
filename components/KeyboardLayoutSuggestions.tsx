import React from 'react'
import type { KeystrokeData } from '@/types'

interface Props {
  data: KeystrokeData[]
}

function KeyboardLayoutSuggestions(props: Props) {
  // Sort data by frequency in descending order
  const sortedData = [...props.data].sort((a, b) => b.frequency - a.frequency)

  // Top and least used keys
  const topUsedKeys = sortedData.slice(0, 10)
  const leastUsedKeys = sortedData.slice(-10).reverse()

  // Home row keys (ASDFGHJKL;)
  const homeRowKeys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';']

  // Calculate optimal home row usage
  const homeRowUsage = props.data
    .filter((item) => homeRowKeys.includes(item.key.toLowerCase()))
    .reduce((acc, item) => acc + item.frequency, 0)

  const totalUsage = props.data.reduce((acc, item) => acc + item.frequency, 0)
  const homeRowPercentage = totalUsage
    ? ((homeRowUsage / totalUsage) * 100).toFixed(2)
    : 0

  return (
    <div className="mt-12 w-full max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Layout Suggestions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
            Most Frequently Used Keys
          </h3>
          <ul className="space-y-2">
            {topUsedKeys.map((item) => (
              <li
                key={item.key}
                className="flex justify-between items-center py-1 px-2 rounded bg-gray-50 dark:bg-gray-700"
              >
                <span className="font-mono text-primary dark:text-primary-light">
                  {item.key}
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {item.frequency} hits
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
            Least Used Keys
          </h3>
          <ul className="space-y-2">
            {leastUsedKeys.map((item) => (
              <li
                key={item.key}
                className="flex justify-between items-center py-1 px-2 rounded bg-gray-50 dark:bg-gray-700"
              >
                <span className="font-mono text-gray-600 dark:text-gray-400">
                  {item.key}
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {item.frequency} hits
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
          Home Row Efficiency
        </h3>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            Home row usage:{' '}
            <span className="font-semibold">{homeRowPercentage}%</span> of all
            keystrokes
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4">
            <div
              className="bg-primary dark:bg-primary-light h-4 rounded-full"
              style={{ width: `${homeRowPercentage}%` }}
            />
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Ideally, your most frequently used keys should be on the home row
            (ASDFGHJKL;) for optimal typing efficiency.
          </p>
        </div>
      </div>
    </div>
  )
}

export default KeyboardLayoutSuggestions
