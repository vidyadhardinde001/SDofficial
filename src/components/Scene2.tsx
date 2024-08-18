// components/Scene.tsx
"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model2";

const Scene = () => {
  return (
    <Canvas style={{ height: "300px", width: "100%" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-5, -5, 5]} intensity={1} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
