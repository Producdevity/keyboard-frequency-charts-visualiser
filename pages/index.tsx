import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useState, type ChangeEvent } from 'react'
import BarChart from '@/components/BarChart'
import PieChart from '@/components/PieChart'
import KeyboardLayout from '@/components/KeyboardLayout'
import LayoutSuggestions from '@/components/LayoutSuggestions'
import { KeystrokeData } from '@/types'
import { processKeystrokeFile } from '@/utils/processKeystrokeFile'
import { planckLayout } from '@/data/planckLayout'

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
    <div className={styles.container}>
      <Head>
        <title>Keyboard Frequency Visualizer</title>
        <meta
          name="description"
          content="Visualize your keyboard usage patterns"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Keyboard Frequency Visualizer</h1>

        <div className={styles.uploadSection}>
          <h2>Upload Your Keystroke Log</h2>
          <input
            type="file"
            accept=".log"
            onChange={handleFileUpload}
            className={styles.fileInput}
            disabled={isLoading}
          />
          {isLoading && <p>Processing file...</p>}
          {error && <p className={styles.error}>{error}</p>}
        </div>

        {keystrokeData.length > 0 && (
          <>
            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${activeTab === 'bar' ? styles.active : ''}`}
                onClick={() => setActiveTab('bar')}
              >
                Bar Chart
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'pie' ? styles.active : ''}`}
                onClick={() => setActiveTab('pie')}
              >
                Pie Chart
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'keyboard' ? styles.active : ''}`}
                onClick={() => setActiveTab('keyboard')}
              >
                Keyboard Layout
              </button>
            </div>

            <div className={styles.chartContainer}>
              {activeTab === 'bar' && <BarChart data={keystrokeData} />}
              {activeTab === 'pie' && <PieChart data={keystrokeData} />}
              {activeTab === 'keyboard' && (
                <KeyboardLayout keystrokeData={keystrokeData} layout={planckLayout} />
              )}
            </div>

            <LayoutSuggestions data={keystrokeData} />
          </>
        )}

        <div className={styles.infoSection}>
          <h2>About This Tool</h2>
          <p>
            This tool helps you visualize your keyboard usage patterns to
            optimize your custom keyboard layout. Upload your keystroke log file
            to see which keys you use most frequently and get suggestions for
            optimizing your layout.
          </p>
        </div>
      </main>
    </div>
  )
}

export default Home
