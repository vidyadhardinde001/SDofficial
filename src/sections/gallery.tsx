import React from "react";

const Gallery: React.FC = () => {
  const galleryImages = [
    { id: 1, src: "/assets/mixer.png", alt: "Image 1" },
    { id: 2, src: "/assets/robo.png", alt: "Image 2" },
    { id: 3, src: "/assets/foundary.png", alt: "Image 3" },
    { id: 4, src: "/assets/incernator.png", alt: "Image 4" },
    { id: 5, src: "/assets/treatment.png", alt: "Image 5" },
    { id: 6, src: "/assets/wirestranding.png", alt: "Image 6" },
    { id: 7, src: "/assets/specialpurpose.png", alt: "Image 7" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="col-span-2 row-span-2">
          <img
            src={galleryImages[0].src}
            alt={galleryImages[0].alt}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="col-span-1 row-span-1">
          <img
            src={galleryImages[1].src}
            alt={galleryImages[1].alt}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="col-span-1 row-span-2">
          <img
            src={galleryImages[2].src}
            alt={galleryImages[2].alt}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="col-span-1 row-span-1">
          <img
            src={galleryImages[3].src}
            alt={galleryImages[3].alt}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="col-span-2 row-span-1">
          <img
            src={galleryImages[4].src}
            alt={galleryImages[4].alt}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="col-span-1 row-span-1">
          <img
            src={galleryImages[5].src}
            alt={galleryImages[5].alt}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="col-span-1 row-span-1">
          <img
            src={galleryImages[6].src}
            alt={galleryImages[6].alt}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
