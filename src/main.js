import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 导入 element 组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 导入自定义组件
import AdBreadcrumb from 'components/hi-breadcrumb.vue';
import HiTable from 'components/hi-table.vue';
import HiButton from 'components/hi-button.vue';

// 导入基本样式结构
import 'styles/bass.scss';

// 挂载 element 组件
Vue.use(ElementUI);

// 创建过滤器
Vue.filter('addBaseURL', value => {
  return 'http://123.57.202.238:8090' + value;
})

// 挂载自定义组件
Vue.component('ad-breadcrumb', AdBreadcrumb);
Vue.component('hi-table', HiTable);
Vue.component('hi-button', HiButton);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
