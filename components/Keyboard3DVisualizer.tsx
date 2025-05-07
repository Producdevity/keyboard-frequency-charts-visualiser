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
const BASE_HEIGHT = 0.5

interface KeycapProps {
  position: [number, number, number]
  frequency: number
  maxFrequency: number
  label: string
  width?: number
}

function Keycap(props: KeycapProps) {
  const height = Math.max(
    KEY_DEPTH,
    (props.frequency / props.maxFrequency) * 0.5,
  )
  const actualWidth = props.width
    ? props.width * KEY_WIDTH + (props.width - 1) * KEY_SPACING
    : KEY_WIDTH

  // Keycap dimensions
  const stemWidth = actualWidth - 0.1
  const stemHeight = height
  const keycapWidth = stemWidth - 0.05
  const keycapHeight = KEY_HEIGHT - 0.05
  const keycapDepth = 0.06
  const keycapTilt = 0.02

  // Paraboloid dish parameters
  const dishDepth = 0.025 // How deep the dish is
  const segments = 24 // Smoothness

  // Create a paraboloid dish for the keycap top
  const dishGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices = []
    const indices = []

    // Generate vertices
    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j <= segments; j++) {
        const x = (i / segments - 0.5) * keycapWidth
        const y = (j / segments - 0.5) * keycapHeight
        // Paraboloid: z = -a(x^2 + y^2)
        const a = dishDepth / (0.25 * keycapWidth * keycapWidth + 0.25 * keycapHeight * keycapHeight)
        const z = -a * (x * x + y * y)
        vertices.push(x, y, z)
      }
    }

    // Generate indices
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < segments; j++) {
        const a = i * (segments + 1) + j
        const b = a + 1
        const c = a + (segments + 1)
        const d = c + 1
        indices.push(a, b, c)
        indices.push(b, d, c)
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geometry.setIndex(indices)
    geometry.computeVertexNormals()
    return geometry
  }, [keycapWidth, keycapHeight, dishDepth, segments])

  return (
    <group position={props.position}>
      {/* Keycap stem */}
      <mesh position={[0, 0, stemHeight / 2]}>
        <boxGeometry args={[stemWidth, KEY_HEIGHT - 0.1, stemHeight]} />
        <meshStandardMaterial
          color={new THREE.Color(0.2, 0.2, 0.2)}
          metalness={0.1}
          roughness={0.7}
        />
      </mesh>

      {/* Keycap top */}
      <group position={[0, 0, stemHeight]}>
        {/* Main keycap body */}
        <mesh position={[0, -keycapTilt, keycapDepth / 2]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[keycapWidth, keycapHeight, keycapDepth]} />
          <meshStandardMaterial
            color={new THREE.Color(0.9, 0.9, 0.9)}
            metalness={0.2}
            roughness={0.5}
          />
        </mesh>

        {/* Paraboloid dish top */}
        <mesh position={[0, -keycapTilt, keycapDepth + dishDepth / 2]} rotation={[0.1, 0, 0]}>
          <primitive object={dishGeometry} />
          <meshStandardMaterial
            color={new THREE.Color(0.92, 0.92, 0.92)}
            metalness={0.18}
            roughness={0.45}
          />
        </mesh>

        {/* Keycap label */}
        <mesh 
          position={[0, -keycapTilt, keycapDepth + dishDepth + 0.001]} 
          rotation={[0.1, 0, 0]}
        >
          <planeGeometry args={[keycapWidth - 0.1, keycapHeight - 0.1]} />
          <meshBasicMaterial 
            color="black" 
            depthWrite={false}
            transparent={true}
            opacity={0.9}
          />
        </mesh>
      </group>
    </group>
  )
}

function KeyboardBase() {
  const totalWidth = 14
  const totalHeight = 8

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
