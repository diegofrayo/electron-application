// electron
import {
  ipcRenderer,
} from 'electron';

// node libs
import fs from 'fs';

// npm libs
import jQuery from 'jquery';

// app
import {
  showDialog,
} from './../js/app/utils.js';

ipcRenderer.on('show-data', (event, data) => {

  const textEditorView = jQuery('.main-container');

  textEditorView.find('.textarea').text(data.text);

  textEditorView.find('.btn-save').click(() => {

    fs.writeFile(data.filePath, textEditorView.find('.textarea').val(), (err) => {
      if (err) {
        showDialog('Error', 'error', 'The file could not be saved.');
      } else {
        showDialog('Success', 'info', 'The file has been saved.');
      }
    });

  });

});
