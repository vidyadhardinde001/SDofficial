"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

interface Product {
  name: string;
  image: string;
  pdf: string; // PDF link for the product
}

const hardcodedData: Product[] = [
  {
    name: "HMI",
    image: "https://drive.google.com/uc?export=view&id=1yUosAAeAGk3OIlATMktF0L_uiHbRyj0F",
    pdf: "https://drive.google.com/file/d/1Fdt6c4z39196U_mcdhpuTj4AdHk7sHWo/view?usp=sharing",  // Open PDF in browser
  },
  {
    name: "PLC",
    image: "https://drive.google.com/uc?export=view&id=1B_luix_ZiNqFvloy4RkbEJKbnKahfAmq",
    pdf: "https://drive.google.com/file/d/1W1NrDeHl9Nga-eBmyngkBuVLTmUKTZ3o/view?usp=sharing",  // Open PDF in browser
  },
  {
    name: "SCADA SOFTWARE",
    image: "https://drive.google.com/uc?export=view&id=1WMcJ_Zy80eAqc6tvXoJHgxNNBT2U4cKI",
    pdf: "https://drive.google.com/file/d/1M1lMP0ZpbDmFptjNPu7ieDgGt5HDOfVg/view?usp=sharing",  // Open PDF in browser
  },
  {
    name: "VFD",
    image: "https://drive.google.com/uc?export=view&id=18m72OxcU5DUxYuNqkEj_p-UWUckE88RF",
    pdf: "https://drive.google.com/file/d/1iXGcv59W4uFG1R6UV5FDANP_dCd_KBOT/view?usp=sharing",  // Open PDF in browser
  },
  {
    name: "SERVO",
    image: "https://drive.google.com/uc?export=view&id=1tLIvPwNl-nvdjAVk4DMrVigQKMhuEzoJ",
    pdf: "https://drive.google.com/file/d/1eweqLTHNcHlGtnk-tcAHo618f-mjKoPx/view?usp=sharing",  // Open PDF in browser
  },
  {
    name: "SMPS",
    image: "https://drive.google.com/uc?export=view&id=1eRy-FPqDGC_aom09Co2p-M2ORrBL4Ki3",
    pdf: "https://drive.google.com/file/d/1OWM69mJBGHPrnBQ6_ellOkSykUca_dry/view?usp=sharing",  // Open PDF in browser
  },
  {
    name: "Motors",
    image: "https://drive.google.com/uc?export=view&id=1_7J20t1NUY8oTX5g6_O7U0E7QNVzontL",
    pdf: "https://drive.google.com/file/d/1M1lMP0ZpbDmFptjNPu7ieDgGt5HDOfVg/view?usp=sharing",  // Open PDF in browser
  },
  {
    name: "Temperature Controller",
    image: "https://drive.google.com/uc?export=view&id=1O8-5YAl9MFmL9CdnGzoGm3zgbQaUO_pc",
    pdf: "https://drive.google.com/file/d/1XBr9a-plFoDl_sq1QfOXJaz2jVLO6Bbg/view?usp=sharing",  // Open PDF in browser
  },
  {
    name: "Encoders",
    image: "https://drive.google.com/uc?export=view&id=1yEbNjc5GYdD9HIY8W67_wfhRh5crx6QK",
    pdf: "https://drive.google.com/file/d/1M1lMP0ZpbDmFptjNPu7ieDgGt5HDOfVg/view?usp=sharing",  // Open PDF in browser
  },
  
];

const CACHE_KEY = "productsCache";
const CACHE_EXPIRATION = 60 * 60 * 1000;

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(hardcodedData); // Initialize with hardcoded data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
//    const fetchProducts = async () => {
//      try {
  //      const cachedData = localStorage.getItem(CACHE_KEY);
    //    const cacheTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);

//        if (cachedData && cacheTimestamp) {
//          const isCacheValid =
//            Date.now() - parseInt(cacheTimestamp) < CACHE_EXPIRATION;
//          if (isCacheValid) {
//            setProducts(JSON.parse(cachedData));
//            return;
//          }
//        }

//        const response = await axios.get("/api/content/products");
//        const productsData: Product[] = response.data.content.productsList;

        // Ensure the response data is an array of products
//        if (Array.isArray(productsData)) {
  //        setProducts(productsData);
  //      } else {
  //        console.error("Received data is not an array:", productsData);
 //         setError("");
//        }
//        localStorage.setItem(CACHE_KEY, JSON.stringify(productsData));
//        localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());
//      } catch (err) {
//        console.error("", err);
//        setError("");
//      } finally {
//        setLoading(false);
//      }
//    };

//    fetchProducts();
      setLoading(false); // Set loading to false after initial mount
  }, []);

  const handleProductClick = (product: Product) => {
    const pdfUrl = product.pdf;
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white">
      <h2 className="text-5xl font-medium text-center mb-8">Our Products</h2>

      {loading && <p className="text-center">Loading products...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 hover:shadow-lg cursor-pointer flex flex-col items-center"
            onClick={() => handleProductClick(product)}
          >
            <div className="relative w-full h-32 mb-4">
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="contain"
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
