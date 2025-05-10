import { KeyboardLayout } from "@/data/layouts/types"
import { KeystrokeData } from "@/types"
import { Canvas } from "@react-three/fiber"
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
} from '@react-three/drei'
import Keyboard from "./Keyboard"

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

function Keyboard3DVisualizer(props: SceneProps) {
  return (
    <div className="w-full h-[600px] mt-8 rounded-lg overflow-hidden shadow-lg">
      <Canvas shadows camera={{ position: [0, 0, 15], fov: 50 }}>
        <Scene {...props} />
      </Canvas>
    </div>
  )
}

export default Keyboard3DVisualizer
