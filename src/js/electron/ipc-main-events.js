// electron
import {
  ipcMain,
  dialog,
} from 'electron';

export default (win) => {

  ipcMain.on('open-text-file', (event, path) => {
    if (path) {
      event.sender.send('text-file-selected', path);
    } else {
      dialog.showOpenDialog(win, {
        title: 'Select a file',
        buttonLabel: 'Select file',
        properties: ['openFile'],
      }, (dir) => {
        if (dir) {
          event.sender.send('text-file-selected', dir[0]);
        }
      });
    }
  });

  // ipcMain.on('open-save-dialog', (event, ext) => {
  //   dialog.showSaveDialog(win, {
  //     title: 'Guardar imagen modificada',
  //     buttonLabel: 'Guardar imagen',
  //     filters: [{
  //       name: 'Images',
  //       extensions: [ext.substr(1)],
  //     }],
  //   }, (file) => {
  //     if (file) {
  //       event.sender.send('save-image', file);
  //     }
  //   });
  // });

  ipcMain.on('show-dialog', (event, info) => {
    dialog.showMessageBox(win, {
      type: info.type,
      title: info.title,
      message: info.message,
    });
  });

};
