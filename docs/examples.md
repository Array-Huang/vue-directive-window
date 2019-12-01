# Examples

## Vue Custom Directive `v-window` Basic Example

Contain three feature: drag, resize, maximize.

::: warning
`<iframe />` will swallow the touch/mouse event, include `touchmove` and `mousemove` which are dependent by drag and resize feature. Therefor, when mouse/finger move into the `<iframe />` area, there will be no any response for drag/resize. Fortunatly, I have already considered this situation and finally fix it, so you won't be conserned.
:::

::: demo

```html
<template>
  <div class="container">
    <div class="window window1" v-show="ifShowWindow" v-window="windowParams">
      <div class="window__header">
        Basic Example
        <button class="maximize-btn" type="button">
          <template v-if="!isMaximize"
            >maximize</template
          >
          <template v-else
            >minimize</template
          >
        </button>
      </div>
      <div class="window__body">
        <iframe height="100%" width="100%" frameborder="0" src="https://array-huang.github.io/vue-directive-window/">
      </div>
    </div>

    <button type="button" @click="ifShowWindow = true" v-if="!ifShowWindow">
      display window
    </button>
    <button type="button" @click="ifShowWindow = false" v-else>hide window</button>
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

## Javascript Class Library Basic Example

::: demo

```html
<template>
  <div class="container">
    <div class="window window2 window--by-function" v-show="ifShowWindow">
      <div class="window__header">
        Window Created by Javascript Class Library
      </div>
      <div class="window__body">
        <p>window content1</p>
        <p>window content2</p>
        <p>window content3</p>
      </div>
    </div>

    <button type="button" @click="show" v-if="!ifShowWindow">display window</button>
    <button type="button" @click="hide" v-else>hide window</button>
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

## Disable Drag and Enable Part of Resize

::: demo

```html
<template>
  <div class="container">
    <div class="window window3" v-show="ifShowWindow" v-window="windowParams">
      <div class="window__header">
        Window Which Part of Feature Available
      </div>
      <div class="window__body">
        <p>window content1</p>
        <p>window content2</p>
        <p>window content3</p>
      </div>
    </div>

    <button type="button" @click="ifShowWindow = true" v-if="!ifShowWindow">
      display window
    </button>
    <button type="button" @click="ifShowWindow = false" v-else>hide window</button>
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

## Pass Drag Handler Parameter

In this example，you could move the window only when you drag the Drag Handler(`.window_header`), which is the header of the window.

::: demo

```html
<template>
  <div class="container">
    <div class="window window4" v-show="ifShowWindow" v-window="windowParams">
      <div class="window__header">
        Window with Drag Handler
      </div>
      <div class="window__body">
        <p>window content1</p>
        <p>window content2</p>
        <p>window content3</p>
      </div>
    </div>

    <button type="button" @click="ifShowWindow = true" v-if="!ifShowWindow">
      display window
    </button>
    <button type="button" @click="ifShowWindow = false" v-else>hide window</button>
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

## Only Vertical Drag Available
When set `movable` to `'vertical'`, users will be only allow to make vertical drag; for the same reason, `'horizontal'` means only allow horizontal drag.

::: demo

```html
<template>
  <div class="container">
    <div class="window window5" v-show="ifShowWindow" v-window="windowParams">
      <div class="window__header">
        Only Vertical Drag Available
      </div>
      <div class="window__body">
        <iframe height="100%" width="100%" frameborder="0" src="https://array-huang.github.io/vue-directive-window/">
      </div>
    </div>

    <button type="button" @click="ifShowWindow = true" v-if="!ifShowWindow">display window</button>
    <button type="button" @click="ifShowWindow = false" v-else>hide window</button>
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

## Avoid Unexpected Click Event Inside Window During Drag Window
When you have not provided param `customMoveHandler`, users are able to drag&move the window through any position inside the window. Though this may poses a problem: in case user drag&move the window through a button in the window, this button's CLICK event will be triggered when drag&move finish, and this is not we expedted generally.

Therefore, vue-directive-window provide hooks related to drag&move，and you should add LOCK to avaoid the unexpected CLICK event triggered by drag&move. Here is an example:

::: demo

```html
<template>
  <div class="container">
    <div class="window window6" v-show="ifShowWindow" v-window="windowParams">
      <div class="window__header">
        Avoid Unexpected Click Event Inside Window During Drag Window
      </div>
      <div class="window__body">
        <button @click="clickCb">clik to excute alert</button>
      </div>
    </div>

    <button type="button" @click="ifShowWindow = true" v-if="!ifShowWindow">display window</button>
    <button type="button" @click="ifShowWindow = false" v-else>hide window</button>
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
        alert('you clicked the button');
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