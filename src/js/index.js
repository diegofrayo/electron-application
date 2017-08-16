import auth from './js/app/auth.js';
import home from './js/views/home.js';
import login from './js/views/login.js';
import project from './js/views/project.js';

window.addEventListener('load', () => {

  window.modules = {
    currentModule: '',
    layoutIsLoaded: false,
    home: {
      instance: null,
      createInstance: function createInstance() {
        this.instance = home();
      },
      deleteInstance: function deleteInstance() {
        this.instance = null;
      },
    },
    login: {
      instance: null,
      createInstance: function createInstance() {
        this.instance = login();
      },
      deleteInstance: function deleteInstance() {
        this.instance = null;
      },
    },
    project: {
      instance: null,
      createInstance: function createInstance() {
        this.instance = project();
      },
      deleteInstance: function deleteInstance() {
        this.instance = null;
      },
    },
  };

  auth();
});
