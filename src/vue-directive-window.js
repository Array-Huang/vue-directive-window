import Vue from 'vue';

/* 判断当前应该采用mouse相关事件还是touch相关事件 */
const isTouchEvent = 'ontouchstart' in window;
const startEvent = isTouchEvent ? 'touchstart' : 'mousedown';
const moveEvent = isTouchEvent ? 'touchmove' : 'mousemove';
const endEvent = isTouchEvent ? 'touchend' : 'mouseup';

const RESIZE_HANDLER_CLASSNAME = 'window-resize-handler';

/**
 * 从Event对象中获取当前鼠标/手指的位置
 *
 * @param {Event} event
 * @returns {Object}
 */
function _getClientPosition(event) {
  const clientX = isTouchEvent ? event.targetTouches[0].clientX : event.clientX;
  const clientY = isTouchEvent ? event.targetTouches[0].clientY : event.clientY;

  return {
    x: clientX,
    y: clientY,
  };
}
/**
 * 从transform的css字符串里匹配出偏移值
 *
 * @param {String} transformCssText
 * @returns {Object}
 */
function _regexMatchTransform(transformCssText) {
  const translate = {
    x: 0,
    y: 0,
  };
  const regex = /^translate\((-?\d+).*px, (-?\d+).*px\)$/i;
  const result = regex.exec(transformCssText);
  if (result) {
    translate.x = parseInt(result[1]);
    translate.y = parseInt(result[2]);
  }

  return translate;
}

function _handleStartEventForResize(event) {
  /* 只有拖拽本体才有效，拖拽子元素是无效的 */
  if (event.target !== event.currentTarget) {
    return;
  }
  const el = event.currentTarget; // event.currentTarget是绑定事件的element
  const startPoint = _getClientPosition(event); // 本次拖拽的起点位置
  const window = el.parentElement;
  el.dataset.standard = JSON.stringify({
    x: startPoint.x - window.offsetWidth,
    y: startPoint.y - window.offsetHeight,
  });
  console.log(el.dataset.standard);
  el.addEventListener(moveEvent, _handleMoveEventForResize, false); // 应在拖拽开始后才绑定移动的事件回调
  event.preventDefault();
  event.stopPropagation();
}

function _handleMoveEventForResize(event) {
  const el = event.currentTarget; // event.currentTarget是绑定事件的element
  const position = _getClientPosition(event); // 获取鼠标/手指的位置
  const standard = JSON.parse(el.dataset.standard);
  // const resize = {
  //   x: position.x - standard.x,
  //   y: position.y - standard.y,
  // };
  // console.log(resize);
  const window = el.parentElement;
  const windowWidth = position.x - standard.x;
  const windowHeight = position.y - standard.y;
  console.log(standard, position);
  window.style.width = windowWidth > 0 ? windowWidth + 'px' : 0;
  window.style.height = windowHeight > 0 ? windowHeight + 'px' : 0;
  event.stopPropagation();
}

function _handleEndEventForResize(event) {
  /* 只有拖拽本体才有效 */
  if (event.target !== event.currentTarget) {
    return;
  }

  const el = event.currentTarget; // event.currentTarget是绑定事件的element
  delete el.dataset.startPoint; // 清除临时值
  el.removeEventListener(moveEvent, _handleMoveEventForResize, false); // 拖拽结束，清除移动的事件回调

  event.preventDefault();
  event.stopPropagation();
}

function _handleStartEventForMove(event) {
  /* 只有拖拽本体才会挪动，拖拽子元素是不会挪动的 */
  if (event.target !== event.currentTarget) {
    return;
  }
  const el = event.currentTarget; // event.currentTarget是绑定事件的element
  el.dataset.startPoint = JSON.stringify(_getClientPosition(event)); // 记录本次拖拽的起点位置
  el.addEventListener(moveEvent, _handleMoveEventForMove, false); // 应在拖拽开始后才绑定移动的事件回调

  /* 如果是第一次进行拖拽，则进行初始化：根据transform */
  if (!el.dataset.translate) {
    const translate = _regexMatchTransform(el.style.transform); // 解析transform: translate的值
    el.dataset.translate = JSON.stringify(translate); // 把transform: translate的值存储在dataset里
  }

  /* 调整cursor */
  el.style.cursor = 'all-scroll';

  event.preventDefault();
}

function _handleMoveEventForMove(event) {
  const el = event.currentTarget; // event.currentTarget是绑定事件的element
  const position = _getClientPosition(event); // 获取鼠标/手指的位置
  const startPoint = JSON.parse(el.dataset.startPoint);
  const originTranslate = JSON.parse(el.dataset.translate);
  /* 计算transform:translate的值 */
  const translate = {
    x: position.x - startPoint.x + originTranslate.x,
    y: position.y - startPoint.y + originTranslate.y,
  };

  el.style.transform = `translate(${translate.x}px, ${translate.y}px)`;
}

function _handleEndEventForMove(event) {
  /* 只有拖拽本体才会挪动，拖拽子元素是不会挪动的 */
  if (event.target !== event.currentTarget) {
    return;
  }

  const el = event.currentTarget; // event.currentTarget是绑定事件的element
  delete el.dataset.startPoint; // 清除临时值
  /* 记录transform:translate的值，便于下次拖拽使用 */
  el.dataset.translate = JSON.stringify(
    _regexMatchTransform(el.style.transform)
  );
  el.removeEventListener(moveEvent, _handleMoveEventForMove, false); // 拖拽结束，清除移动的事件回调

  /* 恢复cursor */
  el.style.cursor = 'auto';

  event.preventDefault();
}

function _addResizeHandler(el) {
  const handler = document.createElement('div');
  handler.className = RESIZE_HANDLER_CLASSNAME;
  handler.style.position = 'absolute';
  handler.style.right = 0;
  handler.style.bottom = 0;
  handler.style.width = '5px';
  handler.style.height = '5px';
  handler.style.cursor = 'nw-resize';
  handler.style.backgroundColor = '#666';
  el.appendChild(handler);
}

Vue.directive('window', {
  startPoint: {},
  bind(el) {
    /* 拖拽移动相关 */
    el.addEventListener(startEvent, _handleStartEventForMove);
    el.addEventListener(endEvent, _handleEndEventForMove);
    /* 拖拽调整大小相关 */
    if (!el.style.position || el.style.position === 'static') {
      el.style.position = 'relative';
    }
    _addResizeHandler(el);
    el.querySelector('.' + RESIZE_HANDLER_CLASSNAME).addEventListener(
      startEvent,
      _handleStartEventForResize
    );
    el.querySelector('.' + RESIZE_HANDLER_CLASSNAME).addEventListener(
      endEvent,
      _handleEndEventForResize
    );
  },
});
