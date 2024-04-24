import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MarkerData {
  id: string;
  position: google.maps.LatLngLiteral;
}

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: 37.42,
  lng: -122.1
};

const initialMarkers: MarkerData[] = [
  { id: '1', position: { lat: 37.421, lng: -122.084 } },
  { id: '2', position: { lat: 37.422, lng: -122.085 } }
];

const Map: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerData[]>(initialMarkers);
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

  const handleMarkerClick = (id: string) => {
    setSelectedMarkerId(id);
  };

  const apiKey = process.env.API_GOOGLE_KEY

  return (
    <LoadScript
      googleMapsApiKey={apiKey!}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >
        {markers.map(marker => (
          <Marker
            key={marker.id}
            position={marker.position}
            onClick={() => handleMarkerClick(marker.id)}
            icon={{
              url: selectedMarkerId === marker.id ? 
                   'http://maps.google.com/mapfiles/ms/icons/red-dot.png' :
                   'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              // Assuming no label origin is necessary for your icon offset,
              // Otherwise, use custom styles or handle dynamically inside events
            }}
            label={{
              text: marker.id,
              color: 'black',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
