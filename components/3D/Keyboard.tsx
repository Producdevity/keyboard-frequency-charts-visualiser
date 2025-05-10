import { KeyboardLayout } from "@/data/layouts/types"
import { KeystrokeData } from "@/types"
import { useMemo } from "react"
import { KEY_WIDTH, KEY_SPACING, KEY_HEIGHT } from "./constants"
import KeyboardBase from "./KeyboardBase"
import Keycap from "./Keycap"

interface KeyboardProps {
  keystrokeData: KeystrokeData[]
  layout: KeyboardLayout
}

function Keyboard(props: KeyboardProps) {
  const maxFrequency = Math.max(
    ...props.keystrokeData.map((k) => k.frequency),
    1,
  )

  const getKeyFrequency = (key: string): number => {
    const keyData = props.keystrokeData.find(
      (k) => k.key.toLowerCase() === key.toLowerCase(),
    )
    return keyData?.frequency || 0
  }

  // Calculate the total width of each row to center it properly
  const rowWidths = useMemo(() => {
    return props.layout.map((row) => {
      return row.reduce((width, key) => {
        const keyWidth = key.position?.width || 1
        return width + keyWidth * KEY_WIDTH + (keyWidth - 1) * KEY_SPACING
      }, 0)
    })
  }, [props.layout])

  return (
    <group>
      <KeyboardBase />
      {props.layout.map((row, rowIndex) => {
        let currentX = -rowWidths[rowIndex] / 2 // Start from the left edge of the row
        return row.map((keyData, colIndex) => {
          const frequency = getKeyFrequency(keyData.key)
          const keyWidth = keyData.position?.width || 1
          const x = currentX + (keyWidth * KEY_WIDTH) / 2 // Center the key at its position
          const y = -(rowIndex - props.layout.length / 2) * (KEY_HEIGHT + KEY_SPACING) // Invert the Y position

          // Update currentX for the next key
          currentX += keyWidth * KEY_WIDTH + (keyWidth - 1) * KEY_SPACING

          return (
            <Keycap
              key={`${rowIndex}-${colIndex}`}
              position={[x, y, 0]}
              frequency={frequency}
              maxFrequency={maxFrequency}
              label={keyData.label || keyData.key}
              width={keyData.position?.width}
            />
          )
        })
      })}
    </group>
  )
}

export default Keyboard
