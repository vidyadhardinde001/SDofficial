"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model2";

const Scene = () => {
  const controlsRef = useRef<any>();

  return (
    <Canvas
      camera={{
        position: [30, 0, 0], // Camera at 45-degree angle from the model
        fov: 25, // Field of view
      }}
      style={{ height: "300px", width: "100%" }}
    >
      <ambientLight intensity={5} />
      <directionalLight position={[-5, -5, 5]} intensity={3} />
      
      <Suspense fallback={null}>
        <Model />
      </Suspense>

      {/* OrbitControls will handle rotation and lookAt automatically */}
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4} // Restrict downward view to 45 degrees
        target={[0, 0, 0]} // Ensure the camera looks at the model (center)
      />
    </Canvas>
  );
};

export default Scene;
