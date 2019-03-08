import axios from 'axios'
import store from '@/store'
import Vue from 'vue'

const http = axios.create()

http.defaults.baseURL = 'http://localhost:18080'
http.defaults.timeout = 5000
http.defaults.headers['content-type'] = 'application/json;charset=UTF-8'

http.interceptors.request.use((config) => {
  /**
   * 添加默认工作空间标识
   * @type {null}
   */
  let nws = store.state.currentWorkspace
  if (nws) {
    config.headers['workspace'] = nws['kid']
    config.headers['application'] = nws['application']
  }

  if (config.method === 'post') {
    config.data = JSON.stringify(config.data)
  }

  return config
})

http.interceptors.response.use(response => {
  return response
}, error => {
  Vue.prototype.$toast.error(error.message)
})

export default http
