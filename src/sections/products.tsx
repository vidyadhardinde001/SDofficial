"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

interface Product {
  name: string;
  image: string;
  pdf: string;  // Add PDF link to the product data
}

const hardcodedData: Product[] = [
  {
    name: "Lubi Catalog",
    image: "https://drive.google.com/uc?export=view&id=1BVqrRRB4Plnn7OOtJ1uWlo0GbeFapR84",
    pdf: "https://drive.google.com/file/d/1ftLX6aqz0USMwO4uqQhPn2k_qO_ETT5i/view?usp=sharing",  // Open PDF in browser
  },
  {
    name: "SMPS",
    image: "https://drive.google.com/uc?export=view&id=1BVqrRRB4Plnn7OOtJ1uWlo0GbeFapR84",
    pdf: "https://drive.google.com/file/d/1ftLX6aqz0USMwO4uqQhPn2k_qO_ETT5i/view?usp=sharing",  // Open PDF in browser
  },
  {
    name: "Motors",
    image: "https://drive.google.com/uc?export=view&id=1BVqrRRB4Plnn7OOtJ1uWlo0GbeFapR84",
    pdf: "https://drive.google.com/file/d/1ftLX6aqz0USMwO4uqQhPn2k_qO_ETT5i/view?usp=sharing",  // Open PDF in browser
  },
  {
    name: "VFD",
    image: "https://drive.google.com/uc?export=view&id=1BVqrRRB4Plnn7OOtJ1uWlo0GbeFapR84",
    pdf: "https://drive.google.com/file/d/1ftLX6aqz0USMwO4uqQhPn2k_qO_ETT5i/view?usp=sharing",  // Open PDF in browser
  },
  {
    name: "Temperature Controller",
    image: "https://drive.google.com/uc?export=view&id=1BVqrRRB4Plnn7OOtJ1uWlo0GbeFapR84",
    pdf: "https://drive.google.com/file/d/1ftLX6aqz0USMwO4uqQhPn2k_qO_ETT5i/view?usp=sharing",  // Open PDF in browser
  },
  {
    name: "PLC",
    image: "https://drive.google.com/uc?export=view&id=1BVqrRRB4Plnn7OOtJ1uWlo0GbeFapR84",
    pdf: "https://drive.google.com/file/d/1ftLX6aqz0USMwO4uqQhPn2k_qO_ETT5i/view?usp=sharing",  // Open PDF in browser
  },
  {
    name: "Encoders",
    image: "https://drive.google.com/uc?export=view&id=1BVqrRRB4Plnn7OOtJ1uWlo0GbeFapR84",
    pdf: "https://drive.google.com/file/d/1ftLX6aqz0USMwO4uqQhPn2k_qO_ETT5i/view?usp=sharing",  // Open PDF in browser
  },
  {
    name: "HMI",
    image: "https://drive.google.com/uc?export=view&id=1BVqrRRB4Plnn7OOtJ1uWlo0GbeFapR84",
    pdf: "https://drive.google.com/file/d/1ftLX6aqz0USMwO4uqQhPn2k_qO_ETT5i/view?usp=sharing",  // Open PDF in browser
  },
];

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(hardcodedData); // Initially show hardcoded data

  const handleProductClick = (product: Product) => {
    // Open PDF in a new window/tab
    const pdfUrl = product.pdf;
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white">
      <h2 className="text-5xl font-medium text-center mb-8">Our Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 hover:shadow-lg cursor-pointer flex flex-col items-center"
            onClick={() => handleProductClick(product)}  // Open PDF on click
          >
            <div className="relative w-full h-32 mb-4">
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
    </div>
  );
};

export default ProductGrid;