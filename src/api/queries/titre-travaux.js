import gql from 'graphql-tag'
import fragmentTitreTravauxRapport from './fragments/titre-travaux-rapport'

const mutationTitreTravauxRapportAjouter = gql`
  mutation TitreTravauxRapportAjouter($rapport: InputTitreTravauxRapport!) {
    titreTravauxRapportAjouter(rapport: $rapport) {
      ...titreTravauxRapport
    }
  }

  ${fragmentTitreTravauxRapport}
`

export { mutationTitreTravauxRapportAjouter }
