import { useMemo } from 'react'
import * as THREE from 'three'
import { KEY_DEPTH, KEY_WIDTH, KEY_SPACING, KEY_HEIGHT } from './constants'

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

  // Create a single mesh for the keycap top and sides (rectangular dish)
  const keycapGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices = []
    const indices = []
    const grid = []

    // Paraboloid: z = -dishDepth * (1 - (x/a)^2 - (y/b)^2)
    // At center (x=0, y=0): z = -dishDepth
    // At edge (x=+-a, y=+-b): z = 0
    const a = keycapWidth / 2
    const b = keycapHeight / 2

    // Top surface (rectangular paraboloid)
    for (let i = 0; i <= segments; i++) {
      const row = []
      const y = ((i / segments) - 0.5) * keycapHeight
      for (let j = 0; j <= segments; j++) {
        const x = ((j / segments) - 0.5) * keycapWidth
        const z = -dishDepth * (1 - (x * x) / (a * a) - (y * y) / (b * b))
        vertices.push(x, y, z)
        row.push(vertices.length / 3 - 1)
      }
      grid.push(row)
    }

    // Indices for top surface
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < segments; j++) {
        const a = grid[i][j]
        const b = grid[i][j + 1]
        const c = grid[i + 1][j]
        const d = grid[i + 1][j + 1]
        indices.push(a, b, c)
        indices.push(b, d, c)
      }
    }

    // Sides (vertical faces)
    // Bottom Z for sides
    const baseZ = -keycapDepth
    // Four edges: left, right, top, bottom
    for (let i = 0; i < segments; i++) {
      // Left edge
      let topA = grid[i][0]
      let topB = grid[i + 1][0]
      let botA = vertices.length / 3
      let botB = botA + 1
      vertices.push(
        -a,
        ((i / segments) - 0.5) * keycapHeight,
        baseZ,
      )
      vertices.push(
        -a,
        (((i + 1) / segments) - 0.5) * keycapHeight,
        baseZ,
      )
      indices.push(topA, botA, topB)
      indices.push(botA, botB, topB)
      // Right edge
      topA = grid[i][segments]
      topB = grid[i + 1][segments]
      botA = vertices.length / 3
      botB = botA + 1
      vertices.push(
        a,
        ((i / segments) - 0.5) * keycapHeight,
        baseZ,
      )
      vertices.push(
        a,
        (((i + 1) / segments) - 0.5) * keycapHeight,
        baseZ,
      )
      indices.push(topA, topB, botA)
      indices.push(botA, topB, botB)
    }
    for (let j = 0; j < segments; j++) {
      // Top edge
      let topA = grid[0][j]
      let topB = grid[0][j + 1]
      let botA = vertices.length / 3
      let botB = botA + 1
      vertices.push(
        ((j / segments) - 0.5) * keycapWidth,
        -b,
        baseZ,
      )
      vertices.push(
        (((j + 1) / segments) - 0.5) * keycapWidth,
        -b,
        baseZ,
      )
      indices.push(topA, botA, topB)
      indices.push(botA, botB, topB)
      // Bottom edge
      topA = grid[segments][j]
      topB = grid[segments][j + 1]
      botA = vertices.length / 3
      botB = botA + 1
      vertices.push(
        ((j / segments) - 0.5) * keycapWidth,
        b,
        baseZ,
      )
      vertices.push(
        (((j + 1) / segments) - 0.5) * keycapWidth,
        b,
        baseZ,
      )
      indices.push(topA, topB, botA)
      indices.push(botA, topB, botB)
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geometry.setIndex(indices)
    geometry.computeVertexNormals()
    return geometry
  }, [keycapWidth, keycapHeight, dishDepth, segments, keycapDepth])

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

      {/* Keycap top and sides: single mesh */}
      <group position={[0, 0, stemHeight]}>
        <mesh position={[0, -keycapTilt, keycapDepth]} rotation={[0.1, 0, 0]}>
          <primitive object={keycapGeometry} />
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

export default Keycap
