import React from 'react';

const industries = [
  { name: 'Automobile', icon: '/public/assets/car.png' },
  { name: 'Metal Industry', icon: '⚒️' },
  { name: 'Wire Industry', icon: '🔌' },
  { name: 'Cold Storage', icon: '❄️' },
  { name: 'Animal Feed', icon: '🐄' },
  { name: 'Food Industries', icon: '🍴' },
  { name: 'Water Treatment & Distribution', icon: '💧' },
  { name: 'Environmental', icon: '🌱' },
  { name: 'Plastic Pipe Industry', icon: '🛠️' },
];

const IndustriesWeServe: React.FC = () => {
  return (
    <section className="bg-gray-900 text-white py-12">
      <h2 className="text-center text-3xl font-semibold mb-8">Industries we serve</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {industries.map((industry) => (
          <div key={industry.name} className="flex flex-col items-center text-center">
            <div className="text-5xl mb-4">{industry.icon}</div>
            <p className="text-lg font-medium">{industry.name}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-8 pr-8">
        <div className="text-orange-500 text-3xl">&gt;&gt;&gt;</div>
      </div>
    </section>
  );
};

export default IndustriesWeServe;
