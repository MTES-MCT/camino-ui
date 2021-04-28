import './styles/styles.css'
import { createApp } from 'vue'
import { sync } from 'vuex-router-sync'
import * as Sentry from '@sentry/browser'
import * as SentryIntegrations from '@sentry/integrations'

import VueMatomo from './stats'
import App from './app.vue'

import router from './router'
import store from './store'

import { ResizeObserver as Polyfill } from '@juggle/resize-observer'

// le polyfill ResizeObserver est nécessaire pour chart.js sur Firefox 60
// on devrait pourvoir l'injecter dans vite.config, mais ça ne marche pas…
// plugins.legacy({additionalLegacyPolyfills: ['@juggle/resize-observer']})

if (!window.ResizeObserver) window.ResizeObserver = Polyfill

const app = createApp(App)
sync(store, router)

if (import.meta.env.PROD) {
  fetch('/sentryOptions')
    .then(response => response.json())
    .then(options => {
      if (!options.dsn) throw new Error('dsn manquant')
      Sentry.init({
        dsn: options.dsn,
        environment: options.environment ? options.environment : 'production',
        autoSessionTracking: false,
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

app.use(router)

app.use(store)

app.mount('app-root')
