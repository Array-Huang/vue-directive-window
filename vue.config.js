const webpack = require('webpack');
const AfterBuildCbPlugin = require('./script/dist-copy');

const banner = `
vue-directive-window
(c) 2019 Array-Huang
Released under the MIT License.
Github: https://github.com/Array-Huang/vue-directive-window
hash: [hash]
`;

module.exports = {
  chainWebpack: config => {
    config.output.libraryExport('default');
    config.plugin('banner').use(webpack.BannerPlugin, [
      {
        banner,
        entryOnly: true,
      },
    ]);
    config.plugin('after-build').use(AfterBuildCbPlugin);
  },
};
