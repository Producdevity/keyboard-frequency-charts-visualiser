import React, { useEffect, useState } from 'react'
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { KeystrokeData } from '@/types'
import generateGradient from '@/utils/generateGradient'

interface BarChartProps {
  data: KeystrokeData[]
}

const BarChart = (props: BarChartProps) => {
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
    .slice(0, 20)
    .map((item, index) => ({
      key: item.key,
      frequency: item.frequency,
      fill: generateGradient(index, props.data),
    }))

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
        Key Usage Frequency
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <RechartsBarChart data={sortedData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDarkMode ? '#444' : '#ccc'}
          />
          <XAxis
            dataKey="key"
            stroke={isDarkMode ? '#e5e7eb' : '#666'}
            tick={{ fill: isDarkMode ? '#e5e7eb' : '#666' }}
          />
          <YAxis
            stroke={isDarkMode ? '#e5e7eb' : '#666'}
            tick={{ fill: isDarkMode ? '#e5e7eb' : '#666' }}
          />
          <Tooltip
            labelFormatter={(label) => `Key: ${label}`}
            itemStyle={{ color: isDarkMode ? '#e5e7eb': '#666' }}
            contentStyle={{
              backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : '#f9fafb',
              color: isDarkMode ? '#e5e7eb' : '#666',
              border: 'none',
              borderRadius: '4px',
            }}
          />
          <Legend />
          <Bar dataKey="frequency" name="Frequency" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChart
