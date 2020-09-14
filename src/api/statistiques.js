import gql from 'graphql-tag'
import { apiFetch } from './_client'

const statistiquesGlobales = apiFetch(gql`
  query StatistiquesGlobales {
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
  }
`)

const statistiquesGuyane = apiFetch(gql`
  query StatistiquesGuyane {
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

export { statistiquesGlobales, statistiquesGuyane }
