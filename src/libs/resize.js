import {
  moveEvent,
  endEvent,
  getClientPosition,
  isOutOfBrowser,
  getSize,
  getPositionOffset,
  setSize,
  setPositionOffset,
  isInMoveHandler,
  isInMaximizeHandler,
} from './common';

const RESIZE_SCOPE = 10;

function _judgeResizeType(startPoint, target) {
  const x = startPoint.x;
  const y = startPoint.y;
  const offsetTop = target.offsetTop;
  const offsetLeft = target.offsetLeft;
  const offsetWidth = target.offsetWidth;
  const offsetHeight = target.offsetHeight;

  if (Math.abs(offsetLeft - x) <= RESIZE_SCOPE) {
    if (Math.abs(offsetTop - y) <= RESIZE_SCOPE) {
      return 'left-top';
    } else if (Math.abs(offsetTop + offsetHeight - y) <= RESIZE_SCOPE) {
      return 'left-bottom';
    } else {
      return 'left';
    }
  }

  if (Math.abs(offsetLeft + offsetWidth - x) <= RESIZE_SCOPE) {
    if (Math.abs(offsetTop - y) <= RESIZE_SCOPE) {
      return 'right-top';
    } else if (Math.abs(offsetTop + offsetHeight - y) <= RESIZE_SCOPE) {
      return 'right-bottom';
    } else {
      return 'right';
    }
  }

  if (Math.abs(offsetTop - y) <= RESIZE_SCOPE) {
    return 'top';
  } else if (Math.abs(offsetTop + offsetHeight - y) <= RESIZE_SCOPE) {
    return 'bottom';
  }

  return false;
}

function _calWidthAndOffset({
  type,
  originSize,
  originOffset,
  nowPosition,
  startPoint,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
}) {
  /* 获取最小/最大宽度限制下的实际宽度 */
  function _getLimitWidth({ minWidth, maxWidth, currentWidth }) {
    /* 最小宽度限制 */
    if (!!minWidth && currentWidth < minWidth) {
      currentWidth = minWidth;
    } else if (currentWidth < 0) {
      currentWidth = 0;
    }
    /* 最大宽度限制 */
    if (!!maxWidth && currentWidth > maxWidth) {
      currentWidth = maxWidth;
    }

    return currentWidth;
  }
  /* 获取最小/最大高度限制下的实际高度 */
  function _getLimitHeight({ minHeight, maxHeight, currentHeight }) {
    /* 最小宽度限制 */
    if (!!minHeight && currentHeight < minHeight) {
      currentHeight = minHeight;
    } else if (currentHeight < 0) {
      currentHeight = 0;
    }
    /* 最大宽度限制 */
    if (!!maxHeight && currentHeight > maxHeight) {
      currentHeight = maxHeight;
    }

    return currentHeight;
  }

  const optionWidth = nowPosition.x - startPoint.x + originSize.width;
  const optionHeight = nowPosition.y - startPoint.y + originSize.height;
  let calWidth = originSize.width;
  let calHeight = originSize.height;
  let calTop = originOffset.y;
  let calLeft = originOffset.x;
  /* 左边的拖拽调整大小 */
  if (type.indexOf('left') > -1) {
    calWidth = startPoint.x - nowPosition.x + originSize.width; // 根据拖拽移动的水平位移决定宽度
    calWidth = _getLimitWidth({ minWidth, maxWidth, currentWidth: calWidth }); // 根据最大/最小宽度限制来决定最终的宽度
    calLeft = originOffset.x - (calWidth - originSize.width); // 根据宽度的变化量来决定窗口的left属性
  }
  /* 上边的拖拽调整大小 */
  if (type.indexOf('top') > -1) {
    calHeight = startPoint.y - nowPosition.y + originSize.height; // 根据拖拽移动的垂直位移决定高度
    // 根据最大/最小高度限制来决定最终的高度
    calHeight = _getLimitHeight({
      minHeight,
      maxHeight,
      currentHeight: calHeight,
    });
    calTop = originOffset.y - (calHeight - originSize.height); // 根据高度的变化量来决定窗口的top属性
  }
  /* 右边的拖拽调整大小 */
  if (type.indexOf('right') > -1) {
    calWidth = _getLimitWidth({
      minWidth,
      maxWidth,
      currentWidth: optionWidth,
    });
  }
  /* 下边的拖拽调整大小 */
  if (type.indexOf('bottom') > -1) {
    calHeight = _getLimitHeight({
      minHeight,
      maxHeight,
      currentHeight: optionHeight,
    });
  }

  return { calWidth, calHeight, calTop, calLeft };
}

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
    const nowPosition = getClientPosition(moveEvent); // 获取鼠标/手指的位置
    const { calWidth, calHeight, calTop, calLeft } = _calWidthAndOffset({
      type,
      originSize,
      originOffset,
      nowPosition,
      startPoint,
      minWidth: params.minWidth,
      maxWidth: params.maxWidth,
      minHeight: params.minHeight,
      maxHeight: params.maxHeight,
    });
    setSize(target, calWidth, calHeight);
    setPositionOffset(target, calLeft, calTop);
    moveEvent.stopPropagation();
  }

  function _handleEndEventForResize(endEvent) {
    document.removeEventListener(moveEvent, _handleMoveEventForResize, false); // 拖拽结束，清除移动的事件回调

    endEvent.preventDefault();
    endEvent.stopPropagation();
  }

  const eventEl = startEvent.target;
  const params = this.params;
  const target = this.window;
  const startPoint = getClientPosition(startEvent); // 本次拖拽的起点位置
  const type = _judgeResizeType(startPoint, target); // 获取本次点击位于窗口的哪个区域
  /* 点击位置位于窗口中央，不做任何处理 */
  if (!type) {
    return;
  }
  /* 判断是否点击在拖拽移动的handler上，是的话就不做处理 */
  if (isInMoveHandler(eventEl, params)) {
    return;
  }
  /* 判断是否点击在最大化的handler上，是的话就不做处理 */
  if (isInMaximizeHandler(eventEl, params)) {
    return;
  }
  let originSize = getSize(target);
  originSize = {
    width: parseInt(originSize.width),
    height: parseInt(originSize.height),
  };

  const originOffset = getPositionOffset(target);

  document.addEventListener(moveEvent, _handleMoveEventForResize, false); // 应在拖拽开始后才绑定移动的事件回调
  document.addEventListener(endEvent, _handleEndEventForResize); // 绑定endEvent
  startEvent.preventDefault();
  startEvent.stopPropagation();
}
