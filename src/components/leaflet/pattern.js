import 'leaflet.pattern'

const L = window.L

const getGeojsonPattern = (
  color,
  x = 5,
  y = 5,
  radius = 1.5,
  fill = true,
  width = 10,
  height = 10
) => {
  const shape = new L.PatternCircle({
    x: x,
    y: y,
    radius: radius,
    fill: fill,
    color: color
  })

  const pattern = new L.Pattern({
    width: width,
    height: height
  })

  pattern.addShape(shape)

  return pattern
}

var leafletPatternsDefault = {}

leafletPatternsDefault['m-exp-dmi'] = getGeojsonPattern('#376ea9')
leafletPatternsDefault['m-rec-dmi'] = getGeojsonPattern('#53a6ff')
leafletPatternsDefault['w-exp-dmi'] = getGeojsonPattern('#1e826e')
leafletPatternsDefault['w-rec-dmi'] = getGeojsonPattern('#8ce6cd')
leafletPatternsDefault['c-exp-dmi'] = getGeojsonPattern('#b88848')
leafletPatternsDefault['c-rec-dmi'] = getGeojsonPattern('#ffcc88')
leafletPatternsDefault['h-exp-dmi'] = getGeojsonPattern('#c12569')
leafletPatternsDefault['h-rec-dmi'] = getGeojsonPattern('#f778af')
// titres f : couleurs prises arbitrairement
leafletPatternsDefault['f-exp-dmi'] = getGeojsonPattern('#502812')
leafletPatternsDefault['f-rec-dmi'] = getGeojsonPattern('#b35a2b')
leafletPatternsDefault['r-exp-dmi'] = getGeojsonPattern('#a0aa32')
leafletPatternsDefault['r-rec-dmi'] = getGeojsonPattern('#bef546')
leafletPatternsDefault['g-exp-dmi'] = getGeojsonPattern('#c83714')
leafletPatternsDefault['g-rec-dmi'] = getGeojsonPattern('#f0785a')
leafletPatternsDefault['s-exp-dmi'] = getGeojsonPattern('#64508c')
leafletPatternsDefault['s-rec-dmi'] = getGeojsonPattern('#a07de1')

export { leafletPatternsDefault }
