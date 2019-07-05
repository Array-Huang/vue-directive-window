import { eventBinding } from './libs/event-binding';
/* 供vue-directive-window */
function install(Vue) {
  Vue.directive('window', {
    bind(el, binding) {
      const customParams = binding.value; // 从指令绑定值取来参数
      eventBinding(el, customParams);
    },
  });
}
/* 供EnhancedWindow */
function enhanceWindow(el, customParams) {
  eventBinding(el, customParams);
}

export default {
  install,
  enhanceWindow,
};
