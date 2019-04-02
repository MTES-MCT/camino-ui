import './css/styles.css'
import Vue from 'vue'
import * as Sentry from '@sentry/browser'

import VueMatomo from './stats'
import App from './app.vue'

import router from './router'
import store from './store'
import mixins from './mixins'

import { dateFormat } from './utils'

/* global npmVersion */
// if (process.env.VUE_APP_SENTRY_DSN) {
//   Sentry.init({
//     dsn: process.env.VUE_APP_SENTRY_DSN,
//     integrations: [
//       new Sentry.Integrations.Vue({ Vue }),
//       new Sentry.Integrations.RewriteFrames()
//     ],
//     // eslint-disable-next-line camelcase
//     release: `camino-ui-${npmVersion}`
//   })
// }

Vue.config.productionTip = false

Vue.filter('dateFormat', dateFormat)

Vue.mixin(mixins)

if (process.env.VUE_APP_MATOMO_HOST) {
  Vue.use(VueMatomo, {
    host: process.env.VUE_APP_MATOMO_HOST,
    siteId: 70,
    router,
    requireConsent: false,
    trackInitialView: true,
    trackerFileName: 'piwik'
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
