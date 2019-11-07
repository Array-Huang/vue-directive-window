const webpack = require('webpack');
const AfterBuildCbPlugin = require('./script/dist-copy');
const pkg = require('./package.json');

const banner = `
${pkg.name}
${pkg.description}\n
@version v${pkg.version}
@homepage ${pkg.homepage}
@repository ${pkg.repository.url}\n
(c) 2019 Array-Huang
Released under the MIT License.
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
