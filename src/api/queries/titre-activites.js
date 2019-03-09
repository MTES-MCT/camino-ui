import gql from 'graphql-tag'
import fragmentTitreActivite from './fragments/titre'

const mutationTitreActiviteModifier = gql`
  mutation TitreActiviteModifier($activite: InputTitreActivite!) {
    titreActiviteModifier(activite: $activite) {
      ...activite
    }
  }

  ${fragmentTitreActivite}
`

export { mutationTitreActiviteModifier }
