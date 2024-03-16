import { useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('ws://localhost:5000');

const App = () => {
  const [serverMessage, setServerMessage] = useState(null);

  socket.on('from-server', (msg) => {
    setServerMessage(msg);
  });

  const sendToServer = () => {
    socket.emit('to-server', 'hello');
  }

  
  return (
    <div className="App">
      <p>
        Server: <span>{serverMessage}</span>
      </p>
      <button onClick={sendToServer}>Send</button>
    </div>
  );
}

export default App;