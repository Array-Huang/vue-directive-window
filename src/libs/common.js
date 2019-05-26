/* 判断当前应该采用mouse相关事件还是touch相关事件 */
export const isTouchEvent = 'ontouchstart' in window;
export const startEvent = isTouchEvent ? 'touchstart' : 'mousedown';
export const moveEvent = isTouchEvent ? 'touchmove' : 'mousemove';
export const endEvent = isTouchEvent ? 'touchend' : 'mouseup';

/**
 * 从Event对象中获取当前鼠标/手指的位置
 *
 * @param {Event} event
 * @returns {Object}
 */
export function getClientPosition(event) {
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
export function regexMatchTransform(transformCssText) {
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

export function isOutOfBrowser(event) {
  if (
    event.clientY > window.innerWidth ||
    event.clientY < 0 ||
    event.clientX < 0 ||
    event.clientX > window.innerHeight
  ) {
    return true;
  }

  return false;
}
