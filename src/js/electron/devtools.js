// electron
import {
  enableLiveReload,
} from 'electron-compile';
import electronDebug from 'electron-debug';
// import electronReload from 'electron-reload';

export default () => {
  // electronReload(__dirname);
  enableLiveReload();
  electronDebug({
    showDevTools: true,
  });
};
