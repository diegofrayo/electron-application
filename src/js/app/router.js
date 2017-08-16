// electron
import {
  ipcRenderer,
} from 'electron';

// npm libs
import jQuery from 'jquery';

// app
import {
  readFile,
  showDialog,
} from './utils.js';
import layout from './../views/layout.js';

const readTemplate = moduleName => readFile(`./src/templates/${moduleName}.html`);

const redirect = (moduleName, isAuth = true) => {

  if (window.modules.currentModule === moduleName) return;

  readTemplate(moduleName)
    .then((template) => {

      if (isAuth) {
        if (!window.modules.layoutIsLoaded) {
          return readTemplate('layout');
        }
        jQuery('.layout-view').find('.content').html(template);
        window.modules.layoutIsLoaded = true;
      } else {
        jQuery('.main-container').html(template);
        window.modules.layoutIsLoaded = false;
      }

      return Promise.resolve();
    })
    .then((template) => {

      if (template) {
        jQuery('.main-container').html(template);
        return readTemplate(moduleName);
      }

      return Promise.resolve();
    })
    .then((template) => {

      if (template) {
        jQuery('.layout-view').find('.content').html(template);
        layout();
      }

      if (window.modules.currentModule) window.modules[window.modules.currentModule].deleteInstance();
      if (window.modules[moduleName]) window.modules[moduleName].createInstance();

      window.modules.layoutIsLoaded = true;
      window.modules.currentModule = moduleName;
    })
    .catch((err) => {
      showDialog('Error', 'error', 'The view could not be loaded.');
      console.error(err);
    });
};

export default {
  redirect,
  routes: {
    HOME: 'home',
    LOGIN: 'login',
    PROJECT: 'project',
  },
};
