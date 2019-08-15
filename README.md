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

> Please make sure your Node.js version >= 8.

## Installation
`vue-directive-window` provides two ways of installation, from CDN and from npm.

### CDN
```html
<script src="https://unpkg.com/vue-directive-window/dist/vue-directive-window.umd.min.js"></script>
```

### npm
```bash
npm install vue-directive-window
```

## Hello World
`vue-directive-window` provides two ways to use, Vue Custom Directive, and general javascript class library.

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

## Ready for More?
At this point, you already install `vue-directive-window` and create a Hello World case. If you are interested in `vue-directive-window` and want to know more about it, you may refer to chapter [examples](/examples.md) and [params](/params.md).

## Author

👤 **Array Huang**

- Github: [@Array-Huang](https://github.com/Array-Huang)

## Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Array Huang](https://github.com/Array-Huang).<br />
This project is [MIT](https://github.com/Array-Huang/vue-directive-window/blob/master/LICENSE) licensed.
