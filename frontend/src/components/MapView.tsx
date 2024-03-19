import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = () => {
  const [serverMessage, setServerMessage] = useState(null);
  const [receivedData] = useState(new Set());
  
  useEffect(() => {
    const socket = io('ws://localhost:50000');

    socket.on('from-server', (msg) => {
      setServerMessage(msg);
      // 只有在收到新的不同数据时才打印输出
      if (!receivedData.has(msg)) {
        receivedData.add(msg);
        console.log(msg);
        // 将新的 GPS 数据广播给所有连接的客户端
        // socket.emit('gps-data', msg);
      }
      console.log(receivedData);
    });

    return () => {
      socket.disconnect();
    };
  }, [receivedData]);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={20} scrollWheelZoom={true} style={{ height: '100vh', width: '200vh' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
     
        <Marker position={receivedData}>
          <Popup>GPS Position</Popup>
        </Marker>
      
    </MapContainer>
  );
};

export default MapView;