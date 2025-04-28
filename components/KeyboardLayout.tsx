import { KeystrokeData } from '@/types'
import { KeyData } from '@/data/keyboardLayout'

interface KeyboardLayoutProps {
  keystrokeData: KeystrokeData[]
  layout: KeyData[][]
}

const KeyboardLayout = ({ keystrokeData, layout }: KeyboardLayoutProps) => {
  const maxFrequency = Math.max(...keystrokeData.map((k) => k.frequency), 1)

  const getKeyFrequency = (key: string): number => {
    const keyData = keystrokeData.find(
      (k) => k.key.toLowerCase() === key.toLowerCase(),
    )
    return keyData?.frequency || 0
  }

  const getColorForFrequency = (frequency: number): string => {
    const normalizedFrequency = frequency / maxFrequency
    const hue = (1 - normalizedFrequency) * 240 // 240 is blue, 0 is red
    return `hsl(${hue}, 100%, 50%)`
  }

  const GAP_WIDTH = 0.25
  const KEY_WIDTH = 4
  return (
    <div className="mt-8 w-full">
      <div className="flex flex-col gap-1 items-center">
        {layout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {row.map((keyData) => {
              const frequency = getKeyFrequency(keyData.key)
              const color = getColorForFrequency(frequency)
              const width =
                keyData.position?.width && keyData.position.width > 1
                  ? `${keyData.position.width * KEY_WIDTH + (keyData.position.width - 1) * GAP_WIDTH}rem`
                  : '4rem'

              return (
                <div
                  key={`${rowIndex}-${keyData.key}`}
                  className={`
                    flex flex-col items-center justify-center
                    rounded-md text-white font-bold relative
                    h-16 shadow-md transition-colors
                    ${keyData.isModifier ? 'text-xs' : 'text-base'}
                  `}
                  style={{
                    backgroundColor: color,
                    gridColumn: keyData.position.width
                      ? `span ${keyData.position.width}`
                      : 'span 1',
                    width,
                  }}
                >
                  <span>{keyData.label || keyData.key}</span>
                  <span className="text-xs opacity-80">{frequency}</span>
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center space-x-4">
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: 'hsl(240, 100%, 50%)' }}
          ></div>
          <span className="text-sm dark:text-gray-300">Low Frequency</span>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: 'hsl(120, 100%, 50%)' }}
          ></div>
          <span className="text-sm dark:text-gray-300">Medium Frequency</span>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: 'hsl(0, 100%, 50%)' }}
          ></div>
          <span className="text-sm dark:text-gray-300">High Frequency</span>
        </div>
      </div>
    </div>
  )
}

export default KeyboardLayout
