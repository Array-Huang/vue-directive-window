import {
  moveEvent,
  endEvent,
  regexMatchTransform,
  getClientPosition,
  isOutOfBrowser,
} from './common';

export function handleStartEventForMove(event) {
  function _handleEndEventForMove(event) {
    document.removeEventListener(moveEvent, _handleMoveEventForMove, false); // 拖拽结束，清除移动的事件回调

    /* 恢复cursor */
    el.style.cursor = 'auto';

    event.preventDefault();
  }

  function _handleMoveEventForMove(event) {
    /* 判断鼠标是否已出浏览器窗口，是的话就限制移动，避免整个window出浏览器窗口 */
    if (isOutOfBrowser(event)) {
      return false;
    }

    const position = getClientPosition(event); // 获取鼠标/手指的位置

    /* 计算transform:translate的值 */
    const translate = {
      x: position.x - startPoint.x + originTranslate.x,
      y: position.y - startPoint.y + originTranslate.y,
    };

    el.style.transform = `translate(${translate.x}px, ${translate.y}px)`;
  }

  /* 只有拖拽本体才会挪动，拖拽子元素是不会挪动的 */
  if (event.target !== event.currentTarget) {
    return;
  }
  const el = event.currentTarget; // event.currentTarget是绑定事件的element
  const startPoint = getClientPosition(event); // 记录本次拖拽的起点位置
  document.addEventListener(moveEvent, _handleMoveEventForMove, false); // 应在拖拽开始后才绑定移动的事件回调
  document.addEventListener(endEvent, _handleEndEventForMove);

  const originTranslate = regexMatchTransform(el.style.transform); // 解析transform: translate的值

  /* 调整cursor */
  el.style.cursor = 'all-scroll';

  event.preventDefault();
}
