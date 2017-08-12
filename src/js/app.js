import login from './js/login.js';
import auth from './js/auth.js';
import home from './js/home.js';
import projectView from './js/projectView.js';

window.modules = {
  currentModule: '',
  layoutIsLoaded: false,
  home,
  login,
  'project-view': projectView,
};

auth();
