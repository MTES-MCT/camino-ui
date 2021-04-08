import 'leaflet'
import 'leaflet.markercluster'
import 'leaflet-gesture-handling'
import 'leaflet-fullscreen'
import 'leaflet-markers-canvas'

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

const L = window.L

L.Marker.prototype.options.icon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
})

const leafletTileLayerDefault = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 20,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }
)

const leafletMap = map =>
  L.map(map, {
    // zoomControl: true,
    doubleClickZoom: false,
    minZoom: 1,
    gestureHandling: true,
    fullscreenControl: {
      pseudoFullscreen: true
    }
  })

const leafletTilesBuild = tiles =>
  tiles.type === 'wms'
    ? L.tileLayer.wms(tiles.url, {
        layers: tiles.layers,
        format: 'image/png',
        attribution: tiles.attribution
      })
    : L.tileLayer(tiles.url, {
        attribution: tiles.attribution
      })

const leafletScaleBuild = () => L.control.scale({ imperial: false })

const leafletFeatureGroupGet = markers => new L.FeatureGroup(markers)

const leafletCanvasLayerBuild = options => new L.MarkersCanvas(options)

const leafletMarkerBuild = (latLng, icon) => L.marker(latLng, { icon })

const leafletGeojsonBuild = (geojson, options) => L.geoJSON(geojson, options)

const leafletMarkerClusterGroupBuild = divIconOptions =>
  L.markerClusterGroup({
    iconCreateFunction(cluster) {
      const childCount = cluster.getChildCount()

      let size
      if (childCount < 5) size = 'xs'
      else if (childCount < 15) size = 's'
      else if (childCount < 40) size = 'm'
      else size = 'l'

      divIconOptions.className += ` leaflet-marker-cluster-${size}`

      return new L.DivIcon(divIconOptions)
    },
    disableClusteringAtZoom: 10,
    animate: true,
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    maxClusterRadius(x) {
      return 2048 / Math.pow(x, 2)
    }
  })

const leafletGeojsonCenterFind = geojson =>
  L.geoJSON(geojson).getBounds().getCenter()

const leafletCoordinatesFind = geojson => {
  const coordinates = geojson.geometry.coordinates

  return {
    lng: coordinates[0],
    lat: coordinates[1]
  }
}

const leafletDivIconBuild = divIconOptions => L.divIcon(divIconOptions)
const leafletIconBuild = iconOptions => L.icon(iconOptions)
const leafletGeojsonBoundsGet = zone => L.geoJSON(zone).getBounds()

export {
  leafletMap,
  leafletTileLayerDefault,
  leafletScaleBuild,
  leafletTilesBuild,
  leafletFeatureGroupGet,
  leafletCanvasLayerBuild,
  leafletMarkerBuild,
  leafletGeojsonBuild,
  leafletMarkerClusterGroupBuild,
  leafletCoordinatesFind,
  leafletGeojsonCenterFind,
  leafletGeojsonBoundsGet,
  leafletDivIconBuild,
  leafletIconBuild
}
