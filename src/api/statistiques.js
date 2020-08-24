import gql from 'graphql-tag'
import { apiFetch } from './_client'

const statistiques = apiFetch(gql`
  query Statistiques {
    statistiques {
      titresActivitesBeneficesEntreprise
      titresActivitesBeneficesAdministration
      nbSearchArray {
        month
        value
      }
      nbAction
      timeSession
      nbDonwload
    }
  }
`)

export { statistiques }
