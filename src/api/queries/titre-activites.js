import gql from 'graphql-tag'
import { fragmentTitreActivite } from './fragments/titre-activite'

const mutationTitreActiviteModifier = gql`
  mutation TitreActiviteModifier($activite: InputTitreActiviteModification!) {
    titreActiviteModifier(activite: $activite) {
      ...titreActivite
    }
  }

  ${fragmentTitreActivite}
`

export { mutationTitreActiviteModifier }
