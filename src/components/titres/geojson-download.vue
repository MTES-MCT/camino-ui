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
        return `${yyyy}${mm}${dd}-${hh}h${mi}-camino-titre-export.geojson`
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

      this.$store.dispatch('messageAdd', {
        value: `fichier ${name} téléchargé`,
        type: 'success'
      })
    },

    titresFormatGeojson(titres) {
      return {
        type: 'FeatureCollection',
        features: titres.map(titre => {
          return {
            type: 'Feature',
            geometry:
              titre.geojsonMultiPolygon && titre.geojsonMultiPolygon.geometry,
            properties: {
              id: titre.id,
              nom: titre.nom,
              type: titre.type.nom,
              domaine: titre.domaine.nom,
              date_debut: titre.dateDebut && this.dateFormat(titre.dateDebut),
              date_fin: titre.dateFin && this.dateFormat(titre.dateFin),
              date_demande:
                titre.dateDemande && this.dateFormat(titre.dateDemande),
              statut: titre.statut.nom,
              volume: titre.volume,
              volume_unite: titre.volumeUnite,
              substances: titre.substances.map(s => s.nom).join(', ') || null,
              surface_km2: titre.surface,
              administrations_noms: titre.administrations.map(a => a.nom),
              titulaires_noms:
                titre.titulaires.map(e => e.nom).join(', ') || null,
              titulaires_legal:
                titre.titulaires
                  .map(e => e.legalEtranger || e.legalSiren)
                  .join(', ') || null,
              amodiataires_noms:
                titre.amodiataires.map(e => e.nom).join(', ') || null,
              amodiataires_legal:
                titre.amodiataires
                  .map(e => e.legalEtranger || e.legalSiren)
                  .join(', ') || null,
              engagement: titre.engagement,
              engagement_devise:
                titre.engagementDevise && titre.engagementDevise.id,
              references:
                titre.references &&
                titre.references
                  .map(reference => `${reference.type}: ${reference.valeur}`)
                  .join(', ')
            }
          }
        })
      }
    }
  }
}
</script>
