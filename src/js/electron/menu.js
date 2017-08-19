// electron
import {
  remote,
} from 'electron';

export default () => {

  const template = [{
    label: 'File',
    submenu: [{
      label: 'Exit',
      role: 'quit',
      // accelerator: 'Alt|CmdOrCtrl+G',
      // click: fn,
    }],
  }];

  const menu = remote.Menu.buildFromTemplate(template);
  remote.Menu.setApplicationMenu(menu);
};
