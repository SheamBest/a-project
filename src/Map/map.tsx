import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

interface MarkerData {
  id: string;
  position: google.maps.LatLngLiteral;
}

const containerStyle: React.CSSProperties = {
  width: '80vw',
  height: '100vh',
  float: 'right'
};

const sidebarStyle: React.CSSProperties = {
  width: '20vw',
  height: '100vh',
  position: 'absolute',
  left: 0,
  top: 0,
  backgroundColor: '#fff',
  padding: '20px',
  boxSizing: 'border-box' as 'border-box',
  display: 'flex',
  flexDirection: 'column'
};

const markersListStyle: React.CSSProperties = {
  overflow: 'auto',
  flex: 1
};

const clearButtonStyle: React.CSSProperties = {
  marginTop: '10px',
  padding: '10px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const center = {
  lat: 37.42,
  lng: -122.1
};

const Map: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const apiKey = process.env.API_GOOGLE_KEY;

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newMarker = {
        id: `marker_${Date.now()}`,
        position: { lat: event.latLng.lat(), lng: event.latLng.lng() }
      };
      setMarkers(prev => [...prev, newMarker]);
      setSelectedMarker(newMarker);
    }
  };

  const handleMarkerSelect = (marker: MarkerData) => {
    setSelectedMarker(marker);
  };

  const handleClearMarkers = () => {
    setMarkers([]);
    setSelectedMarker(null);
  };

  const handleMapRightClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setSelectedMarker(null); // Видалити вибрану мітку
      setMarkers(prev => prev.filter(m => !(m.position.lat === event.latLng!.lat() && m.position.lng === event.latLng!.lng())));
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <div style={sidebarStyle}>
        <div style={markersListStyle}>
          <h4>Попередні мітки:</h4>
          {markers.map(marker => (
            <div key={marker.id} onClick={() => handleMarkerSelect(marker)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
              Широта: {marker.position.lat.toFixed(4)}, Довгота: {marker.position.lng.toFixed(4)}
            </div>
          ))}
        </div>
        <button onClick={handleClearMarkers} style={clearButtonStyle}>
          Очистити
        </button>
      </div>
      <LoadScript googleMapsApiKey={apiKey!}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
          onClick={handleMapClick}
          onRightClick={handleMapRightClick} // Додавання обробника події правого кліку
        >
          {selectedMarker && (
            <React.Fragment>
              <Marker
                position={selectedMarker.position}
                icon={{
                  url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                }}
              />
              <InfoWindow position={selectedMarker.position}>
                <div>
                  <h3>Мітка</h3>
                  <p>Широта: {selectedMarker.position.lat}</p>
                  <p>Довгота: {selectedMarker.position.lng}</p>
                </div>
              </InfoWindow>
            </React.Fragment>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Map;
