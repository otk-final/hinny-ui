// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import api from './api'
import 'vuetify/dist/vuetify.min.css'
import vuetify from 'vuetify'
import {api, http} from './api'

/**
 * 插件
 */
Vue.use(vuetify)
Vue.prototype.$api = api

/* eslint-disable no-new */
new Vue({
  el: '#app',
  api,
  http,
  router,
  store,
  components: {App},
  template: '<App/>'
})
