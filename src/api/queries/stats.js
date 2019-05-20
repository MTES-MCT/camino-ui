import gql from 'graphql-tag'

const queryStats = gql`
  query Stats {
    stats {
      titresTotal
      titresValide
      titresActivites2018Depose
      titreActivites2018Ratio
      titresActivites2018BeneficesEntreprise
      titresActivites2018BeneficesAdministration
    }
  }
`

export { queryStats }
