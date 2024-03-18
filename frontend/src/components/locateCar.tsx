import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Client = () => {
  const [serverMessage, setServerMessage] = useState(null);
  const [receivedData, setReceivedData] = useState([]);

  useEffect(() => {
    const socket = io('ws://localhost:50000');

    socket.on('from-server', (msg) => {
      setServerMessage(msg);

      // 解析接收到的 GPS 数据，并添加到 receivedData
      const [latitude, longitude] = msg.split(',').map(parseFloat);
      if (!isNaN(latitude) && !isNaN(longitude)) {
        setReceivedData(prevData => [...prevData, { latitude, longitude }]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <MapContainer center={[23.174023, 113.408984]} zoom={20} style={{ height: '100vh', width: '200vh' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {receivedData.map((data, index) => (
        <Marker key={index} position={[data.latitude, data.longitude]}>
          <Popup>
            Latitude: {data.latitude}<br />
            Longitude: {data.longitude}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Client;
