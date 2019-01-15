import gql from 'graphql-tag'
import fragmentTitreTravauxRapport from './fragments/titre-travaux-rapport'

const mutationTitreTravauxRapportModifier = gql`
  mutation TitreTravauxRapportModifier($rapport: InputTitreTravauxRapport!) {
    titreTravauxRapportModifier(rapport: $rapport) {
      ...travauxRapport
    }
  }

  ${fragmentTitreTravauxRapport}
`

export { mutationTitreTravauxRapportModifier }
