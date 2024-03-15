import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

const LocationMarker = () => {
const [position, setPosition] = useState<LatLng | null>(null);

const map = useMapEvents({
    click() {
        map.locate();
    },
    locationfound(e) {
        setPosition(e.latlng);
        console.log(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
    },
});

  return position === null ? null : (
    console.log(position),
    <Marker position={position}>
   
      <Popup>You are here</Popup>
    </Marker>
  );
};

const MapView = () => {
  const position = [51.505, -0.09];

  return (
    <MapContainer center={position} zoom={20} scrollWheelZoom={true} style={{ height: '100vh', width : '200vh' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

    
      <LocationMarker />
    </MapContainer>
  );
};


export default MapView;