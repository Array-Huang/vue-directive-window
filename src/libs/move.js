import {
  moveEvent,
  endEvent,
  getPositionOffset,
  getClientPosition,
  isOutOfBrowser,
  judgeResizeType,
  getSize,
  setSize,
} from './common';

export function handleStartEventForMove(event) {
  function _handleEndEventForMove(event) {
    document.removeEventListener(moveEvent, _handleMoveEventForMove, false); // 拖拽结束，清除移动的事件回调

    /* 恢复cursor */
    handler.style.cursor = 'auto';

    event.preventDefault();

    /* 撤销moving状态，但由于此状态值主要用于吞掉click事件，因此使用setTimeout延长moving状态至click事件结束 */
    setTimeout(() => {
      window.className = window.className.replace(/ ?moving/, '');
    }, 0);
  }

  function _handleMoveEventForMove(event) {
    /* 判断鼠标是否已出浏览器窗口，是的话就限制移动，避免整个window出浏览器窗口 */
    if (isOutOfBrowser(event)) {
      return false;
    }

    const position = getClientPosition(event); // 获取鼠标/手指的位置
    /* 计算位置偏移值 */
    const positionOffset = {
      x: position.x - startPoint.x + originPositionOffset.x,
      y: position.y - startPoint.y + originPositionOffset.y,
    };

    window.style.top = positionOffset.y + 'px'; // 设置纵坐标，即top
    window.style.left = positionOffset.x + 'px'; // 设置横坐标，left
    window.style.bottom = 'auto'; // 必须设置为auto，否则就会把高度撑起来
    window.style.right = 'auto'; // 必须设置为auto，否则就会把宽度撑起来

    /* 设置moving状态，主要用于吞掉click事件 */
    if (window.className.indexOf('moving') === -1) {
      window.className += ' moving';
    }
  }

  const handler = event.currentTarget; // event.currentTarget是绑定事件的element
  const window = this.window;
  const startPoint = getClientPosition(event); // 记录本次拖拽的起点位置

  /* 当窗口本体作为MoveHandler且启用resize特性时，需要判断拖拽的位置是否与resize重复 */
  if (
    this.params.resizable &&
    this.isMoveHandlerEqualWindow &&
    judgeResizeType(startPoint, window) !== 'middle'
  ) {
    return;
  }

  /* 固定窗口宽高 */
  let size = getSize(window);
  size = {
    width: parseInt(size.width),
    height: parseInt(size.height),
  };
  setSize(window, size.width, size.height);

  document.addEventListener(moveEvent, _handleMoveEventForMove, false); // 应在拖拽开始后才绑定移动的事件回调
  document.addEventListener(endEvent, _handleEndEventForMove);

  const originPositionOffset = getPositionOffset(window); // 获取当前的位置偏移值
  /* 调整cursor */
  handler.style.cursor = 'all-scroll';

  event.preventDefault();
}
