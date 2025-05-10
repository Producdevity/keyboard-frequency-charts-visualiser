import { BASE_HEIGHT } from "./constants"

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

export default KeyboardBase
