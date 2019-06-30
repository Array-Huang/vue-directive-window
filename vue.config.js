module.exports = {
  chainWebpack: config => {
    config.output.libraryExport('default');
  },
};
