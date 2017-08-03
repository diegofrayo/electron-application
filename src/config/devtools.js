import {
  enableLiveReload,
} from 'electron-compile';
import electronReload from 'electron-reload';
import electronDebug from 'electron-debug';

export default () => {
  // electronReload(__dirname);
  enableLiveReload();
  electronDebug({
    showDevTools: true,
  });
}
