import Vue from 'vue';

/* 判断当前应该采用mouse相关事件还是touch相关事件 */
const isTouchEvent = 'ontouchstart' in window;
const startEvent = isTouchEvent ? 'touchstart' : 'mousedown';
const moveEvent = isTouchEvent ? 'touchmove' : 'mousemove';
const endEvent = isTouchEvent ? 'touchend' : 'mouseup';
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

function _handleStartEvent(event) {
  const el = event.currentTarget; // event.currentTarget是绑定事件的element
  el.dataset.startPoint = JSON.stringify(_getClientPosition(event)); // 记录本次拖拽的起点位置
  el.addEventListener(moveEvent, _handleMoveEvent, false); // 应在拖拽开始后才绑定移动的事件回调

  /* 如果是第一次进行拖拽，则进行初始化：根据transform */
  if (!el.dataset.translate) {
    const translate = _regexMatchTransform(el.style.transform); // 解析transform: translate的值
    el.dataset.translate = JSON.stringify(translate); // 把transform: translate的值存储在dataset里
  }

  event.preventDefault();
}

function _handleMoveEvent(event) {
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

function _handleEndEvent(event) {
  const el = event.currentTarget; // event.currentTarget是绑定事件的element
  delete el.dataset.startPoint; // 清除临时值
  /* 记录transform:translate的值，便于下次拖拽使用 */
  el.dataset.translate = JSON.stringify(
    _regexMatchTransform(el.style.transform)
  );
  el.removeEventListener(moveEvent, _handleMoveEvent, false); // 拖拽结束，清除移动的事件回调

  event.preventDefault();
}

Vue.directive('window', {
  startPoint: {},
  bind(el) {
    /* 拖拽移动相关 */
    el.addEventListener(startEvent, _handleStartEvent);
    el.addEventListener(endEvent, _handleEndEvent);
  },
});
