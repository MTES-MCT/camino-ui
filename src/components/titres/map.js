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
          html: id.toUpperCase(),
          className: `py-xs px-s pill h6 mono color-bg bold bg-titre-domaine-${id} leaflet-marker-cluster-${size}`,
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

const TitreIcon = L.Icon.extend({
  options: {
    iconSize: new L.Point(30, 37),
    iconAnchor: [15, 37],
    color: '#8ED6FF',
    domaineId: ''
  },

  ctx: null,

  createIcon: function() {
    const e = document.createElement('canvas')
    this._setIconStyles(e, 'icon')
    const s = this.options.iconSize

    e.width = s.x
    e.height = s.y

    this.ctx = e.getContext('2d')
    this.draw(this.ctx, s.x, s.y)

    return e
  },

  draw: function(ctx, w, h) {
    if (!ctx) return

    ctx.clearRect(0, 0, w, h)

    // dessine le petit triangle en dessous
    ctx.beginPath()
    ctx.moveTo(5, h / 2)
    ctx.lineTo(w / 2, h)
    ctx.lineTo(w - 5, h / 2)
    ctx.lineTo(5, h / 2)
    ctx.fillStyle = 'white'
    ctx.fill()
    ctx.strokeStyle = 'white'
    ctx.stroke()
    ctx.closePath()

    // dessine le rond de la couleur du domaine
    ctx.beginPath()
    ctx.arc(w / 2, w / 2, w / 2, 0, 2 * Math.PI)
    ctx.fillStyle = this.options.color
    ctx.fill()
    ctx.strokeStyle = 'white'
    ctx.stroke()
    ctx.closePath()

    // dessine la lettre représentant le domaine au milieu du rond
    ctx.font = '13px Lucida Sans Typewriter, monaco, Lucida Console, monospace'
    ctx.fontWeight = 700
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(this.options.domaineId.toUpperCase(), w / 2, w / 2 + 5)
  }
})

const titreMarker = (pos, domaineId, options = {}) => {
  let color
  if (domaineId === 'c') {
    color = '#b88847'
  } else if (domaineId === 'f') {
    color = '#4a515d'
  } else if (domaineId === 'g') {
    color = '#c94f17'
  } else if (domaineId === 'h') {
    color = '#c2266a'
  } else if (domaineId === 'm') {
    color = '#376faa'
  } else if (domaineId === 'r') {
    color = '#a0aa31'
  } else if (domaineId === 's') {
    color = '#7657b5'
  } else if (domaineId === 'w') {
    color = '#1ea88c'
  }

  options.icon = new TitreIcon({ color, domaineId })

  return new L.Marker(pos, options)
}

const layersBuild = (titres, router) =>
  titres.reduce(
    ({ geojsons, markers }, titre) => {
      if (!titre.geojsonMultiPolygon) return { geojsons, markers }

      const domaineId = titre.domaine.id

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
          marker = titreMarker(
            L.geoJSON(feature)
              .getBounds()
              .getCenter(),
            domaineId
          )
          marker.id = titre.id
          marker.domaineId = domaineId

          layer.bindPopup(popupHtml, popupOptions)
          layer.on(methods)

          marker.bindPopup(popupHtml, popupOptions)
          marker.on(methods)
        }
      })

      if (marker) {
        markers.push(marker)
      }

      return {
        geojsons: Object.assign(geojsons, { [titre.id]: geojson }),
        markers
      }
    },
    { geojsons: {}, markers: [] }
  )

const geojsonBoundsGet = zone => L.geoJSON(zone).getBounds()

export { zones, clustersBuild, layersBuild, geojsonBoundsGet }
