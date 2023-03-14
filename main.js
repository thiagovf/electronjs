/**
 * https://www.electronjs.org/docs/latest/api/app
 * Useful documentation.
 */ 



// Modules
const {app, BrowserWindow} = require('electron')

const bcrypt = require('bcrypt')
bcrypt.hash('myPlaintextPassword', 10, function(err, hash) {
  console.log(hash)
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, secondaryWindow

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    minHeight: 150, 
    minWidth: 300,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,
      show: false
    }
  })

  secondaryWindow = new BrowserWindow({
    width: 600, height: 300,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      parent: mainWindow,
      modal: true
    }
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')
  secondaryWindow.loadFile('secundary.html')

  // Showing window gracefully 
  // https://www.electronjs.org/docs/latest/api/browser-window#showing-the-window-gracefully
  //mainWindow.on('ready-to-show')
  mainWindow.once('ready-to-show', mainWindow.show)

  // Open DevTools - Remove for PRODUCTION!
  //mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
  secondaryWindow.on('closed',  () => {
    secondaryWindow = null
  })
}

// Electron `app` is ready
app.on('ready', () => {
  console.log('App Ready')

  console.log(app.getPath('desktop'))
  console.log(app.getPath('music'))
  console.log(app.getPath('temp'))
  console.log(app.getPath('userData'))
  createWindow()
})

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})

app.on('before-quit', e => {
 // console.log('App is preventing quit!')
 // e.preventDefault()
 // console.log('Save DB something for example!')
})

app.on('browser-window-blur', () => {
  console.log('App unfocused')
})

app.on('browser-window-focus', () => {
  console.log('App focused')
})