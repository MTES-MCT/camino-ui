import { leafletPatternsDefault } from './leaflet/pattern.js'

const getGeojsonPattern = (domaineId, exploitation) => {
  const pattern = exploitation ? null : leafletPatternsDefault[`${domaineId}`]
  const svgFill = exploitation ? `svg-fill-domaine-${domaineId}` : null
  return { pattern, svgFill }
}

export { getGeojsonPattern }
