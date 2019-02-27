<template>
  <button
    class="btn-border pill px-m py-s h5"
    @click="download"
  >
    Télécharger (.csv)
  </button>
</template>

<script>
import { parse } from 'json2csv'

export default {
  props: {
    titres: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    download() {
      const titres = this.titresFormat(this.titres)
      const csv = parse(titres, {})
      const name = (() => {
        const d = new Date()
        const dd = d.getDate()
        const mm = d.getMonth() + 1
        const yyyy = d.getFullYear()
        const hh = d.getHours()
        const mi = d.getMinutes()
        return `${yyyy}${mm}${dd}-${hh}-${mi}-camino-titre-export.csv`
      })()

      const link = document.createElement('a')
      const data = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`
      link.setAttribute('href', data)
      link.setAttribute('download', name)
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },

    titresFormat(titres) {
      const dateFormat = date => {
        const d = new Date(date)
        var dd = d.getDate()
        var mm = d.getMonth() + 1
        var yyyy = d.getFullYear()
        return `${yyyy}-${mm}-${dd}`
      }

      return titres.map(titre => {
        const phases = titre.demarches.filter(d => d.phase).map(d => d.phase)

        const titreNew = {
          id: titre.id,
          nom: titre.nom,
          type: titre.type.nom,
          domaine: titre.domaine.nom,
          date_debut: phases.length && dateFormat(phases[0].dateDebut),
          date_fin:
            phases.length && dateFormat(phases[phases.length - 1].dateFin),
          statut: titre.statut.nom,
          substances: titre.substances.map(s => s.nom).join(';'),
          surface_km2: titre.surface,
          administrations_noms: titre.administrations.map(a => a.nom).join(';'),
          titulaires_noms: titre.titulaires.map(e => e.nom).join(';'),
          titulaires_legal: titre.titulaires
            .map(e => e.legalEtranger || e.legalSiren)
            .join(';'),
          amodiataires_noms: titre.amodiataires.map(e => e.nom).join(';'),
          amodiataires_legal: titre.amodiataires
            .map(e => e.legalEtranger || e.legalSiren)
            .join(';'),
          geojson: titre.geojsonMultiPolygon,
          engagement: titre.engagement,
          engagement_devise: titre.engagementDevise && titre.engagementDevise.id
        }

        titre.references.forEach(reference => {
          titreNew[`reference_${reference.type}`] = reference.valeur
        })

        return titreNew
      })
    }
  }
}
</script>
