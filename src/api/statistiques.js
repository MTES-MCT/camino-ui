import gql from 'graphql-tag'
import { apiFetch } from './_client'

const statistiquesGlobales = apiFetch(gql`
  query StatistiquesGlobales {
    statistiquesGlobales {
      titresActivitesBeneficesEntreprise
      titresActivitesBeneficesAdministration
      recherches {
        mois
        quantite
      }
      titresModifies {
        mois
        quantite
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
      surfaceExploration
      surfaceExploitation
      titresArm
      titresPrm
      titresAxm
      titresPxm
      titresCxm
      annees {
        annee
        titresArm {
          quantite
          surface
        }
        titresPrm {
          quantite
          surface
        }
        titresAxm {
          quantite
          surface
        }
        titresPxm {
          quantite
          surface
        }
        titresCxm {
          quantite
          surface
        }
        orNet
        carburantConventionnel
        carburantDetaxe
        mercure
        environnementCout
        effectifs
        activitesDeposesQuantite
        activitesDeposesRatio
      }
    }
  }
`)

export { statistiquesGlobales, statistiquesGuyane }
