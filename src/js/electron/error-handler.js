// electron
import {
  app,
  dialog,
} from 'electron';

function relaunchApp(win) {
  dialog.showMessageBox(win, {
    type: 'error',
    title: 'Error',
    message: 'An unexpected error has occurred, the app will restart.',
  }, () => {
    app.relaunch();
    app.exit(0);
  });
}

function setupErrors(win) {

  win.webContents.on('crashed', () => {
    relaunchApp(win);
  });

  win.on('unresponsive', () => {
    dialog.showMessageBox(win, {
      type: 'warning',
      title: 'Warning',
      message: 'A process is too slow, you can wait or restart the application manually.',
    });
  });

  process.on('uncaughtException', () => {
    relaunchApp(win);
  });
}

export default setupErrors;
