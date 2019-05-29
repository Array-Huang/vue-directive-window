import Vue from 'vue';
import { startEvent } from './libs/common';
import { addResizeHandler, handleStartEventForResize } from './libs/resize';
import { handleStartEventForMove } from './libs/move';
import { addMaximizeEvent } from './libs/maximize';
import { validate } from './libs/validate';

const DEFAULT_PARAMS = {
  minWidth: 100,
  maxWidth: null,
  minHeight: 100,
  maxHeight: null,
  resizeHandlerClassName: 'window-resize-handler',
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
    const instance = {
      window: el,
      params: finalParams,
    };

    /* 拖拽移动相关 */
    let resizeHandler = el;

    if (finalParams.customMoveHandler) {
      resizeHandler = el.querySelector(finalParams.customMoveHandler);
    }
    resizeHandler.addEventListener(
      startEvent,
      handleStartEventForMove.bind(instance)
    );

    /* 拖拽调整大小相关 */
    if (!el.style.position || el.style.position === 'static') {
      el.style.position = 'relative';
    }
    addResizeHandler(el, instance.params.resizeHandlerClassName);
    el.querySelector(
      '.' + instance.params.resizeHandlerClassName
    ).addEventListener(startEvent, handleStartEventForResize.bind(instance));

    /* 最大化相关 */
    if (finalParams.customMaximizeHandler) {
      const maximizeHandler = el.querySelector(
        finalParams.customMaximizeHandler
      );
      addMaximizeEvent.call(instance, maximizeHandler);
    }
  },
});
