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
 * 获取当前的位置偏移值(left、top)
 *
 * @export
 * @param {Node} node
 * @returns {Object}
 */
export function getPositionOffset(node) {
  const styleLeft = parseInt(node.style.left);
  const styleTop = parseInt(node.style.top);

  return {
    x: styleLeft ? styleLeft : 0,
    y: styleTop ? styleTop : 0,
  };
}

/**
 * 获取node的宽高
 *
 * @export
 * @param {Node} node
 */
export function getSize(node) {
  const computedStyle = window.getComputedStyle(node);
  return {
    width: computedStyle.getPropertyValue('width'),
    height: computedStyle.getPropertyValue('height'),
  };
}

/**
 * 判断鼠标是否已出浏览器窗口
 * @param {Event} event
 * @return {Boolean}
 */
export function isOutOfBrowser(event) {
  if (
    event.clientX > window.innerWidth ||
    event.clientX < 0 ||
    event.clientY < 0 ||
    event.clientY > window.innerHeight
  ) {
    return true;
  }

  return false;
}
