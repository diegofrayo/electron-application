// npm libs
import jQuery from 'jquery';

// utils
import {
  readFile,
} from './utils.js';

const readTemplate = moduleName => readFile(`./src/templates/${moduleName}.html`);

const redirect = (moduleName, isAuth) => {

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
      }

      if (window.modules.currentModule) window.modules[window.modules.currentModule] = null;
      if (window.modules[moduleName]) window.modules[moduleName]();
      window.modules.layoutIsLoaded = true;
      window.modules.currentModule = moduleName;
    })
    .catch((err) => {
      alert('Error, the view could not be loaded.');
      console.log(err);
    });
};

export default {
  redirect,
};
