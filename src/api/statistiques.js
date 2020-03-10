import gql from 'graphql-tag'
import { apiQuery } from './_utils'

const statistiques = apiQuery(gql`
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
