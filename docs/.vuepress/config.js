module.exports = {
  base: '/vue-directive-window/',
  head: [
    ['script', { src: './vendor/vue.min.js' }],
    ['script', { src: './vue-directive-window.umd.min.js' }],
  ],
  themeConfig: {
    sidebar: ['/', '/install', '/examples', 'params'],
    sidebarDepth: 2,
    lastUpdated: 'Last Updated',
  },
  chainWebpack(config, isServer) {
    config.resolve.alias.set('@pwd', process.cwd()); // process.cwd() 是当前执行node命令时候的文件夹地址 ——工作目录，保证了文件在不同的目录下执行时，路径始终不变
  },
  plugins: ['demo-block'],
  // locales: {
  //   // 键名是该语言所属的子路径
  //   // 作为特例，默认语言可以使用 '/' 作为其路径。
  //   // '/': {
  //   //   lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
  //   //   title: 'VuePress',
  //   //   description: 'Vue-powered Static Site Generator',
  //   // },
  //   '/': {
  //     lang: 'zh-CN',
  //     title: 'VuePress',
  //     description: 'Vue 驱动的静态网站生成器',
  //   },
  // },
};
