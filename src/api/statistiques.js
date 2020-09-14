import gql from 'graphql-tag'
import { apiFetch } from './_client'

const statistiques = apiFetch(gql`
  query Statistiques {
    statistiquesGlobales {
      titresActivitesBeneficesEntreprise
      titresActivitesBeneficesAdministration
      recherches {
        month
        value
      }
      miseAJourTitre {
        month
        value
      }
      action
      tempsSession
      telechargement
      demarche
      erreur
      reutilisation
    }

    statistiquesGuyane {
      anneesStatistiquesGuyane {
        annee
        statistiqueGuyane {
          arm
          prm
          axm
          pxm
          cxm
          surfaceExploration
          surfaceExploitation
          productionOr
          carburantConventionnel
          carburantDetaxe
          mercure
          environnementCout
          salaries
          rapportProductionOrDeposes
          rapportProductionOrRatio
        }
      }
    }
  }
`)

export { statistiques }
