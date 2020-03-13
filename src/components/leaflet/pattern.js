import 'leaflet.pattern'

const L = window.L

const getGeojsonPattern = (
  color,
  isMotif = false,
  x = 5,
  y = 5,
  radius = 1.5,
  fill = true,
  width = 30,
  height = 30
) => {
  // const shape = new L.PatternCircle({
  //   x: x,
  //   y: y,
  //   radius: radius,
  //   fill: fill,
  //   fillOpacity: 1,
  //   color: 'white'
  // })
  // const shape2 = new L.PatternCircle({
  //   x: 4 * x,
  //   y: 4 * y,
  //   radius: radius,
  //   fill: fill,
  //   fillOpacity: 1,
  //   color: 'white'
  // })

  const pattern = new L.StripePattern({
    weight: height,
    color: color,
    opacity: 0.75,
    width: width,
    height: height
  })
  // const pattern = new L.Pattern({
  //   width: width,
  //   height: height,
  //   color: color
  // })

  if (isMotif) {
    // pattern.addShape(shape)
    // pattern.addShape(shape2)
  }

  return pattern
}

var leafletPatternsDefault = {}

leafletPatternsDefault['m-exploitation'] = getGeojsonPattern('#376FAA', false)
leafletPatternsDefault['m-exploration'] = getGeojsonPattern('#376FAA', true)
leafletPatternsDefault['w-exploitation'] = getGeojsonPattern('#1D836E', false)
leafletPatternsDefault['w-exploration'] = getGeojsonPattern('#1D836E', true)
leafletPatternsDefault['c-exploitation'] = getGeojsonPattern('#B88847', false)
leafletPatternsDefault['c-exploration'] = getGeojsonPattern('#B88847', true)
leafletPatternsDefault['h-exploitation'] = getGeojsonPattern('#C2266A', false)
leafletPatternsDefault['h-exploration'] = getGeojsonPattern('#C2266A', true)
leafletPatternsDefault['f-exploitation'] = getGeojsonPattern('#4A515D', false)
leafletPatternsDefault['f-exploration'] = getGeojsonPattern('#4A515D', true)
leafletPatternsDefault['r-exploitation'] = getGeojsonPattern('#A0AA31', false)
leafletPatternsDefault['r-exploration'] = getGeojsonPattern('#A0AA31', true)
leafletPatternsDefault['g-exploitation'] = getGeojsonPattern('#C93717', false)
leafletPatternsDefault['g-exploration'] = getGeojsonPattern('#C93717', true)
leafletPatternsDefault['s-exploitation'] = getGeojsonPattern('#65518D', false)
leafletPatternsDefault['s-exploration'] = getGeojsonPattern('#65518D', true)

export { leafletPatternsDefault }
