// electron
import {
  ipcRenderer,
} from 'electron';

// npm libs
import jQuery from 'jquery';

ipcRenderer.on('show-data', (event, data) => {
  console.log('show-data', data);
  const textEditorView = jQuery('.main-container');
  textEditorView.find('.textarea').text(data.text);
});
