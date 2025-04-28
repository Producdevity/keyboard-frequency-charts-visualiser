import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { KeystrokeData } from '@/types'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface BarChartProps {
  data: KeystrokeData[]
}

const BarChart = ({ data }: BarChartProps) => {
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

  // Sort data by frequency in descending order and take top 20 keys
  const sortedData = [...data]
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 20);

  const chartData = {
    labels: sortedData.map((item) => item.key),
    datasets: [
      {
        label: 'Key Frequency',
        data: sortedData.map((item) => item.frequency),
        backgroundColor: sortedData.map((_, index) => {
          // Generate a gradient from blue to red
          const hue = 240 - (index / sortedData.length) * 240;
          return `hsl(${hue}, 80%, 60%)`
        }),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : undefined
        }
      },
      title: {
        display: true,
        text: 'Key Usage Frequency',
        color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : undefined
      },
      tooltip: {
        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : undefined,
      }
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : undefined
        },
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : undefined
        }
      },
      y: {
        ticks: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : undefined
        },
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : undefined
        }
      }
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <Bar data={chartData} options={options} />
    </div>
  )
}

export default BarChart
