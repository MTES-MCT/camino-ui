import gql from 'graphql-tag'
import { apiFetch } from './_client'

const statistiques = apiFetch(gql`
  query Statistiques {
    statistiquesGlobales {
      titresActivitesBeneficesEntreprise
      titresActivitesBeneficesAdministration
      searchCounts {
        month
        value
      }
      majTitreCounts {
        month
        value
      }
      actionCount
      timeSession
      downloadCount
      demarcheCount
      erreurCount
      reutilisationCount
    }

    tbGuyane {
      anneesTbGuyane {
        annee
        dataTb {
          armCount
          prmCount
          axmCount
          pxmCount
          cxmCount
          surfaceExploration
          surfaceExploitation
          productionOr
          carburantConventionnel
          carburantDetaxe
          mercure
          environnementCost
          salariesCount
          rapportProductionOrDeposesCount
          rapportProductionOrRatio
        }
      }
    }
  }
`)

export { statistiques }
