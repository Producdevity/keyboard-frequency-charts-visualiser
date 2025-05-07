import { KeystrokeData } from '@/types'
import { KeyboardLayout } from '@/data/layouts/types'

interface KeyboardLayoutProps {
  keystrokeData: KeystrokeData[]
  layout: KeyboardLayout
}

interface ColorPair {
  background: string
  text: string
}

const KeyboardLayoutVisualizer = ({
  keystrokeData,
  layout,
}: KeyboardLayoutProps) => {
  const maxFrequency = Math.max(...keystrokeData.map((k) => k.frequency), 1)

  const getKeyFrequency = (key: string): number => {
    const keyData = keystrokeData.find(
      (k) => k.key.toLowerCase() === key.toLowerCase(),
    )
    return keyData?.frequency || 0
  }

  const getColorForFrequency = (frequency: number): ColorPair => {
    const normalizedFrequency = frequency / maxFrequency
    const hue = (1 - normalizedFrequency) * 240 // 240 is blue, 0 is red
    const saturation = 100
    const lightness = 50
    const background = `hsl(${hue}, ${saturation}%, ${lightness}%)`

    // Convert HSL to RGB for luminance calculation
    const h = hue / 360
    const s = saturation / 100
    const l = lightness / 100

    let r, g, b

    if (s === 0) {
      r = g = b = l
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
      }

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q

      r = hue2rgb(p, q, h + 1 / 3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1 / 3)
    }

    // Calculate relative luminance
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b

    // Use black text for light backgrounds and white text for dark backgrounds
    const text = luminance > 0.5 ? 'black' : 'white'

    return { background, text }
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
              const { background, text } = getColorForFrequency(frequency)
              const width =
                keyData.position?.width && keyData.position.width > 1
                  ? `${keyData.position.width * KEY_WIDTH + (keyData.position.width - 1) * GAP_WIDTH}rem`
                  : '4rem'

              return (
                <div
                  key={`${rowIndex}-${keyData.key}`}
                  className={`
                    flex flex-col items-center justify-center
                    rounded-md font-bold relative
                    h-16 shadow-md transition-colors
                    ${keyData.isModifier ? 'text-xs' : 'text-base'}
                  `}
                  style={{
                    backgroundColor: background,
                    color: text,
                    gridColumn: keyData.position.width
                      ? `span ${keyData.position.width}`
                      : 'span 1',
                    width,
                  }}
                >
                  <span>{keyData.label || keyData.key}</span>
                  <span style={{ color: text }} className="text-xs opacity-80">
                    {frequency}
                  </span>
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

export default KeyboardLayoutVisualizer
