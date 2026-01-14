import React, { useCallback, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline, InfoWindow } from '@react-google-maps/api';
import { useLanguage } from '@/context/LanguageContext';

interface TourMapProps {
  route: string[];
}

// Real GPS coordinates for Sri Lankan destinations
const destinations: Record<string, { lat: number; lng: number; description?: string }> = {
  'Colombo': { lat: 6.9271, lng: 79.8612, description: 'Commercial Capital' },
  'Colombo Airport': { lat: 7.1808, lng: 79.8841, description: 'Bandaranaike International Airport' },
  'Negombo': { lat: 7.2008, lng: 79.8737, description: 'Beach Town & Fishing Village' },
  'Sigiriya': { lat: 7.9570, lng: 80.7603, description: 'Ancient Rock Fortress' },
  'Dambulla': { lat: 7.8742, lng: 80.6511, description: 'Cave Temple Complex' },
  'Kandy': { lat: 7.2906, lng: 80.6337, description: 'Cultural Capital & Temple of Tooth' },
  'Nuwara Eliya': { lat: 6.9497, lng: 80.7891, description: 'Little England - Hill Country' },
  'Tea Country': { lat: 6.9270, lng: 80.6150, description: 'Ceylon Tea Plantations' },
  'Ella': { lat: 6.8667, lng: 81.0466, description: 'Scenic Hill Town' },
  'Yala': { lat: 6.3728, lng: 81.5088, description: 'National Park - Wildlife Safari' },
  'Mirissa': { lat: 5.9483, lng: 80.4716, description: 'Whale Watching & Beaches' },
  'Weligama': { lat: 5.9747, lng: 80.4297, description: 'Surfing & Stilt Fishermen' },
  'Galle': { lat: 6.0535, lng: 80.2210, description: 'UNESCO Dutch Fort' },
  'Hikkaduwa': { lat: 6.1395, lng: 80.1010, description: 'Coral Reefs & Beach Town' },
  'Bentota': { lat: 6.4213, lng: 79.9977, description: 'Beach Resort Town' },
  'Tangalle': { lat: 6.0241, lng: 80.7945, description: 'Pristine Southern Beaches' },
  'Arugam Bay': { lat: 6.8406, lng: 81.8364, description: 'World-Class Surf Spot' },
  'Trincomalee': { lat: 8.5874, lng: 81.2152, description: 'Natural Harbor & Beaches' },
  'Polonnaruwa': { lat: 7.9403, lng: 81.0188, description: 'Ancient Capital Ruins' },
  'Anuradhapura': { lat: 8.3114, lng: 80.4037, description: 'Sacred City & Ancient Ruins' },
  'Pasikuda': { lat: 7.9241, lng: 81.5614, description: 'Shallow Waters & Beach Resort' },
  'Koggala': { lat: 5.9892, lng: 80.3285, description: 'Lake & Beach Area' },
};

const mapContainerStyle = {
  width: '100%',
  height: '450px',
  borderRadius: '16px',
};

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  streetViewControl: false,
  fullscreenControl: true,
  styles: [
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#e9e9e9' }, { lightness: 17 }],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }, { lightness: 20 }],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }, { lightness: 21 }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [{ color: '#ffffff' }, { lightness: 17 }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#ffffff' }, { lightness: 29 }, { weight: 0.2 }],
    },
  ],
};

const TourMap = ({ route }: TourMapProps) => {
  const { t } = useLanguage();
  const [selectedMarker, setSelectedMarker] = React.useState<number | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  // Get coordinates for route destinations
  const routeCoords = useMemo(() => {
    return route
      .map((place) => destinations[place])
      .filter((coord): coord is { lat: number; lng: number; description?: string } => coord !== undefined);
  }, [route]);

  // Calculate map center based on route
  const center = useMemo(() => {
    if (routeCoords.length === 0) {
      return { lat: 7.8731, lng: 80.7718 }; // Sri Lanka center
    }
    const avgLat = routeCoords.reduce((sum, coord) => sum + coord.lat, 0) / routeCoords.length;
    const avgLng = routeCoords.reduce((sum, coord) => sum + coord.lng, 0) / routeCoords.length;
    return { lat: avgLat, lng: avgLng };
  }, [routeCoords]);

  const onLoad = useCallback((map: google.maps.Map) => {
    if (routeCoords.length > 1) {
      const bounds = new google.maps.LatLngBounds();
      routeCoords.forEach((coord) => {
        bounds.extend(coord);
      });
      map.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 });
    }
  }, [routeCoords]);

  if (loadError) {
    return (
      <div className="w-full h-[450px] bg-muted rounded-2xl flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-destructive font-medium mb-2">Failed to load map</p>
          <p className="text-muted-foreground text-sm">Please check your API key configuration</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[450px] bg-muted rounded-2xl flex items-center justify-center animate-pulse">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={8}
        onLoad={onLoad}
        options={mapOptions}
      >
        {/* Route polyline */}
        <Polyline
          path={routeCoords}
          options={{
            strokeColor: '#0ea5e9',
            strokeOpacity: 0.8,
            strokeWeight: 4,
            geodesic: true,
          }}
        />

        {/* Destination markers */}
        {route.map((place, idx) => {
          const coord = destinations[place];
          if (!coord) return null;

          return (
            <Marker
              key={`${place}-${idx}`}
              position={coord}
              label={{
                text: String(idx + 1),
                color: 'white',
                fontWeight: 'bold',
                fontSize: '12px',
              }}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 18,
                fillColor: '#0ea5e9',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 3,
              }}
              onClick={() => setSelectedMarker(idx)}
            />
          );
        })}

        {/* Info window for selected marker */}
        {selectedMarker !== null && destinations[route[selectedMarker]] && (
          <InfoWindow
            position={destinations[route[selectedMarker]]}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-2 min-w-[150px]">
              <h4 className="font-semibold text-gray-900 mb-1">
                {selectedMarker + 1}. {route[selectedMarker]}
              </h4>
              {destinations[route[selectedMarker]].description && (
                <p className="text-sm text-gray-600">
                  {destinations[route[selectedMarker]].description}
                </p>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Route legend */}
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        {route.map((place, idx) => (
          <div
            key={place}
            className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
            onClick={() => setSelectedMarker(idx)}
          >
            <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shadow-md">
              {idx + 1}
            </span>
            <span className="text-muted-foreground hover:text-foreground">{place}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourMap;
