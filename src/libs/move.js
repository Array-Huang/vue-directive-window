import {
  moveEvent,
  endEvent,
  regexMatchTransform,
  getClientPosition,
} from './common';

export function handleStartEventForMove(event) {
  function _handleEndEventForMove(event) {
    /* 只有拖拽本体才会挪动，拖拽子元素是不会挪动的 */
    if (event.target !== event.currentTarget) {
      return;
    }

    const el = event.currentTarget; // event.currentTarget是绑定事件的element
    delete el.dataset.startPoint; // 清除临时值
    /* 记录transform:translate的值，便于下次拖拽使用 */
    el.dataset.translate = JSON.stringify(
      regexMatchTransform(el.style.transform)
    );
    el.removeEventListener(moveEvent, _handleMoveEventForMove, false); // 拖拽结束，清除移动的事件回调

    /* 恢复cursor */
    el.style.cursor = 'auto';

    event.preventDefault();
  }

  function _handleMoveEventForMove(event) {
    const el = event.currentTarget; // event.currentTarget是绑定事件的element
    const position = getClientPosition(event); // 获取鼠标/手指的位置
    const startPoint = JSON.parse(el.dataset.startPoint);
    const originTranslate = JSON.parse(el.dataset.translate);
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
  el.dataset.startPoint = JSON.stringify(getClientPosition(event)); // 记录本次拖拽的起点位置
  el.addEventListener(moveEvent, _handleMoveEventForMove, false); // 应在拖拽开始后才绑定移动的事件回调
  el.addEventListener(endEvent, _handleEndEventForMove);

  /* 如果是第一次进行拖拽，则进行初始化：根据transform */
  if (!el.dataset.translate) {
    const translate = regexMatchTransform(el.style.transform); // 解析transform: translate的值
    el.dataset.translate = JSON.stringify(translate); // 把transform: translate的值存储在dataset里
  }

  /* 调整cursor */
  el.style.cursor = 'all-scroll';

  event.preventDefault();
}
