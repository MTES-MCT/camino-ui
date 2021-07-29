import {
  leafletMarkerClusterGroupBuild,
  leafletCoordinatesFind,
  leafletGeojsonCenterFind,
  leafletGeojsonBuild,
  leafletMarkerBuild,
  leafletIconBuild
} from '../_map/leaflet.js'

const zones = [
  {
    id: 'fr',
    name: 'Métropole',
    type: 'LineString',
    coordinates: [
      [-5, 41],
      [10, 51]
    ]
  },
  {
    id: 'gf',
    name: 'Guyane',
    type: 'LineString',
    coordinates: [
      [-55, 4],
      [-50, 7]
    ]
  },
  {
    id: 'oi',
    name: 'Océan Indien',
    type: 'LineString',
    coordinates: [
      [39, -23],
      [58, -13]
    ]
  },
  {
    id: 'an',
    name: 'Antilles',
    type: 'LineString',
    coordinates: [
      [-64, 15],
      [-59, 16]
    ]
  }
]

const clustersBuild = domaines =>
  domaines.reduce((clusters, { id }) => {
    const divIconOptions = {
      html: id.toUpperCase(),
      className: `py-xs px-s pill small mono color-bg bold bg-domaine-${id}`,
      iconSize: null,
      iconAnchor: [0, 0]
    }

    clusters[id] = leafletMarkerClusterGroupBuild(divIconOptions)

    return clusters
  }, {})

const domainesColors = {
  c: '#b88847',
  f: '#4a515d',
  g: '#c94f17',
  h: '#c2266a',
  i: '#aaaaaa',
  m: '#376faa',
  r: '#a0aa31',
  s: '#7657b5',
  w: '#1ea88c'
}

const iconUrlFind = domaineId => {
  const iconSvg = `<svg width="32" height="40" xmlns="http://www.w3.org/2000/svg"><style>text {font-family:'Lucida Sans Typewriter', monaco, 'Lucida Console', monospace; font-weight:700;}</style><polygon points="16,40 24,30 8,30" fill="white" /><ellipse ry="16" rx="16" cy="16" cx="16" stroke-width="1" stroke="white" fill="${
    domainesColors[domaineId]
  }"/><text xml:space="preserve" text-anchor="middle" font-size="13" y="21" x="16" fill="white">${domaineId.toUpperCase()}</text></svg>`

  return 'data:image/svg+xml;base64,' + btoa(iconSvg)
}

const layersBuild = (titres, router) =>
  titres.reduce(
    ({ geojsons, markers }, titre) => {
      if (!titre.geojsonMultiPolygon && !titre.geojsonCentre)
        return { geojsons, markers }

      const domaineId = titre.domaine.id
      const icon = leafletIconBuild({
        iconUrl: iconUrlFind(domaineId),
        iconSize: [32, 40],
        iconAnchor: [16, 40]
      })

      const latLng = titre.geojsonCentre
        ? leafletCoordinatesFind(titre.geojsonCentre)
        : leafletGeojsonCenterFind(titre.geojsonMultiPolygon)

      const marker = leafletMarkerBuild(latLng, icon)

      const popupHtmlTitulaires =
        titre.titulaires && titre.titulaires.length
          ? titre.titulaires.map(tt => `<li>${tt.nom}</li>`).join('')
          : ''

      const popupHtml = `<h4 class="mb-s">${titre.nom}</h4><div class="mb-m"><span class="rnd py-xxs px-s cap-first mb-0 bold color-bg h6 bg-${titre.statut.couleur}">${titre.statut.nom}</span></div><ul class="list-prefix h6">${popupHtmlTitulaires}</ul>`

      const popupOptions = {
        closeButton: false,
        offset: [0, -24],
        autoPan: false
      }

      const titreRoute = { name: 'titre', params: { id: titre.slug } }

      const methods = {
        click() {
          router.push(titreRoute)
        },
        mouseover(e) {
          this.openPopup()
        },
        mouseout(e) {
          this.closePopup()
        }
      }

      marker.id = titre.id
      marker.domaineId = domaineId
      marker.bindPopup(popupHtml, popupOptions)
      marker.on(methods)

      const className = `svg-fill-pattern-${titre.type.type.id}-${domaineId}`
      const geojsonOptions = {
        style: { fillOpacity: 0.75, weight: 1, color: 'white', className },
        onEachFeature: (feature, layer) => {
          layer.bindPopup(popupHtml, popupOptions)
          layer.on(methods)
        }
      }

      const geojson = leafletGeojsonBuild(
        titre.geojsonMultiPolygon,
        geojsonOptions
      )

      if (marker) {
        markers.push(marker)
      }

      geojsons[titre.id] = geojson

      return { geojsons, markers }
    },
    { geojsons: {}, markers: [] }
  )

export { zones, clustersBuild, layersBuild }
