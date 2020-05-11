import bootstrap from './bootstrap'
import { visitUser, pageTitre } from './custom-variables'

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
      const matomo = window.Piwik.getTracker(
        `${options.host}/${options.trackerFileName}.php`,
        options.siteId
      )

      matomo.customVariableVisitUser = visitUser(matomo)
      matomo.customVariablePageTitre = pageTitre(matomo)

      // Assign matomo to Vue
      Vue.prototype.$matomo = matomo

      if (options.requireConsent) {
        matomo.requireConsent()
      }

      if (options.enableHeartBeatTimer) {
        matomo.enableHeartBeatTimer()
      }

      if (options.enableLinkTracking) {
        matomo.enableLinkTracking(options.enableLinkTracking)
        matomo.setDownloadExtensions('csv|odt|xlsx|geojson')
      }

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

          // la page titre défini des variables personnalisées qui dépendent des données du titre
          // ces données ne sont pas encore chargées ici
          // pour cette page uniquement, le tracker est donc appelé dans le composant 'titre'

          matomo.customVariableVisitUser(options.store.state.user.current)
          matomo.trackPageView(name)
        })
      }
    })
    .catch(e => {})
}
