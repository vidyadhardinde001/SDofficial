
"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./field";

const Scene = () => {
  return (
    <Canvas
      style={{ height: "300px", width: "100%" }}
      camera={{ position: [4, 0, 0] }} // Adjust the camera position here
    >
      <ambientLight intensity={2} />
      <directionalLight position={[-5, -5, 5]} intensity={2} />
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
