# 参数

## minWidth
- 类型: `Number`
- 默认值: `100`
- 说明: 窗口可被调整至的最小宽度(px)

## maxWidth
- 类型: `Number`
- 说明: 窗口可被调整至的最大宽度(px)

## minHeight
- 类型: `Number`
- 默认值: `100`
- 说明: 窗口可被调整至的最小高度(px)

## maxHeight
- 类型: `Number`
- 说明: 窗口可被调整至的最大高度(px)

## movable
- 类型: `Boolean`/`String`
- 默认值: `true`
- 可选值：`true`/`false`/`'horizontal'`/`'vertical'`
- 说明: 是否开启拖拽移动功能；`'horizontal'`表示只允许水平方向的拖拽移动，`'vertical'`表示只允许垂直方向的拖拽移动，`true`表示水平垂直方向的拖拽移动均被允可。

## resizable
- 类型: `Boolean`/`Array`
- 默认值: `true`
- 可选值: `left-top`/`left-bottom`/`left`/`right-top`/`right-bottom`/`right`/`top`/`bottom`
- 说明: 是否开启调整窗口尺寸的功能。参数为`true`表示八个方向均可调整窗口尺寸；但如果传入的是字符串数组，如`['left', 'left-top']`，则只有参数指定的方向可以调整窗口尺寸；各个方向的标识如“可选值”列里所示。

## customMoveHandler
- 类型: `String`/`Element`
- 说明: 自定义的拖拽移动handler。如果传入字符串类型参数，系统则将采用`document.querySelector(customMoveHandler)`来获取handler。

## customMaximizeHandler
- 类型: `String`/`Element`
- 说明: 自定义的最大化handler。如果传入字符串类型参数，系统则将采用`document.querySelector(customMoveHandler)`来获取handler。

## maximizeCallback
- 类型: `Function`
- 说明: 窗口最大化的回调函数。回调参数为：当前是否最大化(Boolean)。