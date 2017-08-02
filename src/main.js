const {
  app,
  BrowserWindow,
} = require('electron');

app.on('before-quit', () => {
  console.log('before-quit');
});

app.on('ready', () => {

  let win = new BrowserWindow({
    center: true,
    height: 500,
    show: false,
    title: 'Hello HeyDev!',
    width: 500,
  });

  win.loadURL('https://heydev.now.sh/');

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

});
