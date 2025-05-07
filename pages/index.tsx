import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, type ChangeEvent } from 'react'
import BarChart from '@/components/BarChart'
import PieChart from '@/components/PieChart'
import KeyboardLayout from '@/components/KeyboardLayout'
import LayoutSuggestions from '@/components/LayoutSuggestions'
import { KeystrokeData } from '@/types'
import { processKeystrokeFile } from '@/utils/processKeystrokeFile'
import planckLayout from '@/data/layouts/planckLayout'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const Home: NextPage = () => {
  const [activeTab, setActiveTab] = useState<'bar' | 'pie' | 'keyboard'>('bar')
  const [keystrokeData, setKeystrokeData] = useState<KeystrokeData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsLoading(true)
      setError(null)

      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string
          const processedData = processKeystrokeFile(content)
          setKeystrokeData(processedData)
        } catch (err) {
          setError(
            'Error processing file. Please make sure it is a valid keystroke log file.',
          )
        } finally {
          setIsLoading(false)
        }
      }

      reader.onerror = () => {
        setError('Error reading file')
        setIsLoading(false)
      }

      reader.readAsText(file)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <Head>
        <title>Keyboard Frequency Visualizer</title>
        <meta
          name="description"
          content="Visualize your keyboard usage patterns"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex-grow container-app py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Keyboard Frequency Visualizer
        </h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
            Upload Your Keystroke Log
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="flex-grow">
              <input
                type="file"
                accept=".log"
                onChange={handleFileUpload}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary file:text-white hover:file:bg-primary-dark cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              />
            </label>
            {isLoading && (
              <div className="flex items-center text-primary dark:text-primary-light">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            )}
          </div>
          {error && (
            <p className="mt-2 text-red-600 dark:text-red-400">{error}</p>
          )}
        </div>

        {keystrokeData.length > 0 && (
          <>
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
              <button
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === 'bar'
                    ? 'text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('bar')}
              >
                Bar Chart
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === 'pie'
                    ? 'text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('pie')}
              >
                Pie Chart
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === 'keyboard'
                    ? 'text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('keyboard')}
              >
                Keyboard Layout
              </button>
            </div>

            <div className="w-full mb-12">
              {activeTab === 'bar' && <BarChart data={keystrokeData} />}
              {activeTab === 'pie' && <PieChart data={keystrokeData} />}
              {activeTab === 'keyboard' && (
                <KeyboardLayout keystrokeData={keystrokeData} layout={planckLayout} />
              )}
            </div>

            <LayoutSuggestions data={keystrokeData} />
          </>
        )}

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-12">
          <h2 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-200">
            About This Tool
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            This tool helps you visualize your keyboard usage patterns to
            optimize your custom keyboard layout. Upload your keystroke log file
            to see which keys you use most frequently and get suggestions for
            optimizing your layout.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home
