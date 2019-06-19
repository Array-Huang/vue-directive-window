import Vue from 'vue';
import { startEvent, moveEvent } from './libs/common';
import { handleStartEventForResize, cursorChange } from './libs/resize';
import { handleStartEventForMove } from './libs/move';
import { addMaximizeEvent } from './libs/maximize';
import { validate } from './libs/validate';

const DEFAULT_PARAMS = {
  minWidth: 100,
  maxWidth: null,
  minHeight: 100,
  maxHeight: null,
  customMoveHandler: null,
  customMaximizeHandler: null,
};

function _prepareParams(customParams) {
  validate(customParams);
  return Object.assign({}, DEFAULT_PARAMS, customParams);
}

Vue.directive('window', {
  bind(el, binding) {
    const customParams = binding.value; // 从指令绑定值取来参数
    const finalParams = _prepareParams(customParams);
    const moveHandler = finalParams.customMoveHandler
      ? el.querySelector(finalParams.customMoveHandler)
      : el;
    const maximizeHandler = finalParams.customMaximizeHandler
      ? el.querySelector(finalParams.customMaximizeHandler)
      : el;
    const instance = {
      window: el,
      params: finalParams,
      moveHandler,
      maximizeHandler,
    };

    /* 拖拽移动相关 */
    moveHandler.addEventListener(
      startEvent,
      handleStartEventForMove.bind(instance)
    );

    /* 拖拽调整大小相关 */
    if (!el.style.position || el.style.position === 'static') {
      el.style.position = 'relative';
    }

    el.addEventListener(startEvent, handleStartEventForResize.bind(instance));
    el.addEventListener(moveEvent, cursorChange.bind(instance));

    /* 最大化相关 */
    if (maximizeHandler) {
      addMaximizeEvent.call(instance, maximizeHandler);
    }
  },
});
