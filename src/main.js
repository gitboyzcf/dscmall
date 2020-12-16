import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//使用组件库
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';//可以在js中引入css文件
// 使用
Vue.use(MintUI);

//一个用于移动端的可触摸滑动具有回弹效果的可复用Vue组件
import LyTab from 'ly-tab';
Vue.use(LyTab);

// 使用Swiper组件
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';
Vue.use(VueAwesomeSwiper);


// 导入暴露的路由js文件
import router from "./route/router.js";
// 引入状态管理store
import store from "./store/index.js";

// js文件的入口
new Vue({
  // 挂载配置路由
  router,
	store, //挂载store
  render: h => h(App),
}).$mount('#app') // 相当于el:"#app" 编译完成挂载该组件
