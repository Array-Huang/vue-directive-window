const chokidar = require('chokidar');
const path = require('path');
const shell = require('shelljs');

const WATCH_PATH = [
  path.resolve(__filename, '../../dist/VueDirectiveWindow.umd.min.js'),
  path.resolve(__filename, '../../dist/VueDirectiveWindow.umd.min.js.map'),
];
const DIST_DIR = path.resolve(__filename, '../../docs/.vuepress/public');

function changeCb(path) {
  shell.cp('-f', path, DIST_DIR);
  console.log(`${path} changed, file synced`);
}
const watcher = chokidar.watch(WATCH_PATH, {
  persistent: true,
  interval: 500,
});

watcher
  .on('ready', () => {
    console.log('ready for dist change');
  })
  .on('add', changeCb)
  .on('change', changeCb);
