import './css/styles.css'
import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import * as SentryIntegrations from '@sentry/integrations'

import VueMatomo from './stats'
import App from './app.vue'

import router from './router'
import store from './store'
import mixins from './mixins'

import { dateFormat } from './utils'

import * as flexibility from 'flexibility'

/* global npmVersion */
if (process.env.VUE_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.VUE_APP_SENTRY_DSN,
    integrations: [
      new SentryIntegrations.Vue({
        Vue,
        attachProps: true
      }),
      new SentryIntegrations.RewriteFrames()
    ],
    // eslint-disable-next-line camelcase
    release: `camino-ui-${npmVersion}`
  })
}

Vue.config.productionTip = false

Vue.filter('dateFormat', dateFormat)

Vue.mixin(mixins)

if (process.env.VUE_APP_MATOMO_HOST && process.env.VUE_APP_MATOMO_SITE_ID) {
  Vue.use(VueMatomo, {
    host: process.env.VUE_APP_MATOMO_HOST,
    siteId: process.env.VUE_APP_MATOMO_SITE_ID,
    router,
    store,
    requireConsent: false,
    trackInitialView: true,
    trackerFileName: 'piwik',
    enableHeartBeatTimer: true,
    enableLinkTracking: true
  })
}

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// only available during E2E tests
if (window.Cypress) {
  window.app = app
}

flexibility(document.documentElement)
