import { useMemo, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
} from '@react-three/drei'
import { KeystrokeData } from '@/types'
import { KeyboardLayout } from '@/data/layouts/types'
import * as THREE from 'three'

const KEY_WIDTH = 1
const KEY_HEIGHT = 1
const KEY_DEPTH = 0.1
const KEY_SPACING = 0.1
const BASE_HEIGHT = 0.05

interface KeycapProps {
  position: [number, number, number]
  frequency: number
  maxFrequency: number
  label: string
  width?: number
}

function Keycap(props: KeycapProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const height = Math.max(
    KEY_DEPTH,
    (props.frequency / props.maxFrequency) * 0.5,
  )
  const actualWidth = props.width
    ? props.width * KEY_WIDTH + (props.width - 1) * KEY_SPACING
    : KEY_WIDTH

  return (
    <group position={props.position}>
      {/* Keycap stem */}
      <mesh position={[0, 0, height / 2]}>
        <boxGeometry args={[actualWidth - 0.1, KEY_HEIGHT - 0.1, height]} />
        <meshStandardMaterial
          color={new THREE.Color(0.2, 0.2, 0.2)}
          metalness={0.1}
          roughness={0.7}
        />
      </mesh>
      {/* Keycap top */}
      <mesh position={[0, 0, height + 0.01]}>
        <boxGeometry args={[actualWidth - 0.05, KEY_HEIGHT - 0.05, 0.02]} />
        <meshStandardMaterial
          color={new THREE.Color(0.9, 0.9, 0.9)}
          metalness={0.2}
          roughness={0.5}
        />
      </mesh>
    </group>
  )
}

function KeyboardBase() {
  const totalWidth = 16
  const totalHeight = 6

  return (
    <mesh position={[0, 0, -BASE_HEIGHT / 2]}>
      <boxGeometry args={[totalWidth, totalHeight, BASE_HEIGHT]} />
      <meshStandardMaterial
        color={new THREE.Color(0.1, 0.1, 0.1)}
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  )
}

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
          const y =
            (rowIndex - props.layout.length / 2) * (KEY_HEIGHT + KEY_SPACING)

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

interface SceneProps {
  keystrokeData: KeystrokeData[]
  layout: KeyboardLayout
}

function Scene(props: SceneProps) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <Environment preset="studio" />
      <Keyboard {...props} />
      <OrbitControls
        enablePan={false}
        minDistance={10}
        maxDistance={30}
        rotateSpeed={0.5}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}

export default function Keyboard3DVisualizer(props: SceneProps) {
  return (
    <div className="w-full h-[600px] mt-8 rounded-lg overflow-hidden shadow-lg">
      <Canvas shadows camera={{ position: [0, 0, 15], fov: 50 }}>
        <Scene {...props} />
      </Canvas>
    </div>
  )
}
