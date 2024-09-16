import { group } from "console";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";

useGLTF.preload('/try.glb')

export default function Model(){
    const group = useRef<Group>(null);
    const { nodes, materials, animations, scene } = useGLTF('/try.glb')

    useFrame(() => {
        if (group.current) {
          group.current.rotation.y += 0.03; // Adjust the speed of rotation here
        }
      });
      
    return(
        <group ref={group}>
            <primitive object={scene}/>
        </group>
    )
}