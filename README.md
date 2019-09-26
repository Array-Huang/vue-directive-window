<h1 align="center">Welcome to vue-directive-window 👋</h1>
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

> Vue.js directive that enhance your Modal Window, support drag, resize and maximize.

- [Github](https://github.com/Array-Huang/vue-directive-window)
- [中文 README](https://github.com/ElemeFE/element/blob/dev/README.zh-CN.md)
- [中文 Document](https://array-huang.github.io/vue-directive-window/zh-CN/)

## Quick Start

> `vue-directive-window` requires your Node.js version >= 8.

## Installation
There are two ways of installation, from CDN and from npm, you can choose which you like.

### CDN
```html
<script src="https://unpkg.com/vue-directive-window/dist/vue-directive-window.umd.min.js"></script>
```

### npm
```bash
npm install vue-directive-window
```

## Hello World
`vue-directive-window` provides two ways to use:
- Vue Custom Directive
- general javascript class library

### Vue Custom Directive
```vue
<template>
  <div v-window="windowParams">
    <!-- container content -->
  </div>
</template>
<script>
import VueDirectiveWindow from 'vue-directive-window';
Vue.use(VueDirectiveWindow); // When you take the CDN way, you don't need to import anything; you may use `Vue.use(window['vue-directive-window'])` instead.
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

### Javascript Class Library
```html
<div class="demo-window" v-window="windowParams">
  <!-- container content -->
</div>
```

```javascript
import { enhanceWindow } from 'vue-directive-window'; // When you take the CDN way, you may use `const enhanceWindow = window['vue-directive-window'].enhanceWindow;` instead.

const windowParams = {
  movable: false
  resizable: ['left', 'left-top']
};

enhanceWindow(document.querySelector('.demo-window'), windowParams);
```

## Browser Compatibility
| IE10 | IE11 | Chrome |
| :---: | :---: | :---: |
| OK | OK | OK |

## Parameters

Parameter | Description | Type | Accepted Values | Default 
---|---|---|---|---
minWidth | window's minimum width(px) | Number | —— | 100
maxWidth | window's maximum width(px) | Number | —— | ——
minHeight | window's minimum height(px) | Number | —— | 100
maxHeight | window's maximum height(px) | Number | —— | ——
movable | is drag feature available | Boolean | —— | true
resizable | is resize feature available; when it is `true`, it means you could resize the window from every eight directions; when it is an Array value which contain String value, like `['left', 'left-top']` you could resize the window only from targeted directions. | Boolean / Array | `left-top`/`left-bottom`/`left`/`right-top`/`right-bottom`/`right`/`top`/`bottom` | true
customMoveHandler | custom drag handler. When it is `null`, you could move the window by dragging every inch of this window. Otherwise, when it is a String value, `vue-directive-window` will use `document.querySelector(customMoveHandler)` to get the handler's Element; in that case, you could move the window only by dragging the handler. | String / Element | —— | ——
customMaximizeHandler | maximize feature's handler. When it is a String value, `vue-directive-window` will use `document.querySelector(customMoveHandler)` to get the handler. | String / Element | —— | ——
maximizeCallback | window maximizeCallback function; there is one parameter, which means if it is current maximize(Boolean) | Function | —— | ——

## Author

👤 **Array Huang**

- Github: [@Array-Huang](https://github.com/Array-Huang)

## Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Array Huang](https://github.com/Array-Huang).<br />
This project is [MIT](https://github.com/Array-Huang/vue-directive-window/blob/master/LICENSE) licensed.
