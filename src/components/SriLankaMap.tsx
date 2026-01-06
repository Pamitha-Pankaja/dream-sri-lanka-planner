import React from 'react';

interface SriLankaMapProps {
  route: string[];
}

// Approximate positions of Sri Lankan destinations on an SVG map
const destinations: Record<string, { x: number; y: number }> = {
  'Colombo': { x: 75, y: 320 },
  'Colombo Airport': { x: 65, y: 285 },
  'Negombo': { x: 70, y: 280 },
  'Sigiriya': { x: 165, y: 200 },
  'Dambulla': { x: 155, y: 215 },
  'Kandy': { x: 145, y: 265 },
  'Nuwara Eliya': { x: 160, y: 305 },
  'Ella': { x: 180, y: 335 },
  'Yala': { x: 230, y: 400 },
  'Mirissa': { x: 130, y: 435 },
  'Weligama': { x: 120, y: 430 },
  'Galle': { x: 100, y: 420 },
  'Hikkaduwa': { x: 90, y: 405 },
  'Bentota': { x: 80, y: 375 },
  'Tangalle': { x: 170, y: 425 },
  'Arugam Bay': { x: 275, y: 340 },
  'Trincomalee': { x: 220, y: 170 },
  'Polonnaruwa': { x: 200, y: 200 },
};

const SriLankaMap = ({ route }: SriLankaMapProps) => {
  const routePoints = route
    .map(place => destinations[place])
    .filter(Boolean);

  const pathD = routePoints
    .map((point, idx) => `${idx === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <svg
        viewBox="0 0 350 500"
        className="w-full h-auto"
        style={{ maxHeight: '500px' }}
      >
        {/* Sri Lanka outline (simplified) */}
        <path
          d="M75 130 Q120 90 180 100 Q230 115 260 150 Q290 200 285 260 Q280 320 260 380 Q240 440 180 470 Q120 490 80 450 Q50 410 60 350 Q55 280 60 220 Q65 160 75 130 Z"
          fill="hsl(var(--secondary))"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          className="opacity-80"
        />

        {/* Route line */}
        {pathD && (
          <path
            d={pathD}
            fill="none"
            stroke="hsl(var(--sunset))"
            strokeWidth="3"
            strokeDasharray="8 4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-fade-in"
          />
        )}

        {/* Destination markers */}
        {route.map((place, idx) => {
          const pos = destinations[place];
          if (!pos) return null;
          
          return (
            <g key={place} className="animate-scale-in" style={{ animationDelay: `${idx * 100}ms` }}>
              {/* Outer ring */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r="12"
                fill="hsl(var(--primary) / 0.2)"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
              />
              {/* Inner dot */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r="6"
                fill="hsl(var(--primary))"
              />
              {/* Number */}
              <text
                x={pos.x}
                y={pos.y + 4}
                textAnchor="middle"
                fontSize="8"
                fontWeight="bold"
                fill="white"
              >
                {idx + 1}
              </text>
              {/* Label */}
              <text
                x={pos.x + 18}
                y={pos.y + 4}
                fontSize="11"
                fontWeight="500"
                fill="hsl(var(--foreground))"
              >
                {place}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
        {route.map((place, idx) => (
          <div key={place} className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
              {idx + 1}
            </span>
            <span className="text-muted-foreground">{place}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SriLankaMap;
