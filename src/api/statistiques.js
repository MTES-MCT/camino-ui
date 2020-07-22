import gql from 'graphql-tag'
import { apiFetch } from './_client'

const statistiques = apiFetch(gql`
  query Statistiques {
    statistiques {
      titresTotal
      titresValide
      titresActivitesDepose
      titreActivites2018Ratio
      titresActivitesBeneficesEntreprise
      titresActivitesBeneficesAdministration
    }
  }
`)

export { statistiques }
