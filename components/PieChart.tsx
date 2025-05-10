import React, { useEffect, useState } from 'react'
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import type { KeystrokeData } from '@/types'

interface PieChartProps {
  data: KeystrokeData[]
}

interface PieLabelProps {
  name: string
  percent: number
}

function PieChart(props: PieChartProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'))

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'))
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => observer.disconnect()
  }, [])

  const sortedData = [...props.data]
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 15)
    .map((item, index) => ({
      name: item.key,
      value: item.frequency,
      fill: `hsl(${(index * 360) / 15}, 70%, 60%)`,
    }))

  const renderCustomizedLabel = ({ name, percent }: PieLabelProps) => {
    return `${name} (${(percent * 100).toFixed(0)}%)`
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
        Key Usage Distribution
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <RechartsPieChart>
          <Pie
            data={sortedData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            label={renderCustomizedLabel}
          >
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'white',
              border: 'none',
              borderRadius: '4px',
              color: isDarkMode ? '#fff' : '#666',
            }}
          />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{
              color: isDarkMode ? '#fff' : '#666',
            }}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PieChart
