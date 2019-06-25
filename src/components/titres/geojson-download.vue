<template>
  <button
    class="btn-border pill px-m py-s h5"
    @click="download"
  >
    Télécharger (.geojson)
  </button>
</template>

<script>
export default {
  props: {
    titres: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    download() {
      const titresGeojson = this.titresFormatGeojson(this.titres)
      const name = (() => {
        const d = new Date()
        const dd = d.getDate()
        const mm = d.getMonth() + 1
        const yyyy = d.getFullYear()
        const hh = d.getHours()
        const mi = d.getMinutes()
        return `${yyyy}${mm}${dd}-${hh}-${mi}-camino-titre-geojson.geojson`
      })()

      const link = document.createElement('a')
      const data = `data:text/geojson;charset=utf-8,${encodeURIComponent(
        JSON.stringify(titresGeojson)
      )}`
      link.setAttribute('href', data)
      link.setAttribute('download', name)
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },

    titresFormatGeojson(titres) {
      return {
        type: 'FeatureCollection',
        features: titres.map(titre => {
          return {
            properties: {},
            type: 'Feature',
            geometry: titre.geojsonMultiPolygon.geometry
          }
        })
      }
    }
  }
}
</script>
