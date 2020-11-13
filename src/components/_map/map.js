import 'leaflet'
import 'leaflet-gesture-handling'
import 'leaflet-fullscreen'

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
    renderer: L.canvas(),
    doubleClickZoom: false,
    minZoom: 1,
    gestureHandling: true,
    fullscreenControl: {
      pseudoFullscreen: true
    }
  })

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

const leafletScaleAdd = map => L.control.scale({ imperial: false }).addTo(map)

const leafletFeatureGroupGet = markers => new L.FeatureGroup(markers)

export {
  leafletMap,
  leafletTileLayerDefault,
  leafletScaleAdd,
  tilesBuild,
  leafletFeatureGroupGet
}
