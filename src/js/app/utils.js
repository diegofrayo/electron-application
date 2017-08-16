// node libs
import fs from 'fs';

// electron
import {
  ipcRenderer,
} from 'electron';

export function readFile(pathname) {
  return new Promise((resolve, reject) => {
    fs.readFile(pathname, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export function showDialog(title, type, message) {
  ipcRenderer.send('show-dialog', {
    message,
    title,
    type,
  });
}
