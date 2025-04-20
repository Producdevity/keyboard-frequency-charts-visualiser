import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { KeystrokeData } from '@/types'
import { processKeystrokeFile } from '@/utils/processKeystrokeFile'
import BarChart from '@/components/BarChart'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'

Chart.register(CategoryScale)

const BarPage: NextPage = () => {
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
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <Head>
        <title>BarChart Overview</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className="flex-grow container-app py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          Key Usage Frequency (Bar Chart)
        </h1>
        <div className="w-full max-w-4xl mx-auto">
          <BarChart data={keystrokeData} />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default BarPage
