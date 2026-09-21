const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  retryConnect: () => ipcRenderer.send('retry-connect'),
  isDesktopApp: true,
});
