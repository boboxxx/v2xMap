import { useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('ws://localhost:5000');

const Client = () => {
  const [serverMessage, setServerMessage] = useState(null);

  socket.on('from-server', (msg) => {
    setServerMessage(msg);
    console.log(typeof msg);
    console.log('msg:', msg)
  });

  const sendToServer = () => {
    socket.emit('to-server', 'hello');
  }

  
  return (
    {serverMessage}
  );
}

export default Client;