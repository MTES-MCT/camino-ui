import 'leaflet'
import 'leaflet.markercluster'
const L = window.L

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
    const cluster = L.markerClusterGroup({
      iconCreateFunction(cluster) {
        const childCount = cluster.getChildCount()

        let size
        if (childCount < 5) size = 'xs'
        else if (childCount < 15) size = 's'
        else if (childCount < 40) size = 'm'
        else size = 'l'

        return new L.DivIcon({
          html: id,
          className: `py-xs px-s pill h6 mono color-bg cap bold bg-titre-domaine-${id} shadow-drop leaflet-marker-cluster-${size}`,
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

    return Object.assign(clusters, { [id]: cluster })
  }, {})

const layersBuild = (titres, router) =>
  titres.reduce(
    ({ geojsons, markers }, titre) => {
      if (!titre.geojsonMultiPolygon) return { geojsons, markers }

      const domaineId = titre.domaine.id
      const icon = L.divIcon({
        className: `leaflet-marker-camino py-xs px-s pill h6 mono color-bg cap bold border-bg bg-titre-domaine-${domaineId} shadow-drop`,
        html: domaineId,
        iconSize: null,
        iconAnchor: [15.5, 38]
      })

      const popupHtml = `<h4 class="mb-s">${titre.nom}</h4>`

      const popupOptions = {
        closeButton: false,
        offset: [0, -24],
        autoPan: false
      }

      const titreRoute = {
        name: 'titre',
        params: { id: titre.id }
      }

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

      let marker

      const className = `svg-fill-pattern-${titre.type.type.id}-${domaineId}`

      const geojson = L.geoJSON(titre.geojsonMultiPolygon, {
        style: {
          fillOpacity: 0.75,
          weight: 1,
          color: 'white',
          className
        },
        onEachFeature: (feature, layer) => {
          marker = L.marker(
            L.geoJSON(feature)
              .getBounds()
              .getCenter(),
            { icon }
          )
          marker.id = titre.id
          marker.domaineId = domaineId

          layer.bindPopup(popupHtml, popupOptions)
          layer.on(methods)

          marker.bindPopup(popupHtml, popupOptions)
          marker.on(methods)
        }
      })

      markers.push(marker)

      return {
        geojsons: Object.assign(geojsons, { [titre.id]: geojson }),
        markers
      }
    },
    { geojsons: {}, markers: [] }
  )

const tilesBuild = tiles =>
  tiles.type === 'wms'
    ? L.tileLayer.wms(tiles.url, {
        layers: tiles.layers,
        format: 'image/png',
        attribution: tiles.attribution
      })
    : L.tileLayer(tiles.url, {
        attribution: tiles.attribution
      })

const geojsonBoundsGet = zone => L.geoJSON(zone).getBounds()

export { zones, clustersBuild, layersBuild, tilesBuild, geojsonBoundsGet }
