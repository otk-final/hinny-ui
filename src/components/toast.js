import snackbar from '@/components/common/snackbar.vue'

const Toast = {}

Toast.install = function (Vue) {
  let SnackbarExt = Vue.extend(snackbar)
  let instance = new SnackbarExt()
  let vm = instance.$mount()

  document.body.appendChild(vm.$el)

  Vue.prototype.$toast = {
    success (text, callback) {
      instance.show('success', text, callback)
    },
    info (text, callback) {
      instance.show('info', text, callback)
    },
    error (text, callback) {
      instance.show('error', text, callback)
    }
  }
}
export default Toast
