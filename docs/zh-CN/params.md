# 参数

参数 | 说明 | 类型 | 可选值 | 默认值 
---|---|---|---|---
minWidth | 窗口可被调整至的最小宽度(px) | Number | —— | 100
maxWidth | 窗口可被调整至的最大宽度(px) | Number | —— | ——
minHeight | 窗口可被调整至的最小高度(px) | Number | —— | 100
maxHeight | 窗口可被调整至的最大高度(px) | Number | —— | ——
movable | 是否开启拖拽移动功能 | Boolean | —— | true
resizable | 是否开启调整窗口尺寸的功能。参数为`true`表示八个方向均可调整窗口尺寸；但如果传入的是字符串数组，如`['left', 'left-top']`，则只有参数指定的方向可以调整窗口尺寸；各个方向的标识如“可选值”列里所示。 | Boolean / Array | `left-top`/`left-bottom`/`left`/`right-top`/`right-bottom`/`right`/`top`/`bottom` | true
customMoveHandler | 自定义的拖拽移动handler。如果传入字符串类型参数，系统则将采用`document.querySelector(customMoveHandler)`来获取handler。 | String / Element | —— | ——
customMaximizeHandler | 自定义的最大化handler。如果传入字符串类型参数，系统则将采用`document.querySelector(customMoveHandler)`来获取handler。 | String / Element | —— | ——
maximizeCallback | 窗口最大化的回调函数。回调参数为：当前是否最大化(Boolean) | Function | —— | ——