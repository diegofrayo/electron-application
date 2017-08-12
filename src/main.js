// electron
import {
  app,
  BrowserWindow,
} from 'electron';

// dev configs
import devtools from './config/devtools.js';

// electron events
import ipcMainEvents from './js/ipcMainEvents.js';
import errorHandler from './js/errorHandler.js';

if (process.env.NODE_ENV === 'development') {
  devtools();
}

global.win; // eslint-disable-line

app.on('before-quit', () => {
  console.log('before-quit');
});

app.on('ready', () => {

  global.win = new BrowserWindow({
    center: true,
    height: 500,
    // resizable: false,
    show: false,
    title: 'Hello HeyDev!',
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

  ipcMainEvents(global.win);
  errorHandler(global.win);
});
