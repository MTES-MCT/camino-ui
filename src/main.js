import './styles/styles.css'
import { createApp } from 'vue'
import * as Sentry from '@sentry/browser'
import * as SentryIntegrations from '@sentry/integrations'

import VueMatomo from './stats'
import App from './app.vue'

import router from './router'
import store from './store'


const app = createApp(App)

if (import.meta.env.PROD) {
  fetch('/sentryDsn')
    .then(response => response.text())
    .then(dsn => {
      if (!dsn) throw new Error('dsn manquant')
      Sentry.init({
        dsn,
        integrations: [
          new SentryIntegrations.Vue({
            Vue: app,
            attachProps: true
          }),
          new SentryIntegrations.RewriteFrames()
        ],
        /* global npmVersion */
        // @ts-ignore
        release: `camino-ui-${npmVersion}`
      })
    })
    .catch(e => console.error('erreur : Sentry :', e))

  fetch('/matomoOptions')
    .then(response => response.json())
    .then(options => {
      if (!options || !options.host || !options.siteId)
        throw new Error('host et/ou siteId manquant(s)')
      app.use(VueMatomo, {
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
    .catch(e => console.error('erreur : matomo :', e))
}


// // only available during E2E tests
// if (window.Cypress) {
//   window.app = app
// }


app.use(router)

app.use(store)

app.mount('app-root')
