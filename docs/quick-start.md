# Quick Start

::: warning 
Please make sure your Node.js version >= 8.
:::

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

## Ready for More?
At this point, you already install `vue-directive-window` and create a Hello World case. If you are interested in `vue-directive-window` and want to know more about it, you may refer to chapter [examples](/examples.md) and [params](/params.md).
