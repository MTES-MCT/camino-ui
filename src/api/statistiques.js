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
      titresModifies {
        month
        value
      }
      actions
      sessionDuree
      telechargements
      demarches
      signalements
      reutilisations
    }

    statistiquesGuyane {
      annee
      titresArm
      titresPrm
      titresAxm
      titresPxm
      titresCxm
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
`)

export { statistiques }
