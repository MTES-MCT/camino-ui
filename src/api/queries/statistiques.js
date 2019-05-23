import gql from 'graphql-tag'

const queryStatistiques = gql`
  query Statistiques {
    statistiques {
      titresTotal
      titresValide
      titresActivites2018Depose
      titreActivites2018Ratio
      titresActivites2018BeneficesEntreprise
      titresActivites2018BeneficesAdministration
    }
  }
`

export { queryStatistiques }
