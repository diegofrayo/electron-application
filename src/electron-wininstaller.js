var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
  appDirectory: './out/electron-application-win32-ia32',
  outputDirectory: './out/make/electron-application-win32-ia32',
  authors: 'Diego Rayo.',
  description: 'I built this application to learn Electron.',
  exe: 'electron-application.exe',
  version: '0.0.1',
});

resultPromise.then(() => console.log('It worked!'), (e) => console.log(`Error: ${e.message}`));
