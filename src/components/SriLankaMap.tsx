import React, { useState } from 'react';

// Import location images
import kalpitiyaBeachSunset from '@/assets/kalpitiya-beach-sunset.jpg';
import sigiriyaSunset from '@/assets/sigiriya-sunset.jpg';
import buddhaReflection from '@/assets/buddha-reflection.jpg';
import elephantsHerd from '@/assets/elephants-herd.jpg';
import teaPlantationAerial from '@/assets/tea-plantation-aerial.jpg';
import leopardTree from '@/assets/leopard-tree.jpg';
import surfingWaves from '@/assets/surfing-waves.jpg';
import trainScenic from '@/assets/train-scenic.jpg';
import snorkelingReef from '@/assets/snorkeling-reef.jpg';
import tropicalWaterfall from '@/assets/tropical-waterfall.jpg';

interface SriLankaMapProps {
  route: string[];
  locationImages?: Record<string, string>;
}

// Approximate positions of Sri Lankan destinations on an SVG map
const getDestinations = (locationImages?: Record<string, string>): Record<string, { x: number; y: number; image?: string; description?: string }> => ({
  'Colombo': { x: 75, y: 320, image: locationImages?.['Colombo'] || kalpitiyaBeachSunset, description: 'Commercial Capital' },
  'Colombo Airport': { x: 65, y: 285, image: locationImages?.['Colombo Airport'] || kalpitiyaBeachSunset, description: 'Bandaranaike International Airport' },
  'Negombo': { x: 70, y: 280, image: locationImages?.['Negombo'] || kalpitiyaBeachSunset, description: 'Beach Town & Fishing Village' },
  'Sigiriya': { x: 165, y: 200, image: locationImages?.['Sigiriya'] || sigiriyaSunset, description: 'Ancient Rock Fortress' },
  'Dambulla': { x: 155, y: 215, image: locationImages?.['Dambulla'] || buddhaReflection, description: 'Cave Temple Complex' },
  'Kandy': { x: 145, y: 265, image: locationImages?.['Kandy'] || buddhaReflection, description: 'Cultural Capital & Temple of Tooth' },
  'Nuwara Eliya': { x: 160, y: 305, image: locationImages?.['Nuwara Eliya'] || teaPlantationAerial, description: 'Little England - Hill Country' },
  'Tea Country': { x: 160, y: 290, image: locationImages?.['Tea Country'] || teaPlantationAerial, description: 'Ceylon Tea Plantations' },
  'Ella': { x: 180, y: 335, image: locationImages?.['Ella'] || trainScenic, description: 'Scenic Hill Town' },
  'Yala': { x: 230, y: 400, image: locationImages?.['Yala'] || leopardTree, description: 'National Park - Wildlife Safari' },
  'Mirissa': { x: 130, y: 435, image: locationImages?.['Mirissa'] || surfingWaves, description: 'Whale Watching & Beaches' },
  'Weligama': { x: 120, y: 430, image: locationImages?.['Weligama'] || surfingWaves, description: 'Surfing & Stilt Fishermen' },
  'Galle': { x: 100, y: 420, image: locationImages?.['Galle'] || kalpitiyaBeachSunset, description: 'UNESCO Dutch Fort' },
  'Hikkaduwa': { x: 90, y: 405, image: locationImages?.['Hikkaduwa'] || snorkelingReef, description: 'Coral Reefs & Beach Town' },
  'Bentota': { x: 80, y: 375, image: locationImages?.['Bentota'] || kalpitiyaBeachSunset, description: 'Beach Resort Town' },
  'Tangalle': { x: 170, y: 425, image: locationImages?.['Tangalle'] || kalpitiyaBeachSunset, description: 'Pristine Southern Beaches' },
  'Arugam Bay': { x: 275, y: 340, image: locationImages?.['Arugam Bay'] || surfingWaves, description: 'World-Class Surf Spot' },
  'Trincomalee': { x: 220, y: 170, image: locationImages?.['Trincomalee'] || kalpitiyaBeachSunset, description: 'Natural Harbor & Beaches' },
  'Polonnaruwa': { x: 200, y: 200, image: locationImages?.['Polonnaruwa'] || buddhaReflection, description: 'Ancient Capital Ruins' },
  'Anuradhapura': { x: 140, y: 180, image: locationImages?.['Anuradhapura'] || buddhaReflection, description: 'Sacred City & Ancient Ruins' },
  'Pasikuda': { x: 240, y: 220, image: locationImages?.['Pasikuda'] || kalpitiyaBeachSunset, description: 'Shallow Waters & Beach Resort' },
  'Koggala': { x: 115, y: 428, image: locationImages?.['Koggala'] || kalpitiyaBeachSunset, description: 'Lake & Beach Area' },
  'Wilpattu': { x: 95, y: 200, image: locationImages?.['Wilpattu'] || leopardTree, description: 'Leopard Country - National Park' },
  'Koslanda': { x: 170, y: 320, image: locationImages?.['Koslanda'] || tropicalWaterfall, description: 'Tea Country & Waterfalls' },
});

const SriLankaMap = ({ route, locationImages }: SriLankaMapProps) => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  
  // Get destinations with custom images if provided
  const destinations = getDestinations(locationImages);
  
  const routePoints = route
    .map(place => destinations[place])
    .filter(Boolean);

  const pathD = routePoints
    .map((point, idx) => `${idx === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Location photo card */}
      {selectedLocation && destinations[selectedLocation]?.image && (
        <div className="mb-4 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 animate-fade-in">
          <div className="relative">
            <button
              onClick={() => setSelectedLocation(null)}
              className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-md transition-colors z-10"
              aria-label="Close"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={destinations[selectedLocation].image}
              alt={selectedLocation}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-900 mb-1">{selectedLocation}</h3>
              {destinations[selectedLocation].description && (
                <p className="text-sm text-gray-600">{destinations[selectedLocation].description}</p>
              )}
            </div>
          </div>
        </div>
      )}
      
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
            <g 
              key={place} 
              className="animate-scale-in cursor-pointer hover:opacity-80 transition-opacity" 
              style={{ animationDelay: `${idx * 100}ms` }}
              onClick={() => setSelectedLocation(place)}
            >
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
                style={{ pointerEvents: 'none' }}
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
                style={{ pointerEvents: 'none' }}
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
          <div 
            key={place} 
            className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setSelectedLocation(place)}
          >
            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
              {idx + 1}
            </span>
            <span className="text-muted-foreground hover:text-foreground transition-colors">{place}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SriLankaMap;
