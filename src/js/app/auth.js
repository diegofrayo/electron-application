// app
import router from './router.js';

export default () => {

  const isAuth = true;

  if (isAuth) {
    router.redirect(router.routes.HOME, isAuth);
  } else {
    router.redirect(router.routes.LOGIN, isAuth);
  }
};
