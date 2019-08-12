# 快速上手

::: warning 
注意 请确保你的 Node.js 版本 >= 8。 
:::

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

## 结语
到此,您已引入`vue-directive-window`并可以简单使用了，想要了解更多请参考[使用案例](/examples.md)和[参数](/params.md)章节。
