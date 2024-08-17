import React, { useState } from 'react';

const gridSection = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const cards = [
    { id: 'hardware', title: 'Hardware', img: 'hardware.jpg' },
    { id: 'selection', title: 'Selection Of right Products', img: 'selection.jpg' },
    { id: 'maintenance', title: 'Corrective & Preventive Maintenance', img: 'maintenance.jpg' },
    { id: 'integration', title: 'Instrumentation & System Integration', img: 'integration.jpg' },
    { id: 'monitoring', title: 'Energy Monitoring systems', img: 'monitoring.jpg' },
    { id: 'sensor', title: 'Safety Sensor Solutions', img: 'sensor.jpg' },
    { id: 'programming', title: 'Custom Programming for PLC, HMI, SCADA, VFD, Servo', img: 'programming.jpg' },
    { id: 'engineering', title: 'Engineering projects', img: 'engineering.jpg' },
  ];

  return (
    <div className="text-center p-8">
      <h2 className="text-3xl font-semibold mb-8">How we Add value to our Products</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`relative w-52 h-40 rounded-xl flex items-center justify-center bg-orange-200 transition-all duration-300 cursor-pointer
            ${hoveredCard === card.id ? 'w-full h-80 z-10' : ''}`}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {hoveredCard === card.id ? (
              <img src={card.img} alt={card.title} className="absolute inset-0 w-full h-full object-cover rounded-xl" />
            ) : (
              <div className="text-lg font-semibold">{card.title}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default gridSection;
