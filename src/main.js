import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 导入 element 组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 导入基本样式结构
import 'styles/bass.scss';

// 挂载 element 组件
Vue.use(ElementUI);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
