const path = require('path');
const shell = require('shelljs');
const DIST_FILE_PATH = [
  path.resolve(__filename, '../../dist/vue-directive-window.umd.min.js'),
];
const DIST_DIR = path.resolve(__filename, '../../docs/.vuepress/public');

function afterWebpackBuildCb() {
  for (let path of DIST_FILE_PATH) {
    shell.cp('-f', path, DIST_DIR);
    console.log(`${path} synced`);
  }
}

class AfterBuildCbPlugin {
  apply(compiler) {
    compiler.plugin('done', afterWebpackBuildCb);
  }
}

module.exports = AfterBuildCbPlugin;
