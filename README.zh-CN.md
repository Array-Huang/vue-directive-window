<h1 align="center">vue-directive-window 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/vue-directive-window" target="_blank">
    <img src="https://img.shields.io/npm/v/vue-directive-window.svg?cacheSeconds=2592000" />
  </a>
  <a href="https://www.npmjs.com/package/vue-directive-window" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/npm/dw/vue-directive-window.svg?cacheSeconds=2592000" />
  </a>
  <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/vue-directive-window.svg?cacheSeconds=2592000" />
  <a href="https://array-huang.github.io/vue-directive-window">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/Array-Huang/vue-directive-window/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
  
</p>

> 让你的模态框轻而易举地支持类窗口操作。

- [Github](https://github.com/Array-Huang/vue-directive-window)
- [English README](https://github.com/ElemeFE/element/blob/dev/README.md)
- [English Document](https://array-huang.github.io/vue-directive-window/)

> 注意 请确保你的 Node.js 版本 >= 8。 

## 引入vue-directive-window
`vue-directive-window`支持静态文件及npm两种方式引入。

### 静态文件方式引入
```html
<script src="https://unpkg.com/vue-directive-window/dist/vue-directive-window.umd.min.js"></script>
```

### npm方式引入
```bash
npm install vue-directive-window
```

## 打开本地文档
```bash
npm start
```

## 开始使用
`vue-directive-window`支持Vue自定义指令及一般js类两种方式来使用。

### Vue自定义指令
```vue
<template>
  <div v-window="windowParams">
    <!-- 容器内容 -->
  </div>
</template>
<script>
import VueDirectiveWindow from 'vue-directive-window';
Vue.use(VueDirectiveWindow); // 如果是以静态文件方式引入的话，则不需要 import，直接使用Vue.use(window['vue-directive-window'])
export default {
  data() {
    return {
      windowParams: {
        movable: false,
        resizable: ['left', 'left-top'],
      },
    };
  },
}
</script>
```

### 一般js类
```html
<div class="demo-window" v-window="windowParams">
  <!-- 容器内容 -->
</div>
```

```javascript
import { enhanceWindow } from 'vue-directive-window'; // 如果是以静态文件方式引入的话,则是const enhanceWindow = window['vue-directive-window'].enhanceWindow;

const windowParams = {
  movable: false
  resizable: ['left', 'left-top']
};

enhanceWindow(document.querySelector('.demo-window'), windowParams);
```

## 浏览器兼容性
| IE10 | IE11 | Chrome |
| :---: | :---: | :---: |
| OK | OK | OK |

## 参数

### minWidth
- 类型: `Number`
- 默认值: `100`
- 说明: 窗口可被调整至的最小宽度(px)

### maxWidth
- 类型: `Number`
- 说明: 窗口可被调整至的最大宽度(px)

### minHeight
- 类型: `Number`
- 默认值: `100`
- 说明: 窗口可被调整至的最小高度(px)

### maxHeight
- 类型: `Number`
- 说明: 窗口可被调整至的最大高度(px)

### movable
- 类型: `Boolean`
- 默认值: `true`
- 说明: 是否开启拖拽移动功能

### resizable
- 类型: `Boolean`/`Array`
- 默认值: `true`
- 可选值: `left-top`/`left-bottom`/`left`/`right-top`/`right-bottom`/`right`/`top`/`bottom`
- 说明: 是否开启调整窗口尺寸的功能。参数为`true`表示八个方向均可调整窗口尺寸；但如果传入的是字符串数组，如`['left', 'left-top']`，则只有参数指定的方向可以调整窗口尺寸；各个方向的标识如“可选值”列里所示。

### customMoveHandler
- 类型: `String`/`Element`
- 说明: 自定义的拖拽移动handler。如果传入字符串类型参数，系统则将采用`document.querySelector(customMoveHandler)`来获取handler。

### customMaximizeHandler
- 类型: `String`/`Element`
- 说明: 自定义的最大化handler。如果传入字符串类型参数，系统则将采用`document.querySelector(customMoveHandler)`来获取handler。

### maximizeCallback
- 类型: `Function`
- 说明: 窗口最大化的回调函数。回调参数为：当前是否最大化(Boolean)。

## 喜欢的话，请给个星吧⭐️

## 📝 License

Copyright © 2019 [Array Huang](https://github.com/Array-Huang).<br />
This project is [MIT](https://github.com/Array-Huang/vue-directive-window/blob/master/LICENSE) licensed.
