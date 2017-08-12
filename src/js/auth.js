// app
import router from './router.js';

export default () => {

  const isAuth = true;

  if (isAuth) {
    router.redirect('home', isAuth);
  } else {
    router.redirect('login', isAuth);
  }
};
