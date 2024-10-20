"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image"; // Import Next.js Image component
import axios from "axios";

const Gallery: React.FC = () => {
  const [galleryImages, setGalleryImages] = useState<{ id: number, src: string, alt: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State to hold the selected image for the lightbox

  // Fetch gallery images from the database
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await axios.get('https://sdofficial-r1zr.onrender.com/api/content/gallery');
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
    <div className="container mx-auto px-4 py-8">
      {/* Gallery Title */}
      <h2 className="text-3xl font-bold text-center mb-6">Gallery</h2>

      {/* Loading Indicator */}
      {loading && <p className="text-center text-lg">Loading images...</p>}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image) => (
          <div
            key={image.id}
            className="relative group overflow-hidden rounded-lg"
            onClick={() => handleImageClick(image.src)} // Open lightbox on click
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={300} // Set width for Image component
              height={300} // Set height for Image component
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
            />
            <p className="text-center text-lg font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {image.alt}
            </p>
          </div>
        ))}
      </div>

      {/* Lightbox for Full Image View */}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={closeLightbox}>
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
