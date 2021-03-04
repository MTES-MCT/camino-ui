import L from 'leaflet'

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

const clusterBuild = domaineId =>
  L.markerClusterGroup({
    iconCreateFunction(cluster) {
      const childCount = cluster.getChildCount()

      let size
      if (childCount < 5) size = 'xs'
      else if (childCount < 15) size = 's'
      else if (childCount < 40) size = 'm'
      else size = 'l'

      return new L.DivIcon({
        html: domaineId.toUpperCase(),
        className: `py-xs px-s pill small mono color-bg bold bg-domaine-${domaineId} leaflet-marker-cluster-${size}`,
        iconSize: null,
        iconAnchor: [0, 0]
      })
    },
    disableClusteringAtZoom: 10,
    animate: true,
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    maxClusterRadius(x) {
      return 2048 / Math.pow(x, 2)
    }
  })

const clustersBuild = domaines =>
  domaines.reduce((clusters, { id }) => {
    clusters[id] = clusterBuild(id)

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

const markerPositionFind = titre => {
  if (titre.geojsonCentre) {
    const coordinates = titre.geojsonCentre.geometry.coordinates
    return {
      lng: coordinates[0],
      lat: coordinates[1]
    }
  }

  if (titre.geojsonMultiPolygon) {
    return L.geoJSON(titre.geojsonMultiPolygon)
      .getBounds()
      .getCenter()
  }
}

const layersBuild = (titres, router) =>
  titres.reduce(
    ({ geojsons, markers }, titre) => {
      if (!titre.geojsonMultiPolygon && !titre.geojsonCentre)
        return { geojsons, markers }

      const domaineId = titre.domaine.id
      const icon = L.icon({
        iconUrl: iconUrlFind(domaineId),
        iconSize: [32, 40],
        iconAnchor: [16, 40]
      })
      const popupHtmlTitulaires =
        titre.titulaires && titre.titulaires.length
          ? titre.titulaires.map(tt => `<li>${tt.nom}</li>`).join('')
          : ''

      const popupHtml = `<h4 class="mb-s">${titre.nom}</h4><div class="mb-m"><span class="rnd py-xxs px-s cap-first mb-0 bold color-bg h5 bg-${titre.statut.couleur}">${titre.statut.nom}</span></div><ul class="list-prefix h5">${popupHtmlTitulaires}</ul>`

      const popupOptions = {
        closeButton: false,
        offset: [0, -24],
        autoPan: false
      }

      const titreRoute = { name: 'titre', params: { id: titre.id } }

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

      const markerPosition = markerPositionFind(titre)
      const marker = L.marker(markerPosition, { icon })

      marker.id = titre.id
      marker.domaineId = domaineId
      marker.bindPopup(popupHtml, popupOptions)
      marker.on(methods)

      const className = `svg-fill-pattern-${titre.type.type.id}-${domaineId}`
      const geojson = L.geoJSON(titre.geojsonMultiPolygon, {
        style: { fillOpacity: 0.75, weight: 1, color: 'white', className },
        onEachFeature: (feature, layer) => {
          layer.bindPopup(popupHtml, popupOptions)
          layer.on(methods)
        }
      })

      if (marker) {
        markers.push(marker)
      }

      geojsons[titre.id] = geojson

      return { geojsons, markers }
    },
    { geojsons: {}, markers: [] }
  )

const geojsonBoundsGet = zone => L.geoJSON(zone).getBounds()

export { zones, clustersBuild, layersBuild, geojsonBoundsGet }
