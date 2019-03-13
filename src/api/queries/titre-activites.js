import gql from 'graphql-tag'
import fragmentTitreActivite from './fragments/titre-activite'

const mutationTitreActiviteModifier = gql`
  mutation TitreActiviteModifier($activite: InputTitreActivite!) {
    titreActiviteModifier(activite: $activite) {
      ...activite
    }
  }

  ${fragmentTitreActivite}
`

export { mutationTitreActiviteModifier }
