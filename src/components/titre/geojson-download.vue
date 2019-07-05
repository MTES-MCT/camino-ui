<template>
  <button
    class="btn-border pill px-m py-s h5 flex"
    @click="download"
  >
    <span class="mt-xxs mr-xs">geojson</span> <i class="icon-24 icon-download" />
  </button>
</template>

<script>
export default {
  props: {
    titre: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    download() {
      const titreGeojson = this.titreFormatGeojson(this.titre)
      const name = (() => {
        const d = new Date()
        const dd = d
          .getDate()
          .toString()
          .padStart(2, '0')
        const mm = (d.getMonth() + 1).toString().padStart(2, '0')
        const yyyy = d.getFullYear()
        const hh = d
          .getHours()
          .toString()
          .padStart(2, '0')
        const mi = d
          .getMinutes()
          .toString()
          .padStart(2, '0')
        return `${yyyy}${mm}${dd}-${hh}h${mi}-camino-titre-${this.titre.nom}.geojson`
      })()

      const link = document.createElement('a')
      const data = `data:text/geojson;charset=utf-8,${encodeURIComponent(
        JSON.stringify(titreGeojson)
      )}`
      link.setAttribute('href', data)
      link.setAttribute('download', name)
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      this.$store.dispatch('messageAdd', {
        value: `fichier ${name} téléchargé`,
        type: 'success'
      })
    },

    titreFormatGeojson(titre) {
      console.log(titre)
      return {
        type: 'FeatureCollection',
        properties: { id: titre.id, nom: titre.nom },
        features: [
          {
            type: 'Feature',
            geometry:
              titre.geojsonMultiPolygon && titre.geojsonMultiPolygon.geometry,
            properties: {}
          },
          {
            type: 'FeatureCollection',
            properties: {},
            features: titre.geojsonPoints.features
          }
        ]
      }
    }
  }
}
</script>
