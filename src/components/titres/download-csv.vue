<template>
  <Download
    :type="'csv'"
    :content="content"
    :name="name"
  />
</template>

<script>
import { parse } from 'json2csv'
import Download from '../ui/download.vue'

export default {
  components: {
    Download
  },
  props: {
    titres: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    name() {
      return this.fileNameCreate('camino-titres-export', 'csv')
    },

    content() {
      const titresFormatCsv = titres =>
        titres.map(titre => {
          const titreNew = {
            id: titre.id,
            nom: titre.nom,
            type: titre.type.nom,
            domaine: titre.domaine.nom,
            date_debut: titre.dateDebut,
            date_fin: titre.dateFin,
            date_demande: titre.dateDemande,
            statut: titre.statut.nom,
            volume: titre.volume,
            volume_unite: titre.volumeUnite,
            substances: titre.substances.map(s => s.nom).join(';'),
            surface_km2: titre.surface,
            administrations_noms: titre.administrations
              .map(a => a.nom)
              .join(';'),
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
            engagement_devise:
              titre.engagementDevise && titre.engagementDevise.id
          }

          titre.references &&
            titre.references.forEach(reference => {
              titreNew[`reference_${reference.type}`] = reference.valeur
            })

          return titreNew
        })

      const csv = parse(titresFormatCsv(this.titres), {})

      return csv
    }
  }
}
</script>
