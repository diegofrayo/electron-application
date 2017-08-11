// npm libs
import jQuery from 'jquery';

// app
import router from './router.js';

export default function login() {

  const loginView = jQuery('.login-view');

  loginView.find('.form').submit((event) => {
    event.preventDefault();
    router.redirect('home');
  });

}
