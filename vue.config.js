module.exports = {
  transpileDependencies: ['strip-ansi'],
  chainWebpack: config => {
    config.output.libraryExport('default');
  },
};
