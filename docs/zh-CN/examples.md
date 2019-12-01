# 使用案例

## Vue 自定义指令 v-window 的基本使用案例

本案例包含 3 个特性：拖拽移动、调整大小、窗口最大化。

注意：
- `<iframe />`会把移动事件（`touchmove`和`mousemove`）吞掉，造成鼠标进入`<iframe />`区域后便不再响应拖拽移动或是调整大小的功能；`vue-directive-window`已经对这种场景做了相应的处理，现在你可以愉快的在窗口内使用`<iframe />`了。
::: demo

```html
<template>
  <div class="container">
    <div class="window window1" v-show="ifShowWindow" v-window="windowParams">
      <div class="window__header">
        一般窗口
        <button class="maximize-btn" type="button">
          <template v-if="!isMaximize"
            >点这放大</template
          >
          <template v-else
            >点这缩小</template
          >
        </button>
      </div>
      <div class="window__body">
        <iframe height="100%" width="100%" frameborder="0" src="https://array-huang.github.io/vue-directive-window/">
      </div>
    </div>

    <button type="button" @click="ifShowWindow = true" v-if="!ifShowWindow">
      显示窗口
    </button>
    <button type="button" @click="ifShowWindow = false" v-else>隐藏窗口</button>
  </div>
</template>
<script>
  Vue.use(window['vue-directive-window']);

  function maximizeCb(isMaximize) {
    this.isMaximize = isMaximize;
  }

  export default {
    data() {
      return {
        windowParams: {
          minWidth: 10,
          maxWidth: 800,
          minHeight: 100,
          maxHeight: 800,
          customMaximizeHandler: '.maximize-btn',
          maximizeCallback: maximizeCb.bind(this),
        },
        ifShowWindow: false,
        isMaximize: false,
      };
    },
  };
</script>
<style>
  .container {
    padding: 30px;
  }
  .window1 {
    width: 400px;
    position: fixed;
    top: 60px;
    left: 0;
  }
</style>
```

:::

## 函数方式的基本使用案例

::: demo

```html
<template>
  <div class="container">
    <div class="window window2 window--by-function" v-show="ifShowWindow">
      <div class="window__header">
        函数方式生成的窗口
      </div>
      <div class="window__body">
        <p>窗口内容1</p>
        <p>窗口内容2</p>
        <p>窗口内容3</p>
      </div>
    </div>

    <button type="button" @click="show" v-if="!ifShowWindow">显示窗口</button>
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
    window['vue-directive-window'].enhanceWindow(windowElement, windowParams);
  }
  export default {
    data() {
      return {
        ifShowWindow: false,
        ifInited: false,
      };
    },
    methods: {
      show() {
        this.ifShowWindow = true;
        if (!this.ifInited) {
          enhanceWindow();
        }
      },
      hide() {
        this.ifShowWindow = false;
      },
    },
  };
</script>
<style>
  .container {
    padding: 30px;
  }
  .window2 {
    width: 200px;
    position: fixed;
    top: 60px;
    left: 200px;
  }
</style>
```

:::

## 停用拖拽移动特性，启用部分方向的调整大小

::: demo

```html
<template>
  <div class="container">
    <div class="window window3" v-show="ifShowWindow" v-window="windowParams">
      <div class="window__header">
        部分功能可用的窗口
      </div>
      <div class="window__body">
        <p>窗口内容1</p>
        <p>窗口内容2</p>
        <p>窗口内容3</p>
      </div>
    </div>

    <button type="button" @click="ifShowWindow = true" v-if="!ifShowWindow">
      显示窗口
    </button>
    <button type="button" @click="ifShowWindow = false" v-else>隐藏窗口</button>
  </div>
</template>
<script>
  Vue.use(window['vue-directive-window']);
  export default {
    data() {
      return {
        windowParams: {
          movable: false,
          resizable: ['left', 'left-top'],
        },
        ifShowWindow: false,
      };
    },
  };
</script>
<style>
  .container {
    padding: 30px;
  }
  .window3 {
    width: 200px;
    position: fixed;
    top: 60px;
    left: 400px;
  }
</style>
```

:::

## 指定拖拽移动的 handler

这个例子中，只有拖拽`.window_header`，即窗口的头部，才能拖动窗口

::: demo

```html
<template>
  <div class="container">
    <div class="window window4" v-show="ifShowWindow" v-window="windowParams">
      <div class="window__header">
        指定拖拽移动的handler的窗口
      </div>
      <div class="window__body">
        <p>窗口内容1</p>
        <p>窗口内容2</p>
        <p>窗口内容3</p>
      </div>
    </div>

    <button type="button" @click="ifShowWindow = true" v-if="!ifShowWindow">
      显示窗口
    </button>
    <button type="button" @click="ifShowWindow = false" v-else>隐藏窗口</button>
  </div>
</template>
<script>
  Vue.use(window['vue-directive-window']);
  export default {
    data() {
      return {
        windowParams: {
          customMoveHandler: '.window__header',
        },
        ifShowWindow: false,
      };
    },
  };
</script>
<style>
  .container {
    padding: 30px;
  }
  .window4 {
    width: 200px;
    position: fixed;
    top: 60px;
    left: 600px;
  }
</style>
```

:::

## 只允许垂直方向的拖拽移动
把`movable`参数设为`'vertical'`即可限制用户只能在垂直方向上拖拽移动窗口，而设为`'horizontal'`则表示限制只能在水平方向上拖拽移动窗口。

::: demo

```html
<template>
  <div class="container">
    <div class="window window5" v-show="ifShowWindow" v-window="windowParams">
      <div class="window__header">
        只允许垂直方向的拖拽移动
      </div>
      <div class="window__body">
        <iframe height="100%" width="100%" frameborder="0" src="https://array-huang.github.io/vue-directive-window/">
      </div>
    </div>

    <button type="button" @click="ifShowWindow = true" v-if="!ifShowWindow">
      显示窗口
    </button>
    <button type="button" @click="ifShowWindow = false" v-else>隐藏窗口</button>
  </div>
</template>
<script>
  Vue.use(window['vue-directive-window']);

  export default {
    data() {
      return {
        windowParams: {
          movable: 'vertical',
          resizable: false,
        },
        ifShowWindow: false,
      };
    },
  };
</script>
<style>
  .container {
    padding: 30px;
  }
  .window5 {
    width: 400px;
    position: fixed;
    top: 60px;
    left: 0;
  }
</style>
```

:::

## 避免拖拽移动过程中触发窗口内部的 click 事件
当你没有指定`customMoveHandler`参数时，用户可以拖拽窗口内部任一位置来移动窗口，但这会带来一个问题：假如用户通过拖拽窗口内某一按钮来移动窗口，则当用户结束拖拽时，这个按钮也会视为被触发了 **click** 事件，这通常不是我们所期望发生的。

因此，vue-directive-window 提供了拖拽移动相关的钩子，你可以在钩子的回调函数上加锁来避免拖拽移动触发 click 事件，下面是具体的示例：

::: demo

```html
<template>
  <div class="container">
    <div class="window window6" v-show="ifShowWindow" v-window="windowParams">
      <div class="window__header">
        避免拖拽移动过程中触发窗口内部的 click 事件
      </div>
      <div class="window__body">
        <button @click="clickCb">点击执行alert</button>
      </div>
    </div>

    <button type="button" @click="ifShowWindow = true" v-if="!ifShowWindow">
      显示窗口
    </button>
    <button type="button" @click="ifShowWindow = false" v-else>隐藏窗口</button>
  </div>
</template>
<script>
  Vue.use(window['vue-directive-window']);

  export default {
    data() {
      return {
        windowParams: {
          resizable: false,
          moveStartCallback: () => {
            this.clickLock = true;
          },
          moveEndCallback: () => {
            setTimeout(() => {
              this.clickLock = false;
            }, 300);
          }
        },
        ifShowWindow: false,
        clickLock: false,
      };
    },
    methods: {
      clickCb() {
        if (this.clickLock) return;
        alert('您点击了按钮');
      }
    }
  };
</script>
<style>
  .container {
    padding: 30px;
  }
  .window6 {
    width: 400px;
    position: fixed;
    top: 60px;
    left: 0;
  }
</style>
```

:::