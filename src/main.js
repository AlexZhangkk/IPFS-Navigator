import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import draggable from 'vuedraggable'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/font_1857413_oucnjlseaig/iconfont.css';


import './assets/init.css'
import './globalComponents'
import Axios from 'axios'
import vueConfig from '../vue.config';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI);
Vue.use(draggable)
Vue.config.productionTip = false


Vue.prototype.$EventBus = new Vue() //事件bus
Vue.prototype.$axios = Axios;//挂载axios
//配置公共API的 URL
Axios.defaults.withCredentials = true // 允许携带cookie
// Axios.defaults.baseURL = 'https://msearch.bytebase.cn'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
