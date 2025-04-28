import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { KeystrokeData } from '@/types'

ChartJS.register(ArcElement, Tooltip, Legend)

interface PieChartProps {
  data: KeystrokeData[]
}

const PieChart = (props: PieChartProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial theme
    setIsDarkMode(document.documentElement.classList.contains('dark'));

    // Set up observer for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  // Sort data by frequency in descending order and take top 15 keys
  const sortedData = [...props.data]
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 15);

  const chartData = {
    labels: sortedData.map((item) => item.key),
    datasets: [
      {
        data: sortedData.map((item) => item.frequency),
        backgroundColor: sortedData.map((_, index) => {
          const hue = (index * 360) / sortedData.length;
          return `hsl(${hue}, 70%, 60%)`
        }),
        borderWidth: 1,
        borderColor: isDarkMode ? 'rgba(30, 30, 30, 1)' : 'rgba(255, 255, 255, 1)',
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : undefined,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Key Usage Distribution',
        color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : undefined
      },
      tooltip: {
        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : undefined
      }
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <Pie data={chartData} options={options} />
    </div>
  )
}

export default PieChart
