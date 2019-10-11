import {
  startEvent,
  moveEvent,
  endEvent,
  ignoreIframe,
  recoverIframe,
} from './common';
import { handleStartEventForResize, cursorChange } from './resize';
import { handleStartEventForMove } from './move';
import { addMaximizeEvent } from './maximize';
import { validate } from './validate';
import DEFAULT_PARAMS from '../config/default-params';

function _prepareParams(customParams) {
  validate(customParams);
  return Object.assign({}, DEFAULT_PARAMS, customParams);
}

function getMoveHandler(finalParams, el) {
  const customMoveHandler = finalParams.customMoveHandler;
  if (customMoveHandler) {
    if (typeof customMoveHandler === 'string') {
      return el.querySelector(customMoveHandler);
    } else {
      return customMoveHandler;
    }
  } else {
    return el;
  }
}

function getMaximizeHandler(finalParams, el) {
  const customMaximizeHandler = finalParams.customMaximizeHandler;
  if (customMaximizeHandler) {
    if (typeof customMaximizeHandler === 'string') {
      return el.querySelector(customMaximizeHandler);
    } else {
      return customMaximizeHandler;
    }
  }

  return null;
}

function isMoveHandlerEqualWindow(window, moveHandler) {
  return window === moveHandler;
}

export function eventBinding(el, customParams) {
  const finalParams = _prepareParams(customParams);
  el = !!finalParams.windowEl ? finalParams.windowEl : el;
  const moveHandler = getMoveHandler(finalParams, el);
  const maximizeHandler = getMaximizeHandler(finalParams, el);
  const instance = {
    window: el,
    params: finalParams,
    moveHandler,
    maximizeHandler,
    isMoveHandlerEqualWindow: isMoveHandlerEqualWindow(el, moveHandler),
  };

  /* 一些杂项的处理 */
  el.addEventListener(startEvent, () => {
    ignoreIframe(el); // 由于iframe会把moveEvent吃掉，因此需要忽略掉iframe;
    el.addEventListener(
      endEvent,
      () => {
        recoverIframe(el); // 恢复iframe的功能
      },
      { once: true }
    );
  });

  /* 拖拽移动相关 */
  if (finalParams.movable) {
    moveHandler.addEventListener(
      startEvent,
      handleStartEventForMove.bind(instance)
    );

    /* 当处在moving状态的时候，吞掉click事件 */
    moveHandler.addEventListener('click', event => {
      if (moveHandler.className.indexOf('moving') > -1) {
        event.stopImmediatePropagation();
      }
    });
  }

  /* resize相关 */
  if (finalParams.resizable) {
    el.addEventListener(startEvent, handleStartEventForResize.bind(instance));
    el.addEventListener(moveEvent, cursorChange.bind(instance));
  }

  /* 最大化相关 */
  if (maximizeHandler) {
    addMaximizeEvent.call(instance, maximizeHandler);
  }

  /* 当处在resizing/moving状态的时候，吞掉click事件 */
  el.addEventListener('click', event => {
    if (
      el.className.indexOf('moving') > -1 ||
      el.className.indexOf('resizing') > -1
    ) {
      event.stopImmediatePropagation();
    }
  });
}
