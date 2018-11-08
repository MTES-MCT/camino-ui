import gql from 'graphql-tag'

const fragmentTitreTravauxRapport = gql`
  fragment titreTravauxRapport on TitreTravauxRapport {
    id
    titreId
    date
    contenu
  }
`

export default fragmentTitreTravauxRapport
