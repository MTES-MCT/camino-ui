import bootstrap from './bootstrap'
import { visit, page } from './custom-variables'

const defaultOptions = {
  requireConsent: false,
  trackInitialView: true,
  trackerFileName: 'piwik',
  enableHeartBeatTimer: false,
  enableLinkTracking: false,
  heartBeatTimerInterval: 60
}

export default function install(Vue, setupOptions = {}) {
  const options = Object.assign({}, defaultOptions, setupOptions)

  bootstrap(options)
    .then(() => {
      const { host, siteId, trackerFileName } = options
      const matomo = window.Piwik.getTracker(
        `${host}/${trackerFileName}.php`,
        siteId
      )

      // Assign matomo to Vue
      Vue.prototype.$piwik = matomo
      Vue.prototype.$matomo = matomo

      if (options.requireConsent) {
        matomo.requireConsent()
      }

      // Register first page view
      if (options.trackInitialView) {
        if (options.store) {
          visit(matomo, options.store)
        }
        matomo.trackPageView()
      }

      if (options.enableHeartBeatTimer) {
        matomo.enableHeartBeatTimer()
      }

      if (options.enableLinkTracking) {
        matomo.enableLinkTracking(options.enableLinkTracking)
      }

      // Track page navigations if router is specified
      if (options.router) {
        options.router.afterEach((to, from) => {
          // Unfortunately the window location is not yet updated here
          // We need to make our own ulr using the data provided by the router
          const loc = window.location

          // Protocol may or may not contain a colon
          let protocol = loc.protocol
          if (protocol.slice(-1) !== ':') {
            protocol += ':'
          }

          const url = protocol + '//' + loc.host + to.path
          matomo.setCustomUrl(url)

          // Déclaration des variables personnalisées
          if (options.store) {
            visit(matomo, options.store)
            page(matomo, options.store, to)
          }

          matomo.trackPageView(to.name)
        })
      }
    })
    .catch(e => {
      console.info(e)
    })
}
