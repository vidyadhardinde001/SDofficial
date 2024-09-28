"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image"; // Import Next.js Image component
import axios from "axios";

const Gallery: React.FC = () => {
  // State for storing gallery images
  // const [galleryImages, setGalleryImages] = useState([
  //   { id: 1, src: "/assets/mixer.png", alt: "Mixer" },
  //   { id: 2, src: "/assets/robo.png", alt: "Robo" },
  //   { id: 3, src: "/assets/foundary.png", alt: "Foundary" },
  //   { id: 4, src: "/assets/incernator.png", alt: "Incernator" },
  //   { id: 5, src: "/assets/treatment.png", alt: "Treatment" },
  //   { id: 6, src: "/assets/wirestranding.png", alt: "Wire Stranding" },
  //   { id: 7, src: "/assets/specialpurpose.png", alt: "Special Purpose" },
  //   { id: 8, src: "/assets/mixer.png", alt: "Mixer" },
  //   { id: 9, src: "/assets/robo.png", alt: "Robo" },
  // ]);
  const [galleryImages, setGalleryImages] = useState<{ id: number, src: string, alt: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch gallery images from the database
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await axios.get('/api/content/gallery');
        const galleryData = response.data.content.galleryImages;
        setGalleryImages(galleryData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Gallery Title */}
      <h2 className="text-3xl font-bold text-center mb-6">Gallery</h2>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image) => (
          <div
            key={image.id}
            className="relative group overflow-hidden rounded-lg"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={300} // Set width for Image component
              height={300} // Set height for Image component
              className="w-full h-full object-cover rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105"
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
