import gql from 'graphql-tag'

const fragmentTitreTravauxRapport = gql`
  fragment travauxRapport on TitreTravauxRapport {
    id
    titreId
    date
    confirmation
    contenu
  }
`

export default fragmentTitreTravauxRapport
