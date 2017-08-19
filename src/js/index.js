import auth from './js/app/auth.js';
import home from './js/views/home.js';
import login from './js/views/login.js';
import project from './js/views/project.js';

import menu from './js/electron/menu.js';

window.addEventListener('load', () => {

  menu();

  window.modules = {
    currentModule: '',
    layoutIsLoaded: false,
    home: {
      instance: null,
      createInstance: function createInstance() {
        this.instance = home();
      },
      deleteInstance: function deleteInstance() {
        this.instance = this.instance.destroy();
      },
    },
    login: {
      instance: null,
      createInstance: function createInstance() {
        this.instance = login();
      },
      deleteInstance: function deleteInstance() {
        this.instance = this.instance.destroy();
      },
    },
    project: {
      instance: null,
      createInstance: function createInstance() {
        this.instance = project();
      },
      deleteInstance: function deleteInstance() {
        this.instance = this.instance.destroy();
      },
    },
  };

  auth();
});
