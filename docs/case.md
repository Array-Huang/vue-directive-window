# 使用案例

## Vue自定义指令v-window的基本使用案例

本案例包含 3 个特性：拖拽移动、调整大小、窗口最大化。
::: demo

```html
<template>
  <div class="container">
    <div class="window" v-show="showVueDirectiveNormalCase" v-window="windowParams">
      <div class="window__header">
        VueDirectiveWindow一般窗口
      </div>
      <div class="window__body">
        <p>窗口内容1</p>
        <p>窗口内容2</p>
        <p>窗口内容3</p>
      </div>
    </div>

    <button type="button" @click="showVueDirectiveNormalCase = true" v-if="!showVueDirectiveNormalCase">显示窗口</button>
    <button type="button" @click="showVueDirectiveNormalCase = false" v-else>隐藏窗口</button>
  </div>
</template>
<script>
  Vue.use(window.VueDirectiveWindow);
  export default {
    data: () => ({
      windowParams: {
        minWidth: 10,
        maxWidth: 400,
        minHeight: 100,
        maxHeight: 400,
      },
      showVueDirectiveNormalCase: false,
    }),
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

## 函数方式的基本使用案例
::: demo
```html
<template>
  <div class="container">
    <div class="window window--by-function" v-show="showFunctionCase">
      <div class="window__header">
        函数方式生成的窗口
      </div>
      <div class="window__body">
        <p>窗口内容1</p>
        <p>窗口内容2</p>
        <p>窗口内容3</p>
      </div>
    </div>

    <button type="button" @click="show" v-if="!showFunctionCase">显示窗口</button>
    <button type="button" @click="hide" v-else>隐藏窗口</button>
  </div>
</template>
<script>
  function enhanceWindow() {
      const windowElement = document.querySelector('.window--by-function');
      const windowParams = {
        minWidth: 10,
        maxWidth: 400,
        minHeight: 100,
        maxHeight: 400,
      };
      window.VueDirectiveWindow.enhance(windowElement, windowParams);
  }
  export default {
    data: () => ({
      showFunctionCase: false,
      ifInited: false,
    }),
    methods: {
      show() {
        this.showFunctionCase = true;
        if (!this.ifInited) {
          enhanceWindow();
        }
      },
      hide() {
        this.showFunctionCase = false;
      }
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