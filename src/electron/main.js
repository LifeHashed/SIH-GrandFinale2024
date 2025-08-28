import { app, BrowserWindow } from 'electron';
import path from 'path'

app.on('ready', () => {
    const mainWindow = new BrowserWindow({ webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
    },});
    
    mainWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
})

