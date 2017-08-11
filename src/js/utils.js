// node libs
import fs from 'fs';

export function readFile(pathname) {
  return new Promise((resolve, reject) => {
    fs.readFile(pathname, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
