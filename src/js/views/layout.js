// npm libs
import jQuery from 'jquery';

// app
import router from './../app/router.js';

export default function layout() {

  const layoutView = jQuery('.layout-view');

  layoutView.find('.home-icon').click((event) => {
    event.preventDefault();
    router.redirect(router.routes.HOME);
  });

}
