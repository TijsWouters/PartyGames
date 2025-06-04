import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);


function App() {
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		const newSocket = io('http://localhost:9002', {
			transports: ['websocket'],
			reconnectionAttempts: 5,
			reconnectionDelay: 1000,
		});
		setSocket(newSocket);

		newSocket.on('connect', () => {
			console.log('Connected to WebSocket server');
		});

		return () => {
			newSocket.close();
		};
	}, []);

	return (
		<SocketContext.Provider value={socket}>
			<div>Hello world!</div>
		</SocketContext.Provider>
	);
}

export default App;
export { App, SocketContext };