// eslint-disable-next-line no-undef
const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (channel, message) => ipcRenderer.invoke(channel, message),
  onMessage: (channel, callback) => ipcRenderer.on(channel, (_event, value) => callback(value))
});