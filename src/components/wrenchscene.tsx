
"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./wrench";

const Scene = () => {
  return (
    <Canvas
      style={{ height: "300px", width: "100%" }}
      camera={{ position: [2.5, 0, 0] }} // Adjust the camera position here
    >
      <ambientLight intensity={10} />
      <directionalLight position={[-5, -5, 5]} intensity={20} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls 
        enablePan={true} 
        enableZoom={false}
        enableRotate={true} 
        maxPolarAngle={Math.PI / 2} 
        minPolarAngle={Math.PI / 2} 
      />
    </Canvas>
  );
};

export default Scene;
