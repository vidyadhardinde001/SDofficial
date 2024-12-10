"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

interface Product {
  name: string;
  image: string;
  details: string;
}

const hardcodedData: Product[] = [
  {
    name: "Lubi Catalog",
    image: "https://drive.google.com/uc?export=view&id=1BVqrRRB4Plnn7OOtJ1uWlo0GbeFapR84",
    details: "Lubi Catalog provides comprehensive solutions for various industrial needs.",
  },
  {
    name: "SMPS",
    image: "https://drive.google.com/uc?export=view&id=1BVqrRRB4Plnn7OOtJ1uWlo0GbeFapR84",
    details: "SMPS (Switched Mode Power Supply) ensures efficient power delivery.",
  },
  {
    name: "Motors",
    image: "https://drive.google.com/uc?export=view&id=1BVqrRRB4Plnn7OOtJ1uWlo0GbeFapR84",
    details: "High-performance motors for industrial and commercial applications.",
  },
  {
    name: "VFD",
    image: "https://drive.google.com/uc?export=view&id=1BVqrRRB4Plnn7OOtJ1uWlo0GbeFapR84",
    details: "Variable Frequency Drives for controlling motor speed efficiently.",
  },
  {
    name: "Temperature Controller",
    image: "https://drive.google.com/uc?export=view&id=1BVqrRRB4Plnn7OOtJ1uWlo0GbeFapR84",
    details: "Precision temperature controllers for diverse industrial processes.",
  },
  {
    name: "PLC",
    image: "https://drive.google.com/uc?export=view&id=1BVqrRRB4Plnn7OOtJ1uWlo0GbeFapR84",
    details: "Programmable Logic Controllers for automation and control systems.",
  },
  {
    name: "Encoders",
    image: "https://drive.google.com/uc?export=view&id=1BVqrRRB4Plnn7OOtJ1uWlo0GbeFapR84",
    details: "Encoders for precise motion control and positioning.",
  },
  {
    name: "HMI",
    image: "https://drive.google.com/uc?export=view&id=1BVqrRRB4Plnn7OOtJ1uWlo0GbeFapR84",
    details: "Human-Machine Interface solutions for seamless user interaction.",
  },
  // Add other products here
];

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(hardcodedData); // Initially show hardcoded data
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/content/products');
        const productsData: Product[] = response.data.content.productsList;

        // Ensure the response data is an array of products
        if (Array.isArray(productsData)) {
          setProducts(productsData);
        } else {
          console.error('Received data is not an array:', productsData);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-full mx-auto p-6 bg-white">
      <h2 className="text-5xl font-medium text-center mb-8">Our Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {products.map((product, index) => (
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
