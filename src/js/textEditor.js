// electron
import {
  ipcRenderer,
} from 'electron';

// node libs
import fs from 'fs';

// npm libs
import jQuery from 'jquery';

ipcRenderer.on('show-data', (event, data) => {

  const textEditorView = jQuery('.main-container');

  textEditorView.find('.textarea').text(data.text);

  textEditorView.find('.btn-save').click(() => {

    fs.writeFile(data.filePath, textEditorView.find('.textarea').val(), (err) => {
      if (err) {
        ipcRenderer.send('show-dialog', {
          message: 'The file could not be saved.',
          title: 'Error',
          type: 'error',
        });
      } else {
        ipcRenderer.send('show-dialog', {
          message: 'The file was saved.',
          title: 'Success',
          type: 'info',
        });
      }
    });

  });

});
