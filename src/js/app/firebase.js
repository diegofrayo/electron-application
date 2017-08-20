// npm libs
import firebase from 'firebase';

// app
import {
  showDialog,
} from './utils.js';
import store from './store.js';

const firebaseConfig = require('./../../config/firebase.json');

if (firebase.apps === undefined || (firebase.apps && firebase.apps.length === 0)) {
  firebase.initializeApp({
    databaseURL: firebaseConfig.firebase_database_url,
    authDomain: firebaseConfig.firebase_auth_domain,
    apiKey: firebaseConfig.firebase_api_key,
  });
}

const firebaseConnection = firebase.database().ref().child('mini-project-manager/projects/');

const createProject = (projectName) => {

  if (!firebaseConnection) return;

  const projects = store.getStore().projects;
  const exists = Object.keys(projects)
    .filter(key => projects[key].name === projectName)[0];

  if (exists) {
    showDialog('Error', 'warning', 'The project already exists.');
  } else {
    firebaseConnection
      .push({
        name: projectName,
        bookmarks: {},
      })
      .then(() => {
        showDialog('Success', 'info', 'The project has been created.');
      })
      .catch(() => {
        showDialog('Error', 'warning', 'The project could not be created.');
      });
  }
};

const deleteBookmark = (projectId, bookmarkId = 'undefined') => {

  if (!firebaseConnection) return;

  const ref = firebaseConnection.child(projectId).child('bookmarks').child(bookmarkId);

  ref
    .remove()
    .then(() => {
      showDialog('Success', 'info', 'The bookmark has been deleted.');
    })
    .catch(() => {
      showDialog('Error', 'warning', 'The bookmark could not be deleted.');
    });
};

const createBookmark = ({
  projectId,
  boomarkCategory,
  boomarkName,
  boomarkUrl,
}) => {

  if (!firebaseConnection) return;

  const ref = firebaseConnection.child(projectId).child('bookmarks');

  ref
    .push({
      name: boomarkName,
      category: boomarkCategory,
      url: boomarkUrl,
    })
    .then(() => {
      showDialog('Success', 'info', 'The bookmark has been created.');
    })
    .catch(() => {
      showDialog('Error', 'warning', 'The bookmark could not be created.');
    });
};

const updateProjectCallback = (snapshot) => {

  const state = store.getStore();

  store.update({
    projects: Object.assign({}, state.projects, {
      [snapshot.key]: snapshot.val(),
    }),
  });

  store.dispatch('home');
  store.dispatch('project');
};

firebaseConnection.on('child_added', updateProjectCallback);
firebaseConnection.on('child_changed', updateProjectCallback);
firebaseConnection.on('child_removed', updateProjectCallback);

export default {
  createProject,
  createBookmark,
  deleteBookmark,
};
