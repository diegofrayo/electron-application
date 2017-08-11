// electron
import {
  ipcRenderer,
  remote,
} from 'electron';

// npm libs
import os from 'os';
import path from 'path';

// utils
import {
  readFile,
} from './utils.js';

function setIpcRendererEvent() {

  ipcRenderer.on('text-file-selected', (event, filePath) => {

    console.log(`ipcRenderer received: ${filePath}`);

    readFile(filePath[0])
      .then((text) => {

        const BrowserWindow = remote.BrowserWindow;
        const mainWindow = remote.getGlobal('win');
        const textEditorWindow = new BrowserWindow({
          center: true,
          height: 500,
          show: false,
          title: 'Text editor',
          width: 500,
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

        textEditorWindow.loadURL(`file://${path.join(__dirname, '..')}/templates/text-editor.html`);
      })
      .catch(() => {});

  });
}

setIpcRendererEvent();

export function sendIpcRendererEvent() {
  ipcRenderer.send('open-text-file');
}
