import { useRef } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// Preload the GLTF model
useGLTF.preload('/try.glb');

export default function Model() {
  const group = useRef<Group>(null);
  const { scene } = useGLTF('/2.glb');

  // Rotate the model continuously
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.03; // Adjust the speed of rotation here
    }
  });

  return (
    <group ref={group} position={[0, -4.5, 0]}> {/* Adjust the y-coordinate to move the model down */}
      <primitive object={scene} />
    </group>
  );
}
