# 使用案例

## 基本使用案例

本案例包含 3 个特性：拖拽移动、调整大小、窗口最大化。
::: demo

```html
<template>
  <div class="container">
    <div class="window" v-window="windowParams">
      <div class="window__header">
        窗口标题
      </div>
      <div class="window__body">
        <p>窗口内容1</p>
        <p>窗口内容2</p>
        <p>窗口内容3</p>
      </div>
    </div>
  </div>
</template>
<script>
  Vue.use(window['vue-directive-window']);
  export default {
    data: () => ({
      windowParams: {
        minWidth: 10,
        maxWidth: 400,
        minHeight: 100,
        maxHeight: 400,
        // customMoveHandler: '.resize-handler',
        // customMaximizeHandler: '.maximize-handler',
      },
    }),
    beforeCreate() {
      // import('@pwd/src/vue-directive-window.js').then(VueDirectiveWindow => {
      //   Vue.use(VueDirectiveWindow);
      // });
      // debugger;
    },
  };
</script>
<style>
  .container {
    padding: 30px;
  }
  .window {
    width: 200px;
    position: fixed;
    top: 290px;
    left: 590px;
  }
</style>
```

:::
