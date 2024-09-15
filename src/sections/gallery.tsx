"use client";
import React, { useState } from "react";

const Gallery: React.FC = () => {
  // State for storing gallery images
  const [galleryImages, setGalleryImages] = useState([
    { id: 1, src: "/assets/mixer.png", alt: "Mixer" },
    { id: 2, src: "/assets/robo.png", alt: "Robo" },
    { id: 3, src: "/assets/foundary.png", alt: "Foundary" },
    { id: 4, src: "/assets/incernator.png", alt: "Incernator" },
    { id: 5, src: "/assets/treatment.png", alt: "Treatment" },
    { id: 6, src: "/assets/wirestranding.png", alt: "Wire Stranding" },
    { id: 7, src: "/assets/specialpurpose.png", alt: "Special Purpose" },
    { id: 8, src: "/assets/mixer.png", alt: "Mixer" },
    { id: 9, src: "/assets/robo.png", alt: "Robo" },
  ]);

  return (
    <div className="container  mx-auto px-4 py-8">
      {/* Gallery Title */}
      <h2 className="text-3xl font-bold text-center mb-6">Gallery</h2>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image) => (
          <div
            key={image.id}
            className="relative group overflow-hidden rounded-lg"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105"
              style={{ width: '300px', height: '300px' }}  // Set width and height
            />
            <p className="text-center text-lg font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {image.alt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;