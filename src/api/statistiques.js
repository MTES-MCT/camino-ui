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
      nbMajTitresArray {
        month
        value
      }
      nbAction
      timeSession
      nbDonwload
      nbDemarche
      nbErreur
    }
  }
`)

export { statistiques }
