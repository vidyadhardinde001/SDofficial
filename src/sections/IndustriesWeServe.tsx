import React from 'react';

const industries = [
  { name: 'Automobile', imagePath: '/assets/car.png' },
  { name: 'Metal Industry', imagePath: '/assets/metal.png' },
  { name: 'Wire Industry', imagePath: '/assets/wire.png' },
  { name: 'Cold Storage', imagePath: '/assets/cold.png' },
  { name: 'Animal Feed', imagePath: '/assets/animal.png' },
  { name: 'Food Industries', imagePath: '/assets/food.png' },
  { name: 'Water Treatment & Distribution', imagePath: '/assets/water.png' },
  { name: 'Environmental', imagePath: '/assets/plant.png' },
  { name: 'Plastic Pipe Industry', imagePath: '/assets/pipe.png' },
];

const IndustriesWeServe: React.FC = () => {
  return (
    <section className="bg-[#263142] text-white py-12">
      <h2 className="text-center text-4xl font-normal mb-8">Industries we serve</h2>
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
        {industries.map((industry) => (
          <div key={industry.name} className="flex flex-col items-center text-center">
            <div className="bg-[#fff] rounded-full p-2 mb-2">
              <img
                src={industry.imagePath}
                alt={industry.name}
                className="w-12 h-12 object-contain"
              />
            </div>
            <p className="text-sm font-medium">{industry.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IndustriesWeServe;
