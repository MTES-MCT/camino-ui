import gql from 'graphql-tag'
import fragmentTitreActivitesRapport from './fragments/titre-activites-rapport'

const mutationTitreActivitesRapportModifier = gql`
  mutation TitreActivitesRapportModifier(
    $rapport: InputTitreActivitesRapport!
  ) {
    titreActivitesRapportModifier(rapport: $rapport) {
      ...activitesRapport
    }
  }

  ${fragmentTitreActivitesRapport}
`

export { mutationTitreActivitesRapportModifier }
