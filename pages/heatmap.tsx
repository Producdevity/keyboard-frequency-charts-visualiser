import { useState, type ChangeEvent } from 'react'
import type { KeystrokeData } from '@/types'
import KeyboardLayoutVisualizer from '@/components/KeyboardLayoutVisualizer'
import Keyboard3DVisualizer from '@/components/3D/Keyboard3DVisualizer'
import LayoutSelector from '@/components/LayoutSelector'
import { layouts } from '@/data/layouts'
import { processKeystrokeFile } from '@/utils/processKeystrokeFile'
import ChartPageLayout from '@/components/ChartPageLayout'

export default function HeatmapPage() {
  const [keystrokeData, setKeystrokeData] = useState<KeystrokeData[]>([])
  const [currentLayout, setCurrentLayout] = useState(layouts[0])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setIsLoading(true)
      setError(null)
      const text = await file.text()
      const data = processKeystrokeFile(text)
      setKeystrokeData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLayoutChange = (layout: (typeof layouts)[0]) => {
    setCurrentLayout(layout)
  }

  return (
    <ChartPageLayout
      title="Keyboard Heatmap"
      keystrokeData={keystrokeData}
      isLoading={isLoading}
      error={error}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Keyboard Heatmap</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Upload your keystroke log file to visualize your keyboard usage
            patterns.
          </p>
          <input
            type="file"
            accept=".log"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              dark:file:bg-blue-900 dark:file:text-blue-300"
          />
        </div>

        {keystrokeData.length > 0 && (
          <>
            <div className="mb-8">
              <LayoutSelector
                currentLayout={currentLayout}
                onLayoutChange={handleLayoutChange}
              />
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2D Heatmap</h2>
              <KeyboardLayoutVisualizer
                keystrokeData={keystrokeData}
                layout={currentLayout.layout}
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">3D Visualization</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Click and drag to rotate the keyboard. The height of each key
                represents its usage frequency.
              </p>
              <Keyboard3DVisualizer
                keystrokeData={keystrokeData}
                layout={currentLayout.layout}
              />
            </div>
          </>
        )}
      </div>
    </ChartPageLayout>
  )
}
