module.exports = {
  base: '/vue-directive-window/',
  head: [
    ['script', { src: '/vendor/vue.min.js' }],
    [
      'script',
      { src: '/vue-directive-window.umd.min.js' },
    ],
  ],
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
      title: 'vue-directive-window',
      description:
        'Vue.js directive that enhance your Modal Window, support drag, resize and maximize.',
    },
    '/zh-CN/': {
      lang: 'zh-CN',
      title: 'vue-directive-window',
      description: '让你的模态框轻而易举地支持类窗口操作',
    },
  },
  themeConfig: {
    /* 导航栏链接 */
    nav: [
      {
        text: 'Github',
        link: 'https://github.com/Array-Huang/vue-directive-window',
      },
      {
        text: 'npm',
        link: 'https://www.npmjs.com/package/vue-directive-window',
      },
    ],
    /* 侧边栏 */
    sidebarDepth: 2,
    /* 最后更新时间 */
    lastUpdated: 'Last Updated',
    /* 活动的标题链接 */
    activeHeaderLinks: true, // 默认值：true
    /* 多语言 */
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        sidebar: ['quick-start', 'browser-compatibility', 'examples', 'params'],
      },
      '/zh-CN/': {
        selectText: 'Languages',
        label: '简体中文',
        /* 侧边栏 */
        sidebar: {
          '/zh-CN/': [
            'quick-start',
            'browser-compatibility',
            'examples',
            'params',
          ],
        },
      },
    },
  },
  chainWebpack(config, isServer) {
    config.resolve.alias.set('@pwd', process.cwd()); // process.cwd() 是当前执行node命令时候的文件夹地址 ——工作目录，保证了文件在不同的目录下执行时，路径始终不变
  },
  plugins: ['demo-block'],
};
