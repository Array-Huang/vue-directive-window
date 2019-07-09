import 'core-js/es7/object';
import 'core-js/es6/symbol';
import { eventBinding } from './libs/event-binding';
/* vue-directive-window，提供Vue.use方式安装，安装后将可使用v-title这一自定义指令 */
function install(Vue) {
  Vue.directive('window', {
    bind(el, binding) {
      const customParams = binding.value; // 从指令绑定值取来参数
      eventBinding(el, customParams);
    },
  });
}
/* EnhancedWindow，提供普通函数的方式来调用  */
function enhanceWindow(el, customParams) {
  eventBinding(el, customParams);
}

export default {
  install,
  enhanceWindow,
};
