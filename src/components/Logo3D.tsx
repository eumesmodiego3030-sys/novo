import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

const LogoModel = () => {
  const { scene } = useGLTF("/models/logo_3d_tatiana.glb");
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene.clone()}
      scale={1.5}
      position={[0, 0, 0]}
    />
  );
};

useGLTF.preload("/models/logo_3d_tatiana.glb");

interface Logo3DProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-40 h-40",
  xl: "w-64 h-64",
};

const Logo3D = ({ className = "", size = "md" }: Logo3DProps) => {
  return (
    <div className={`${sizeMap[size]} ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-3, 2, 4]} intensity={0.4} />
        <Suspense fallback={null}>
          <LogoModel />
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default Logo3D;
