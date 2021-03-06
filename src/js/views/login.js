// npm libs
import jQuery from 'jquery';

// app
import router from './../app/router.js';

export default function login() {

  let loginView = jQuery('.login-view');

  loginView.find('.form').submit((event) => {
    event.preventDefault();
    router.redirect(router.routes.HOME);
  });

  return {
    destroy: () => {
      loginView = null;
    },
  };
}
