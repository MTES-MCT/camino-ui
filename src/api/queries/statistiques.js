import gql from 'graphql-tag'

const queryStatistiques = gql`
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
`

export { queryStatistiques }
