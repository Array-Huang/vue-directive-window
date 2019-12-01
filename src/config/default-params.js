export default {
  minWidth: 100, // resize最小宽度
  maxWidth: null, // resize最大宽度
  minHeight: 100, // resize最小高度
  maxHeight: null, // resize最大高度
  movable: true, // 是否开启拖拽移动功能，默认开启
  resizable: true, // 是否开启resize功能，true表示开启，false表示关闭；另外还可接受数组类型参数，指定在哪些方向上开启resize，包括：left-top/left-bottom/left/right-top/right-bottom/right/top/bottom
  customMoveHandler: null, // 自定义的拖拽移动handler，可接受选择器形式的参数，或是Element；为空则以窗口自身为handler
  customMaximizeHandler: null, // 自定义的最大化handler，可接受选择器形式的参数，或是Element；为空则不开启最大化的功能
  maximizeCallback: () => {}, // 最大化后的回调函数
  moveStartCallback: () => {}, // 拖拽移动开始的回调函数
  movingCallback: () => {}, // 拖拽移动过程中的回调函数，在每次拖拽过程中会被执行多次
  moveEndCallback: () => {}, // 拖拽移动结束的回调函数
};
