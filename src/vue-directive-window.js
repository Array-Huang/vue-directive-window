import Vue from 'vue';
import { startEvent } from './libs/common';
import { addResizeHandler, handleStartEventForResize } from './libs/resize';
import { handleStartEventForMove } from './libs/move';
import { validate } from './libs/validate';

const DEFAULT_PARAMS = {
  minWidth: 100,
  maxWidth: null,
  minHeight: 100,
  maxHeight: null,
  resizeHandlerClassName: 'window-resize-handler',
};

function _prepareParams(customParams) {
  validate(customParams);
  return Object.assign({}, DEFAULT_PARAMS, customParams);
}

Vue.directive('window', {
  startPoint: {},
  bind(el, binding) {
    const customParams = binding.value;
    const instance = {
      params: _prepareParams(customParams), // 从指令绑定值取来参数
    };

    /* 拖拽移动相关 */
    el.addEventListener(startEvent, handleStartEventForMove.bind(instance));
    /* 拖拽调整大小相关 */
    if (!el.style.position || el.style.position === 'static') {
      el.style.position = 'relative';
    }
    addResizeHandler(el, instance.params.resizeHandlerClassName);
    el.querySelector(
      '.' + instance.params.resizeHandlerClassName
    ).addEventListener(startEvent, handleStartEventForResize.bind(instance));
  },
});
