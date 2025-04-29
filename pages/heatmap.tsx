import { useState, useEffect } from 'react'
import { KeystrokeData } from '@/types'
import { processKeystrokeFile } from '@/utils/processKeystrokeFile'
import planckLayout from '@/data/layouts/planckLayout'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Head from 'next/head'
import KeyboardLayout from '@/components/KeyboardLayout'

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

  const getColorForFrequency = (frequency: number): string => {
    // Normalize frequency to a value between 0 and 1
    const maxFrequency = Math.max(...keystrokeData.map((k) => k.frequency), 1)
    const normalizedFrequency = frequency / maxFrequency

    // Generate a color from blue (low frequency) to red (high frequency)
    const hue = (1 - normalizedFrequency) * 240 // 240 is blue, 0 is red
    return `hsl(${hue}, 100%, 50%)`
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
          Error: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Head>
        <title>Keyboard Heatmap</title>
        <meta
          name="description"
          content="Visualize your keyboard usage patterns with a heatmap"
        />
      </Head>

      <Navbar />

      <main className="container-app py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Keyboard Heatmap
        </h1>

        <div className="max-w-4xl mx-auto">
          <KeyboardLayout keystrokeData={keystrokeData} layout={planckLayout} />
        </div>

        <div className="flex justify-center mt-8 gap-6">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: getColorForFrequency(0) }}
            />
            <span className="text-sm">Low</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: getColorForFrequency(5000) }}
            />
            <span className="text-sm">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: getColorForFrequency(12000) }}
            />
            <span className="text-sm">High</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default HeatmapPage
