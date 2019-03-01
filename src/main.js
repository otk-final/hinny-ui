// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'vuetify/dist/vuetify.min.css'
import vuetify from 'vuetify'
import {api, http} from './api'
import toast from '@/components/toast.js'

/**
 * 插件
 */
Vue.use(vuetify)
Vue.use(toast)

Vue.prototype.$api = api
Vue.prototype.$http = http

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
