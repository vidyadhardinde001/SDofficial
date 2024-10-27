"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image"; // Import Next.js Image component
import axios from "axios";

const Gallery: React.FC = () => {
  const [galleryImages, setGalleryImages] = useState<{ id: number; src: string; alt: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State to hold the selected image for the lightbox

  // Fetch gallery images from the database
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await axios.get("/api/content/gallery");
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

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="mx-auto px-4 py-8 bg-white">
      {/* Gallery Title and Description */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">Gallery</h2>
      </div>

      {/* Loading Indicator */}
      {loading && <p className="text-center text-lg">Loading images...</p>}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.slice(1).map((image) => ( // Skipping the first image as it's used as the header
          <div
            key={image.id}
            className="relative group overflow-hidden rounded-lg"
            onClick={() => handleImageClick(image.src)} // Open lightbox on click
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={300}
              height={200}
              className="w-full h-64 object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
            />
            <p className="text-center text-lg font-medium mt-2">{image.alt}</p>
          </div>
        ))}
      </div>

      {/* Lightbox for Full Image View */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          onClick={closeLightbox}
        >
          <Image
            src={selectedImage}
            alt="Selected"
            width={800}
            height={800}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
