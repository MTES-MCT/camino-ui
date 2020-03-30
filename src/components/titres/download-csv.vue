<template>
  <Download
    name="titres"
    type="csv"
    :content-build="contentBuild"
  />
</template>

<script>
import { parse } from 'json2csv'
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
      const titresFormatCsv = titres =>
        titres.map(titre => {
          const { communes, departements, regions } = titre.pays.reduce(
            ({ communes, departements, regions }, pay) => {
              const {
                payRegions,
                payDepartements,
                payCommunes
              } = pay.regions.reduce(
                ({ payRegions, payDepartements, payCommunes }, region) => {
                  const {
                    regionDepartements,
                    regionCommunes
                  } = region.departements.reduce(
                    ({ regionDepartements, regionCommunes }, departement) => {
                      regionDepartements.push(departement.nom)
                      regionCommunes.push(
                        ...departement.communes.map(
                          commune =>
                            `${commune.nom} (${Math.round(
                              commune.surface / 100
                            ) / 10000})`
                        )
                      )

                      return { regionDepartements, regionCommunes }
                    },
                    { regionDepartements: [], regionCommunes: [] }
                  )

                  payRegions.push(region.nom)
                  payDepartements.push(...regionDepartements)
                  payCommunes.push(...regionCommunes)

                  return { payRegions, payDepartements, payCommunes }
                },
                { payRegions: [], payDepartements: [], payCommunes: [] }
              )

              regions.push(...payRegions)
              departements.push(...payDepartements)
              communes.push(...payCommunes)

              return { communes, departements, regions }
            },
            { communes: [], departements: [], regions: [] }
          )

          const titreNew = {
            id: titre.id,
            nom: titre.nom,
            type: titre.type.type.nom,
            nature: titre.type.type.exploitation
              ? 'exploitation'
              : 'exploration',
            domaine: titre.domaine.nom,
            date_debut: titre.dateDebut,
            date_fin: titre.dateFin,
            date_demande: titre.dateDemande,
            statut: titre.statut.nom,
            substances: titre.substances.map(s => s.nom).join(';'),
            surface_km2: titre.surface,
            communes: communes.join(';'),
            departements: departements.join(';'),
            regions: regions.join(';'),
            administrations_noms: titre.administrations
              .map(a => a.nom)
              .join(';'),
            titulaires_noms: titre.titulaires.map(e => e.nom).join(';'),
            titulaires_adresses: titre.titulaires
              .map(e => `${e.adresse} ${e.codePostal} ${e.commune}`)
              .join(';'),
            titulaires_legal: titre.titulaires
              .map(e => e.legalEtranger || e.legalSiren)
              .join(';'),
            amodiataires_noms: titre.amodiataires.map(e => e.nom).join(';'),
            amodiataires_adresses: titre.amodiataires
              .map(e => `${e.adresse} ${e.codePostal} ${e.commune}`)
              .join(';'),
            amodiataires_legal: titre.amodiataires
              .map(e => e.legalEtranger || e.legalSiren)
              .join(';'),
            geojson: titre.geojsonMultiPolygon,
            // todo : gérer les props qui viennent des étapes
            volume: titre.volume,
            volume_unite: titre.volumeUnite,
            engagement: titre.engagement,
            engagement_devise:
              titre.engagementDevise && titre.engagementDevise.id
          }

          titre.references &&
            titre.references.forEach(reference => {
              titreNew[`reference_${reference.type.nom}`] = reference.nom
            })

          return titreNew
        })

      const csv = parse(titresFormatCsv(this.titres), {})

      return csv
    }
  }
}
</script>
