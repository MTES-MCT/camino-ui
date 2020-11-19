/* global L */
import Rbush from 'rbush'

L.CanvasMarkers = L.Layer.extend({
  // Add event listeners to initialized section.
  initialize: function(options) {
    L.setOptions(this, options)
    this._onClickListeners = []
    this._onHoverListeners = []
    this._onMouseOverListeners = []
    this._onMouseOutListeners = []
    this._rawMarkers = []
    this._genericListenersMap = {}
  },

  setOptions: function(options) {
    L.setOptions(this, options)
    return this.redraw()
  },

  getBounds: function() {
    var bounds = new L.LatLngBounds()

    this._rawMarkers.forEach(marker => {
      bounds.extend(marker.getLatLng())
    })

    return bounds
  },

  redraw: function() {
    this._redraw(true)
  },

  // Multiple layers at a time for rBush performance
  addMarkers: function(markers) {
    console.log('addmarkers')
    var tmpMark = []
    var tmpLatLng = []

    console.log(this, this._rawMarkers)

    markers.forEach(marker => {
      if (!(marker.options.pane === 'markerPane' && marker.options.icon)) {
        console.error("Layer isn't a marker")

        return
      }

      console.log(this, this._map)
      this._rawMarkers.push(marker)
      var latlng = marker.getLatLng()
      var isDisplaying = this._map.getBounds().contains(latlng)
      var s = this._addMarker(marker, latlng, isDisplaying)

      // Only add to Point Lookup if we are on map
      if (isDisplaying === true) tmpMark.push(s[0])

      tmpLatLng.push(s[1])
    })

    this._markers.load(tmpMark)
    this._latlngMarkers.load(tmpLatLng)
  },

  // Adds single layer at a tithis. Less efficient for rBush
  addMarker: function(marker) {
    this._rawMarkers.push(marker)
    var latlng = marker.getLatLng()
    var isDisplaying = this._map.getBounds().contains(latlng)
    var dat = this._addMarker(marker, latlng, isDisplaying)

    // Only add to Point Lookup if we are on map
    if (isDisplaying === true) this._markers.insert(dat[0])

    this._latlngMarkers.insert(dat[1])
  },

  addLayer: function(layer) {
    if (layer.options.pane === 'markerPane' && layer.options.icon)
      this.addMarker(layer)
    else console.error("Layer isn't a marker")
  },

  addLayers: function(layers) {
    this.addMarkers(layers)
  },

  removeLayer: function(layer) {
    this.removeMarker(layer, true)
  },

  removeMarker: function(marker, redraw) {
    // If we are removed point
    if (marker.min_x) marker = marker.data

    var latlng = marker.getLatLng()
    var isDisplaying = this._map.getBounds().contains(latlng)

    var markerData = {
      min_x: latlng.lng,
      min_y: latlng.lat,
      max_x: latlng.lng,
      max_y: latlng.lat,
      data: marker
    }

    this._latlngMarkers.remove(markerData, (a, b) => {
      return a.data._leaflet_id === b.data._leaflet_id
    })

    this._latlngMarkers.total--
    this._latlngMarkers.dirty++

    if (isDisplaying === true && redraw === true) {
      this._redraw(true)
    }
  },

  onAdd: function(map) {
    console.log('onAdd')
    this._map = map

    if (!this._canvas) this._initCanvas()

    if (this.options.pane) this.getPane().appendChild(this._canvas)
    else map._panes.overlayPane.appendChild(this._canvas)

    map.on('moveend', this._reset, this)
    map.on('resize', this._reset, this)

    map.on('click', this._executeListeners, this)
    map.on('mousemove', this._executeListeners, this)

    if (map._zoomAnimated) {
      map.on('zoomanim', this._animateZoom, this)
    }
  },

  onRemove: function(map) {
    var me = this

    if (this.options.pane) this.getPane().removeChild(this._canvas)
    else map.getPanes().overlayPane.removeChild(this._canvas)

    map.off('click', this._executeListeners, this)
    map.off('mousemove', this._executeListeners, this)

    map.off('moveend', this._reset, this)
    map.off('resize', this._reset, this)

    if (map._zoomAnimated) {
      map.off('zoomanim', this._animateZoom, this)
    }

    Object.keys(this._genericListenersMap).forEach(evtName => {
      map.off(evtName, this._executeGenericListeners, me)
    })
  },

  addTo: function(map) {
    map.addLayer(this)

    return this
  },

  clearLayers: function() {
    this._latlngMarkers = null
    this._markers = null
    this._rawMarkers = []
    this._redraw(true)
  },

  addListener: function(evt, handler) {
    // If evt is string, evt is the name of event, if not is the map
    // directly.
    var evtMap = typeof evt === 'string' ? { [evt]: handler } : evt

    Object.keys(evtMap).forEach(evtName => {
      // Verifies if map is already listening for this event
      var notListeningForEvent = !this._genericListenersMap[evtName]

      this._genericListenersMap[evtName] =
        this._genericListenersMap[evtName] || []
      this._genericListenersMap[evtName].push(evtMap[evtName])

      if (notListeningForEvent) {
        this._map.on(evtName, this._executeGenericListeners, this)
      }
    })
  },

  _executeGenericListeners: function(evt) {
    if (!this._markers) return

    var x = evt.containerPoint.x
    var y = evt.containerPoint.y
    var ret = this._markers.search({ min_x: x, min_y: y, max_x: x, max_y: y })
    var listeners = this._genericListenersMap[evt.type]
    listeners.forEach(listener => {
      listener(evt, ret)
    })
  },

  _animateZoom: function(event) {
    var scale = this._map.getZoomScale(event.zoom)
    var offset = this._map._latLngBoundsToNewLayerBounds(
      this._map.getBounds(),
      event.zoom,
      event.center
    ).min

    L.DomUtil.setTransform(this._canvas, offset, scale)
  },

  _addMarker: function(marker, latlng, isDisplaying) {
    // Needed for pop-up & tooltip to work.
    marker._map = this._map

    // _markers contains Points of markers currently displaying on map
    if (!this._markers) this._markers = new Rbush()

    // _latlngMarkers contains Lat\Long coordinates of all markers in layer.
    if (!this._latlngMarkers) {
      this._latlngMarkers = new Rbush()
      this._latlngMarkers.dirty = 0
      this._latlngMarkers.total = 0
    }

    L.Util.stamp(marker)

    var pointPos = this._map.latLngToContainerPoint(latlng)
    var iconSize = marker.options.icon.options.iconSize

    var adjX = iconSize[0] / 2
    var adjY = iconSize[1] / 2
    var ret = [
      {
        min_x: pointPos.x - adjX,
        min_y: pointPos.y - adjY,
        max_x: pointPos.x + adjX,
        max_y: pointPos.y + adjY,
        data: marker
      },
      {
        min_x: latlng.lng,
        min_y: latlng.lat,
        max_x: latlng.lng,
        max_y: latlng.lat,
        data: marker
      }
    ]

    this._latlngMarkers.dirty++
    this._latlngMarkers.total++

    // Only draw if we are on map
    if (isDisplaying === true) this._drawMarker(marker, pointPos)

    return ret
  },

  _drawMarker: function(marker, pointPos) {
    if (!this._imageLookup) this._imageLookup = {}
    if (!pointPos) {
      pointPos = this._map.latLngToContainerPoint(marker.getLatLng())
    }

    var iconUrl = marker.options.icon.options.iconUrl

    if (marker.canvas_img) {
      this._drawImage(marker, pointPos)
    } else {
      if (this._imageLookup[iconUrl]) {
        marker.canvas_img = this._imageLookup[iconUrl][0]

        if (this._imageLookup[iconUrl][1] === false) {
          this._imageLookup[iconUrl][2].push([marker, pointPos])
        } else {
          this._drawImage(marker, pointPos)
        }
      } else {
        var i = new Image()
        i.src = iconUrl
        marker.canvas_img = i

        // Image,isLoaded,marker\pointPos ref
        this._imageLookup[iconUrl] = [i, false, [[marker, pointPos]]]

        i.onload = () => {
          this._imageLookup[iconUrl][1] = true
          this._imageLookup[iconUrl][2].forEach(e => {
            this._drawImage(e[0], e[1])
          })
        }
      }
    }
  },

  _drawImage: function(marker, pointPos) {
    var options = marker.options.icon.options
    this._context.save()

    var degrees = options.rotationAngle || 0
    var x = pointPos.x - options.iconAnchor[0]
    var y = pointPos.y - options.iconAnchor[1]

    this._context.translate(x, y)
    this._context.rotate((degrees * Math.PI) / 180)

    this._context.drawImage(
      marker.canvas_img,
      options.iconSize[0] / -2,
      options.iconSize[1] / -2,
      options.iconSize[0],
      options.iconSize[1]
    )
    this._context.restore()
  },

  _reset: function() {
    var topLeft = this._map.containerPointToLayerPoint([0, 0])
    L.DomUtil.setPosition(this._canvas, topLeft)

    var size = this._map.getSize()

    this._canvas.width = size.x
    this._canvas.height = size.y

    this._redraw()
  },

  _redraw: function(clear) {
    if (clear)
      this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
    if (!this._map || !this._latlngMarkers) return

    var tmp = []

    // If we are 10% individual inserts\removals, reconstruct lookup for efficiency
    if (this._latlngMarkers.dirty / this._latlngMarkers.total >= 0.1) {
      this._latlngMarkers.all().forEach(e => {
        tmp.push(e)
      })

      this._latlngMarkers.clear()
      this._latlngMarkers.load(tmp)
      this._latlngMarkers.dirty = 0
      tmp = []
    }

    var mapBounds = this._map.getBounds()

    // Only re-draw what we are showing on the map.

    var mapBoxCoords = {
      min_x: mapBounds.getWest(),
      min_y: mapBounds.getSouth(),
      max_x: mapBounds.getEast(),
      max_y: mapBounds.getNorth()
    }

    this._latlngMarkers.search(mapBoxCoords).forEach(e => {
      // Readjust Point Map
      var pointPos = this._map.latLngToContainerPoint(e.data.getLatLng())

      var iconSize = e.data.options.icon.options.iconSize
      var adjX = iconSize[0] / 2
      var adjY = iconSize[1] / 2

      var newCoords = {
        min_x: pointPos.x - adjX,
        min_y: pointPos.y - adjY,
        max_x: pointPos.x + adjX,
        max_y: pointPos.y + adjY,
        data: e.data
      }

      tmp.push(newCoords)

      // Redraw points
      this._drawMarker(e.data, pointPos)
    })

    // Clear rBush & Bulk Load for performance
    this._markers.clear()
    this._markers.load(tmp)
  },

  _initCanvas: function() {
    this._canvas = L.DomUtil.create(
      'canvas',
      'leaflet-canvas-icon-layer leaflet-layer'
    )

    var size = this._map.getSize()
    this._canvas.width = size.x
    this._canvas.height = size.y

    this._context = this._canvas.getContext('2d')

    var animated = this._map.options.zoomAnimation && L.Browser.any3d
    L.DomUtil.addClass(
      this._canvas,
      'leaflet-zoom-' + (animated ? 'animated' : 'hide')
    )
  },

  addOnClickListener: function(listener) {
    this._onClickListeners.push(listener)
  },

  addOnHoverListener: function(listener) {
    this._onHoverListeners.push(listener)
  },

  addOnMouseOverListener: function(listener) {
    this._onMouseOverListeners.push(listener)
  },

  addOnMouseOutListener: function(listener) {
    this._onMouseOutListeners.push(listener)
  },

  _executeListeners: function(event) {
    if (!this._markers) return

    var x = event.containerPoint.x
    var y = event.containerPoint.y

    if (this._openToolTip) {
      this._openToolTip.closeTooltip()
      delete this._openToolTip
    }

    var ret = this._markers.search({ min_x: x, min_y: y, max_x: x, max_y: y })

    if (ret && ret.length > 0) {
      this._map._container.style.cursor = 'pointer'

      if (event.type === 'click') {
        var hasPopup = ret[0].data.getPopup()
        if (hasPopup) ret[0].data.openPopup()

        this._onClickListeners.forEach(listener => {
          listener(event, ret)
        })
      }

      if (event.type === 'mousemove') {
        if (!this._lastRet) {
          this._lastRet = ret
          this._onMouseOverListeners.forEach(listener => {
            listener(event, this._lastRet)
          })
        } else if (this._lastRet !== ret) {
          this._onMouseOutListeners.forEach(listener => {
            listener(event, this._lastRet)
          })
          this._lastRet = ret
          this._onMouseOverListeners.forEach(listener => {
            listener(event, this._lastRet)
          })
        }

        var hasTooltip = ret[0].data.getTooltip()
        if (hasTooltip) {
          this._openToolTip = ret[0].data
          ret[0].data.openTooltip()
        }

        this._onHoverListeners.forEach(listener => {
          listener(event, ret)
        })
      }
    } else {
      if (event.type === 'mousemove' && this._lastRet) {
        this._onMouseOutListeners.forEach(listener => {
          listener(event, this._lastRet)
        })
        delete this._lastRet
      }
      this._map._container.style.cursor = ''
    }
  }
})
