import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Client = () => {
  const [serverMessage, setServerMessage] = useState(null);
  const [receivedData] = useState(new Set());

  useEffect(() => {
    const socket = io('ws://localhost:50000');

    socket.on('from-server', (msg) => {
      setServerMessage(msg);

      // 只有在收到新的不同数据时才打印输出
      if (!receivedData.has(msg)) {
        receivedData.add(msg);
        console.log(receivedData);
      }
      // console.log(receivedData);
    });

    return () => {
      socket.disconnect();
    };
  }, [receivedData]);

  return null; // 或者返回一些其他 UI 组件
};

export default Client;