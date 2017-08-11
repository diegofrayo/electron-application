// npm libs
import jQuery from 'jquery';

// app
import {
  sendIpcRendererEvent,
} from './ipcRendererEvents.js';

export default function home() {

  const homeView = jQuery('.home-view');

  homeView.find('.btn-open-file').click(() => {
    sendIpcRendererEvent();
  });

}
