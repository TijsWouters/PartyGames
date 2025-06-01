import { app, BrowserWindow, shell, ipcMain } from 'electron';


app.on('ready', () => {
	const window = new BrowserWindow()

	window.loadURL('http://localhost:9001')
})