import './css/styles.css'
import Vue from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies'

import router from './router/index.js'
import store from './store/index.js'

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
