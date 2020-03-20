const L = window.L

const getGeojsonPattern = domaineId => {
  const pattern = new L.StripePattern({
    weight: 7,
    // 2nde option : bandes de même largeur
    // weight: 4,
    color: `var(--color-title-domaine-${domaineId})`,
    spaceColor: 'white',
    spaceOpacity: 0.5,
    angle: 135
  })

  return pattern
}

// ensemble des leafletPattern par défaut
// chaque geojson y fait référence
// il est importé dans src/components/leaflet/map.vue comme référence
var leafletPatternsDefault = {
  m: getGeojsonPattern('m'),
  w: getGeojsonPattern('w'),
  c: getGeojsonPattern('c'),
  h: getGeojsonPattern('h'),
  f: getGeojsonPattern('f'),
  r: getGeojsonPattern('r'),
  g: getGeojsonPattern('g'),
  s: getGeojsonPattern('s')
}

export { leafletPatternsDefault }
