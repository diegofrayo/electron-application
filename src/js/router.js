// electron
import {
  ipcRenderer,
} from 'electron';

// npm libs
import jQuery from 'jquery';

// app
import {
  readFile,
} from './utils.js';
import layout from './layout.js';

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

      // if (window.modules.currentModule) window.modules[window.modules.currentModule] = null;
      if (window.modules[moduleName]) window.modules[moduleName]();

      window.modules.layoutIsLoaded = true;
      window.modules.currentModule = moduleName;
    })
    .catch((err) => {
      ipcRenderer.send('show-dialog', {
        message: 'The view could not be loaded.',
        title: 'Error',
        type: 'error',
      });
      console.error(err);
    });
};

export default {
  redirect,
};
