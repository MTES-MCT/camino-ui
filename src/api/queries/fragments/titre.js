import gql from 'graphql-tag'

import fragmentTitreDemarche from './titre-demarche'
import fragmentTitreTravauxRapport from './titre-travaux-rapport'

const fragmentTitre = gql`
  fragment titre on Titre {
    id
    nom
    type {
      id
      nom
    }
    domaine {
      id
      nom
    }
    statut {
      id
      nom
      couleur
    }
    references {
      type
      valeur
    }
    substances {
      ...titreSubstance
    }
    surface
    volume
    volumeUnite
    administrations {
      ...administration
    }
    titulaires {
      ...entreprise
    }
    amodiataires {
      ...entreprise
    }
    points {
      ...point
    }
    geojsonPoints {
      ...geojsonPoints
    }
    geojsonMultiPolygon {
      ...geojsonMultiPolygon
    }
    pays {
      id
      nom
      regions {
        id
        nom
        departements {
          id
          nom
          communes {
            id
            nom
          }
        }
      }
    }
    demarches {
      ...demarche
    }
    travauxRapports {
      ...travauxRapport
    }
  }

  ${fragmentTitreDemarche}

  ${fragmentTitreTravauxRapport}
`

export default fragmentTitre
