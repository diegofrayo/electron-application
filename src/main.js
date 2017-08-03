// npm libs
import {
  app,
  BrowserWindow,
} from 'electron';

// dev configs
import devtools from './config/devtools.js';

// js app
import initApp from './js/app.js';

if (process.env.NODE_ENV === 'development') {
  devtools();
}

app.on('before-quit', () => {
  console.log('before-quit');
});

app.on('ready', () => {

  let win = new BrowserWindow({
    center: true,
    height: 500,
    // resizable: false,
    show: false,
    title: 'Hello HeyDev!',
    width: 500,
  });

  win.loadURL(`file://${__dirname}/templates/login.html`);

  win.on('ready-to-show', () => {
    win.show();
  });

  win.on('move', () => {
    console.log(`window's position: ${win.getPosition()}`);
  });

  win.on('closed', () => {
    console.log('closed');
    win = null;
    app.quit();
  });

  // if (process.env.NODE_ENV === 'development') {
  //   win.toggleDevTools();
  // }

});
