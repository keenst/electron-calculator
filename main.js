const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 400,
    height: 750,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    },
    resizable: false,
    transparent: true,
    frame: false,
    fullscreenable: false,
    icon: __dirname + '/src/assets/dark-icon.ico'
  })

  win.loadFile('dist/index.html')

  ipcMain.on('close', () => {
    app.quit()
  })

  ipcMain.on('toggleIcon', (event, dark) => {
    console.log(dark)
    if (dark) {
      win.setIcon(__dirname + '/src/assets/dark-icon.ico')
    } else {
      win.setIcon(__dirname + '/src/assets/light-icon.ico')
    }
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
