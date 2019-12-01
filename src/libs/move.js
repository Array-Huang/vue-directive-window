import {
  moveEvent,
  endEvent,
  getPositionOffset,
  getClientPosition,
  isOutOfBrowser,
  judgeResizeType,
  getSize,
  setSize,
  calDistance,
} from './common';
import constant from '../config/constant';

/**
 * 计算拖拽移动过程中窗口的位置，在移动过程中每一小段就会触发本方法
 *
 * @param {Object} touchStartPoint 鼠标/手势起始点
 * @param {Object} touchEndPoint 鼠标/手势当前点
 * @param {Object} windowOriginPosition 窗口在拖拽移动前的位置
 * @param {Object} movable 用户传入的拖拽移动开关/类型
 */
function _calWindowCurrentPosition(
  touchStartPoint,
  touchEndPoint,
  windowOriginPosition,
  movableParam
) {
  const supposePosition = {
    x: touchEndPoint.x - touchStartPoint.x + windowOriginPosition.x,
    y: touchEndPoint.y - touchStartPoint.y + windowOriginPosition.y,
  };

  switch (movableParam) {
    case 'horizontal':
      return {
        x: supposePosition.x,
        y: windowOriginPosition.y,
      };

    case 'vertical':
      return {
        x: windowOriginPosition.x,
        y: supposePosition.y,
      };

    case true:
    default:
      return supposePosition;
  }
}

export function handleStartEventForMove(event) {
  function _handleEndEventForMove(event) {
    /* 提供拖拽移动结束的钩子 */
    moveEndCallback();
    nowInMoving = false;

    document.removeEventListener(moveEvent, _handleMoveEventForMove, false); // 拖拽结束，清除移动的事件回调

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
    const positionOffset = _calWindowCurrentPosition(
      startPoint,
      position,
      originPositionOffset,
      movableParam
    );

    window.style.top = positionOffset.y + 'px'; // 设置纵坐标，即top
    window.style.left = positionOffset.x + 'px'; // 设置横坐标，left
    window.style.bottom = 'auto'; // 必须设置为auto，否则就会把高度撑起来
    window.style.right = 'auto'; // 必须设置为auto，否则就会把宽度撑起来

    /* 设置moving状态，主要用于吞掉click事件 */
    if (
      calDistance({
        x1: position.x,
        y1: position.y,
        x2: startPoint.x,
        y2: startPoint.y,
      }) > constant.AVAILABLE_CLICK_MAX_MOVE_DISTANCE &&
      window.className.indexOf('moving') === -1
    ) {
      window.className += ' moving';

      /* 提供拖拽移动相关的钩子 */
      if (!nowInMoving) {
        moveStartCallback();
        nowInMoving = true; // 保证在一次完整的拖拽移动过程中只触发一次moveStartCallback
      }
      movingCallback();
    }
  }

  const window = this.window;
  const startPoint = getClientPosition(event); // 记录本次拖拽的起点位置
  const movableParam = this.params.movable;
  const moveStartCallback = this.params.moveStartCallback;
  const movingCallback = this.params.movingCallback;
  const moveEndCallback = this.params.moveEndCallback;
  let nowInMoving = false;

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

  event.preventDefault();
}
