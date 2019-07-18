import { getPositionOffset, getSize } from './common';
/**
 * 添加窗口最大化的事件
 *
 * @export
 * @param {Element} handler
 */
export function addMaximizeEvent(handler) {
  const target = this.window;
  const params = this.params;
  let positionOffset; // 记录最大化前的位置偏移(top/left)
  let size; // 记录最大化前的大小(width/height)
  let position; // 记录最大化前的position值
  let isMaximize = false; // 记录当前是否为最大化的状态，方便判定切换状态
  /* 设置位置偏移值 */
  function _setPositionOffset(left, top, right, bottom) {
    if (typeof left === 'number') {
      target.style.left = left + 'px';
    }
    if (typeof top === 'number') {
      target.style.top = top + 'px';
    }
    if (typeof right === 'number') {
      target.style.right = right + 'px';
    }
    if (typeof bottom === 'number') {
      target.style.bottom = bottom + 'px';
    }
  }
  /* 设置大小 */
  function _setSize(width, height) {
    target.style.width = width;
    target.style.height = height;
  }
  /* 最大化窗口，其原理是取浏览器窗口的宽高来设置在窗口上 */
  function _setTargetMaximize() {
    _setPositionOffset(0, 0, 0, 0);
    _setSize('auto', 'auto');
  }

  /* 在最大化的handler绑定click事件回调 */
  handler.addEventListener('click', event => {
    if (!isMaximize) {
      positionOffset = getPositionOffset(target); // 记录最大化前的位置偏移
      size = getSize(target); // 记录最大化前的窗口大小

      _setTargetMaximize(); // 最大化窗口
      isMaximize = true;
    } else {
      // 如果当前是最大化状态...
      target.style.position = position;
      _setPositionOffset(positionOffset.x, positionOffset.y);
      _setSize(size.width, size.height);
      window.removeEventListener('resize', _setTargetMaximize);
      isMaximize = false;
    }

    if (
      !!params.maximizeCallback &&
      typeof params.maximizeCallback === 'function'
    ) {
      params.maximizeCallback(isMaximize);
    }

    event.stopPropagation();
  });
}
