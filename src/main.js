// electron
import {
  app,
  BrowserWindow,
  Tray,
  globalShortcut,
} from 'electron';

// node libs
import os from 'os';
import path from 'path';

// dev configs
import devtools from './js/electron/devtools.js';

// electron events
import ipcMainEvents from './js/electron/ipc-main-events.js';
import errorHandler from './js/electron/error-handler.js';

if (process.env.NODE_ENV === 'development') {
  devtools();
}

global.win = null;

app.on('before-quit', () => {
  console.log('before-quit');
  globalShortcut.unregisterAll();
});

app.on('ready', () => {

  global.win = new BrowserWindow({
    center: true,
    height: 500,
    icon: path.join(__dirname, 'assets', 'icons', 'tray.png'), // for linux
    resizable: false,
    show: false,
    title: 'Hello Diego!',
    width: 500,
  });

  global.win.loadURL(`file://${__dirname}/index.html`);

  global.win.on('ready-to-show', () => {
    global.win.show();
  });

  global.win.on('move', () => {
    // console.log(`global.window's position: ${global.win.getPosition()}`);
  });

  global.win.on('closed', () => {
    console.log('closed');
    global.win = null;
    app.quit();
  });

  // if (process.env.NODE_ENV === 'development') {
  //   global.win.toggleDevTools();
  // }

  let icon;
  if (os.platform() === 'win32') {
    icon = path.join(__dirname, 'assets', 'icons', 'tray.ico');
  } else {
    icon = path.join(__dirname, 'assets', 'icons', 'tray.png');
  }

  global.tray = new Tray(icon);
  global.tray.setToolTip('Hey Dev!');
  global.tray.on('click', () => {
    if (global.win.isVisible()) {
      global.win.hide();
    } else {
      global.win.show();
    }
  });

  ipcMainEvents(global.win);
  errorHandler(global.win);

  globalShortcut.register('Ctrl+R', () => {
    app.relaunch();
    app.exit(0);
  });
});
