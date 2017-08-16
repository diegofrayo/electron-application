// npm libs
import firebase from 'firebase';

// app
import {
  readFile,
  showDialog,
} from './utils.js';

const firebaseConnection = readFile('./../../config/firebase.json')
  .then((data) => {

    try {

      const firebaseConfig = JSON.parse(data);

      if (firebase.apps === undefined || (firebase.apps && firebase.apps.length === 0)) {
        firebase.initializeApp({
          databaseURL: firebaseConfig.firebase_database_url,
          authDomain: firebaseConfig.firebase_auth_domain,
          apiKey: firebaseConfig.firebase_api_key,
        });
      }

      return firebase.ref().child('mini-project-manager/projects/');

    } catch (e) {
      throw new Error('This firebase file could not readed correctly.');
    }

  })
  .catch((error) => {
    showDialog('Error', 'error', error.message);
    return null;
  });

const createProject = (projectName) => {

  const ref = firebaseConnection.child(projectName);

  ref.once('value', (snapshot) => {

    if (snapshot.exists) {
      showDialog('Error', 'error', 'The project already exists.');
    } else {
      ref.push({
          title: projectName,
          bookmarks: {},
        })
        .then(() => {
          showDialog('Success', 'info', 'The project was created.');
        })
        .catch(() => {
          showDialog('Error', 'error', 'The project could not be created.');
        });
    }

  });

};

firebaseConnection.on('child_added', (snapshot) => {
  // TODO: Update store and dispatch changes for all views.
});

export default {
  connection: firebaseConnection,
  createProject,
};
