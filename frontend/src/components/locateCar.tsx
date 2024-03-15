//从后端flask获取车辆位置信息后，将车辆位置信息显示在地图上，建立通信，实现车辆位置的实时更新
import  { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngTuple } from 'leaflet';
import { LatLng } from 'leaflet';
import { io } from 'socket.io-client';
import { Car } from '../types/Car';
import { CarIcon } from  'public\car.png';

const socket = io('http://localhost:5000');
//从flask后端获取车辆位置信息
const useCarLocation = () => {
  const [carLocation, setCarLocation] = useState<Car | null>(null);
  useEffect(() => {
    socket.on('carLocation', (car: Car) => {
      setCarLocation(car);
    });
  }, []);
  return carLocation;
};
//车辆位置的显示
const CarLocation = () => {
  const carLocation = useCarLocation();
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  return carLocation === null ? null : (
    <Marker position={carLocation.position}>
      <Popup>Car is here</Popup>
    </Marker>
  );
};
//地图的显示
const LocateCar = () => {
    const position: LatLngTuple = [51.505, -0.09];
    return (
        <MapContainer center={position} zoom={20} scrollWheelZoom={true} style={{ height: '100vh', width : '200vh' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <CarLocation />
        </MapContainer>
    );
};
export default LocateCar;
