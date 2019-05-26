import {
  moveEvent,
  endEvent,
  getClientPosition,
  isOutOfBrowser,
} from './common';

/**
 * 为了拖拽调整大小，绑定事件；
 * 与拖拽移动不一样的是，由于鼠标在移动过程中会超出window的范围，因此moveEvent需要绑定在document上
 *
 * @param {Event} event
 * @returns
 */
export function handleStartEventForResize(startEvent) {
  function _handleMoveEventForResize(moveEvent) {
    /* 判断鼠标是否已出浏览器窗口，是的话就限制拖拽，避免整个window出浏览器窗口 */
    if (isOutOfBrowser(moveEvent)) {
      return false;
    }
    const position = getClientPosition(moveEvent); // 获取鼠标/手指的位置
    let windowWidth = position.x - standard.x;
    let windowHeight = position.y - standard.y;
    /* 最小宽度限制 */
    if (!!minWidth && windowWidth < minWidth) {
      windowWidth = minWidth;
    } else if (windowWidth < 0) {
      windowWidth = 0;
    }
    /* 最大宽度限制 */
    if (!!maxWidth && windowWidth > maxWidth) {
      windowWidth = maxWidth;
    }
    /* 最小搞度限制 */
    if (!!minHeight && windowHeight < minHeight) {
      windowHeight = minHeight;
    } else if (windowHeight < 0) {
      windowHeight = 0;
    }
    /* 最大搞度限制 */
    if (!!maxHeight && windowHeight > maxHeight) {
      windowHeight = maxHeight;
    }

    window.style.width = windowWidth + 'px';
    window.style.height = windowHeight + 'px';
    moveEvent.stopPropagation();
  }

  function _handleEndEventForResize(endEvent) {
    document.removeEventListener(moveEvent, _handleMoveEventForResize, false); // 拖拽结束，清除移动的事件回调

    endEvent.preventDefault();
    endEvent.stopPropagation();
  }

  /* 只有拖拽本体才有效，拖拽子元素是无效的 */
  if (startEvent.target !== startEvent.currentTarget) {
    return;
  }
  const el = startEvent.currentTarget; // startEvent.currentTarget是绑定事件的element，这里指的其实是handler
  const startPoint = getClientPosition(startEvent); // 本次拖拽的起点位置
  const window = el.parentElement; // handler的父节点，即为window
  const standard = {
    x: startPoint.x - window.offsetWidth, // 可以“近似”认为是window的offsetLeft
    y: startPoint.y - window.offsetHeight, // 可以“近似”认为是window的offsetTop
  };

  const { minWidth, maxWidth, minHeight, maxHeight } = this.params;

  document.addEventListener(moveEvent, _handleMoveEventForResize, false); // 应在拖拽开始后才绑定移动的事件回调
  document.addEventListener(endEvent, _handleEndEventForResize); // 绑定endEvent
  startEvent.preventDefault();
  startEvent.stopPropagation();
}

export function addResizeHandler(el, resizeHandlerClassName) {
  const handler = document.createElement('div');
  handler.className = resizeHandlerClassName;
  handler.style.position = 'absolute';
  handler.style.right = 0;
  handler.style.bottom = 0;
  handler.style.width = '10px';
  handler.style.height = '10px';
  handler.style.cursor = 'nw-resize';
  handler.style.backgroundColor = '#666';
  el.appendChild(handler);
}
