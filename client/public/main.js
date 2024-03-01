import { app, BrowserWindow } from 'electron';
import path from 'path'; // Import path module
import { initialize } from '@electron/remote/main/index.js';
import { fileURLToPath } from 'url';
import isDev from 'electron-is-dev'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Use path.dirname to get the directory name

initialize();

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1366,
    height: 768,
    icon: __dirname + 'favicon.ico',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    },
  })

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
}


app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
