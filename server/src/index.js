import { fileURLToPath } from 'url';
import path from 'path';

import { app, BrowserWindow, ipcMain } from 'electron';
import { Server } from 'socket.io';



const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

function onMessage(channel, callback) {
	ipcMain.handle(channel, callback);
}

function sendMessage(channel, data) {
	window.webContents.send(channel, data);
}

export { onMessage, sendMessage };

let window;

app.on('ready', () => {
	window = new BrowserWindow({
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		}
	});

	window.loadURL('http://localhost:9001');
});

const io = new Server(9002, {
	cors: {
		origin: 'http://localhost:9001',
		methods: ['GET', 'POST'],
		credentials: true,
	},
});

io.on('connection', (socket) => {
	console.log('New client connected');

	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});
});
