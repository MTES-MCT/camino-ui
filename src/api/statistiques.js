import gql from 'graphql-tag'
import { apiGraphQLFetch } from './_client'

const statistiquesGlobales = apiGraphQLFetch(gql`
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

const statistiquesGuyane = apiGraphQLFetch(gql`
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
const statistiquesGranulatsMarins = apiGraphQLFetch(gql`
  query StatistiquesGranulatsMarins {
    statistiquesGranulatsMarins {
      annees {
        annee
        titresPrw {
          quantite
          surface
        }
        titresPxw {
          quantite
          surface
        }
        titresCxw {
          quantite
          surface
        }
        volume
        masse
        activitesDeposesQuantite
        activitesDeposesRatio
        concessionsValides {
          quantite
          surface
        }
      }
      surfaceExploration
      surfaceExploitation
      titresInstructionExploration
      titresValPrw
      titresInstructionExploitation
      titresValCxw
    }
  }
`)

export { statistiquesGlobales, statistiquesGuyane, statistiquesGranulatsMarins }
