<template>
  <Download
    name="titres"
    type="geojson"
    :content-build="contentBuild"
  />
</template>

<script>
import Download from '../_ui/download.vue'

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

  methods: {
    contentBuild() {
      const titresFormatGeojson = titres => ({
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
              date_debut: titre.dateDebut,
              date_fin: titre.dateFin,
              date_demande: titre.dateDemande,
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
                  .map(reference => `${reference.type.nom}: ${reference.nom}`)
                  .join(', ')
            }
          }
        })
      })

      return JSON.stringify(titresFormatGeojson(this.titres))
    }
  }
}
</script>
