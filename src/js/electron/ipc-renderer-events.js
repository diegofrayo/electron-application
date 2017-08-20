// electron
import {
  ipcRenderer,
  remote,
} from 'electron';
import electronSettings from 'electron-settings';

// node libs
import os from 'os';
import path from 'path';

// app
import {
  readFile,
} from './../app/utils.js';

function setIpcRendererEvent() {

  ipcRenderer.on('text-file-selected', (event, filePath) => {
    readFile(filePath)
      .then((text) => {

        const BrowserWindow = remote.BrowserWindow;
        const mainWindow = remote.getGlobal('win');
        const textEditorWindow = new BrowserWindow({
          center: true,
          height: 400,
          icon: path.join(__dirname, '../../', 'assets', 'icons', 'tray.png'),
          show: false,
          title: 'Text Editor',
          width: 400,
        });

        if (os.platform() !== 'win32') {
          textEditorWindow.setParentWindow(mainWindow);
        }

        textEditorWindow.once('ready-to-show', () => {
          textEditorWindow.show();
          textEditorWindow.focus();
        });

        textEditorWindow.webContents.on('did-finish-load', () => {
          textEditorWindow.webContents.send('show-data', {
            filePath,
            text,
          });
        });

        electronSettings.set('file-path', filePath);

        textEditorWindow.loadURL(`file://${path.join(__dirname, '../..')}/templates/text-editor.html`);
      })
      .catch(() => {});

  });
}

setIpcRendererEvent();

export default {
  openFile: filePath => ipcRenderer.send('open-text-file', filePath),
};
