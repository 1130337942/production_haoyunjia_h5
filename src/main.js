import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from '../node_modules/axios'
// import store from  './vuex'

import cookie from 'js-cookie';
Vue.prototype.$cookie = cookie; 

Vue.prototype.$axios = axios;
import api from './api/api';

import {
  NavBar,
  NumberKeyboard,
  PasswordInput,
  CellGroup,
  Field,
  Button,
  Toast,
  Checkbox, 
  CheckboxGroup,
  Dialog,
} from 'vant';
Vue.use(NavBar)
.use(NumberKeyboard)  
.use(PasswordInput)
.use(Field)
.use(Button)
.use(Toast)
.use(Checkbox)
.use(CheckboxGroup)
.use(Dialog)
.use(CellGroup);

import '@/Style/api.css'

Vue.config.productionTip = false

// 根据路由设置标题
// router.beforeEach((to, from, next) => {
//   /*路由发生改变修改页面的title */
//   if(to.meta.title) {
//     document.title = to.meta.title
//   }
//   next();
// })

new Vue({
  el: '#app',
  router,
  axios,
  api,
  // store,
  render: h => h(App),
}).$mount('#app')