"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Product {
  name: string;
  image: string;
  details: string;
}

const productData: Product[] = [
  {
    name: "Lubi Catalog",
    image: "/assets/products/lubi.webp",
    details: "Lubi Catalog provides comprehensive solutions for various industrial needs.",
  },
  {
    name: "SMPS",
    image: "/assets/products/smps.jpg",
    details: "SMPS (Switched Mode Power Supply) ensures efficient power delivery.",
  },
  {
    name: "Motors",
    image: "/assets/products/motor.jpg",
    details: "High-performance motors for industrial and commercial applications.",
  },
  {
    name: "VFD",
    image: "/assets/products/vfd.jpg",
    details: "Variable Frequency Drives for controlling motor speed efficiently.",
  },
  {
    name: "Temperature Controller",
    image: "/assets/products/temp.jpg",
    details: "Precision temperature controllers for diverse industrial processes.",
  },
  {
    name: "PLC",
    image: "/assets/products/plc.jpg",
    details: "Programmable Logic Controllers for automation and control systems.",
  },
  {
    name: "Encoders",
    image: "/assets/products/encoder.jpg",
    details: "Encoders for precise motion control and positioning.",
  },
  {
    name: "HMI",
    image: "/assets/products/hmi.jpg",
    details: "Human-Machine Interface solutions for seamless user interaction.",
  },
  // Add other products here
];

const ProductGrid: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [visibleProductsCount, setVisibleProductsCount] = useState(5); // Initial number of products to show
  const [isExpanded, setIsExpanded] = useState(false); // Track if the products are expanded

  // Handle loading more products
  const toggleProductVisibility = () => {
    if (isExpanded) {
      setVisibleProductsCount(5); // Show the initial 5 products
    } else {
      setVisibleProductsCount(productData.length); // Show all products
    }
    setIsExpanded(!isExpanded); // Toggle the expanded state
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white">
      <h2 className="text-5xl font-medium text-center mb-8">Our Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {productData.slice(0, visibleProductsCount).map((product, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 hover:shadow-lg cursor-pointer flex flex-col items-center"
            onClick={() => setSelectedProduct(product)}
          >
            <div className="relative w-full h-32 mb-4"> {/* Fixed image size */}
              <Image
                src={product.image}
                alt={product.name}
                layout="fill" // Ensures the image fills the container
                objectFit="contain" // Maintain aspect ratio of image
                className="object-contain"
              />
            </div>
            <h3 className="text-lg font-medium text-center">{product.name}</h3>
          </div>
        ))}
      </div>

      {/* See More / Show Less Button */}
      <div className="text-center mt-6">
        <button
          onClick={toggleProductVisibility}
          className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
        >
          {isExpanded ? "Show Less" : "See More"}
        </button>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">{selectedProduct.name}</h3>
            <p className="mb-6">{selectedProduct.details}</p>
            <button
              onClick={() => setSelectedProduct(null)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
