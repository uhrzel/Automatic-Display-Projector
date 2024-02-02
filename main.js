const { app, BrowserWindow, screen, ipcMain } = require('electron');

let youtubeWindow;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  youtubeWindow = new BrowserWindow({
    width: 800,
    height: 600,
    x: width,
    y: 0,
    show: false,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  youtubeWindow.loadURL('https://www.youtube.com/embed/UStWXaydAg4?autoplay=1');

  youtubeWindow.once('ready-to-show', () => {
    youtubeWindow.show();
  });
}

app.whenReady().then(createWindow);

ipcMain.on('get-app-status', (event) => {
  console.log('Received get-app-status request');
  if (youtubeWindow && !youtubeWindow.isDestroyed()) {
    event.reply('app-status', 'The Electron app is running.');
  } else {
    event.reply('app-status', 'Electron is not running.');
  }
});
