import './css/styles.css'
import Vue from 'vue'
import VueMatomo from 'vue-matomo'
import App from './app.vue'

import router from './router'
import store from './store'
import mixins from './mixins'

import { dateFormat } from './utils'

Vue.config.productionTip = false

Vue.filter('dateFormat', dateFormat)

Vue.mixin(mixins)

Vue.use(VueMatomo, {
  host: 'https://stats.data.gouv.fr',
  siteId: 70,
  router,
  requireConsent: false,
  trackInitialView: true,
  trackerFileName: 'piwik'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
