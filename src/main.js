// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import routes from './routes'
import 'font-awesome/css/font-awesome.min.css'
import Axios from 'axios';
import Vuex from 'vuex';
import store from './vuex/store';
// import echarts from 'echarts';

Vue.config.productionTip = false;
Vue.prototype.$ajax = Axios;

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);


let Hub = new Vue(); //创建事件中心

const router = new VueRouter({
  routes
});


router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = sessionStorage.getItem('user');
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
});


new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app');
