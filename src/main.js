import './styles/styles.css'
import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import * as SentryIntegrations from '@sentry/integrations'

import VueMatomo from './stats'
import App from './app.vue'

import router from './router'
import store from './store'
import mixins from './mixins'

import { dateFormat } from './utils'

if (process.env.NODE_ENV === 'production') {
  fetch('/sentryDsn')
    .then(response => response.text())
    .then(dsn => {
      if (!dsn) throw new Error('Pas de DSN Sentry')
      Sentry.init({
        dsn,
        integrations: [
          new SentryIntegrations.Vue({
            Vue,
            attachProps: true
          }),
          new SentryIntegrations.RewriteFrames()
        ],
        /* global npmVersion */
        // @ts-ignore
        release: `camino-ui-${npmVersion}`
      })
    })
    .catch(e => console.error('Impossible d’initialiser Sentry', e))

  fetch('/matomoOptions')
    .then(response => response.json())
    .then(options => {
      if (!options || !options.host || !options.siteId)
        throw new Error('"host" et/ou "siteId" manquant')
      Vue.use(VueMatomo, {
        host: options.host,
        siteId: options.siteId,
        router,
        store,
        requireConsent: false,
        trackInitialView: true,
        trackerFileName: 'piwik',
        enableHeartBeatTimer: true,
        enableLinkTracking: true
      })
    })
    .catch(e => console.error('Impossible d’initialiser Matomo', e))
}
Vue.config.productionTip = false

Vue.filter('dateFormat', dateFormat)

Vue.mixin(mixins)

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// only available during E2E tests
if (window.Cypress) {
  window.app = app
}
