import './css/styles.css'
import Vue from 'vue'
import App from './app.vue'
import VueCookies from 'vue-cookies'

import router from '@/router'
import store from '@/store'

Vue.config.productionTip = false

Vue.use(VueCookies)

Vue.filter('dateFormat', date => {
  const d = new Date(Date.parse(date))
  var dd = d.getDate()
  var mm = d.getMonth() + 1
  var yyyy = d.getFullYear()
  return `${dd} . ${mm} . ${yyyy}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
