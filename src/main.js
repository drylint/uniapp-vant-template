import Vue from 'vue'
import store from '@/store'
import App from './App'
import '@/styles/index.scss'
import Toast from './wxcomponents/vant/toast/toast'
import Dialog from './wxcomponents/vant/dialog/dialog'
import * as utils from '@/utils'
Vue.config.productionTip = false
Vue.prototype.$Toast = Toast
Vue.prototype.$Dialog = Dialog
Vue.prototype.$utils = utils

App.mpType = 'app'

const app = new Vue({
  store,
  ...App,
})
app.$mount()
