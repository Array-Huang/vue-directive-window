module.exports = {
  presets: [
    [
      '@vue/app',
      {
        // polyfills: ['es6.promise', 'es6.symbol', 'es7.object.entries'],
        // useBuiltIns: 'usage',
        targets: {
          browsers: ['> 1%', 'not ie < 9', 'last 2 versions'],
        },
      },
    ],
  ],
};
