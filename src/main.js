import './css/styles.css'
import Vue from 'vue'
import App from './app.vue'

import router from './router'
import store from './store'

import { dateFormat } from './utils'

Vue.config.productionTip = false

Vue.filter('dateFormat', dateFormat)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
