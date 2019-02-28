import gql from 'graphql-tag'

const fragmentTitreActivitesRapport = gql`
  fragment activitesRapport on TitreActivitesRapport {
    id
    titreId
    date
    confirmation
    contenu
  }
`

export default fragmentTitreActivitesRapport
