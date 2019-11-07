import { init } from './init'
import {
  titres,
  titre,
  titreCreate,
  titreUpdate,
  titreDelete,
  titreDemarcheCreate,
  titreDemarcheUpdate,
  titreDemarcheDelete,
  titreEtapeCreate,
  titreEtapeUpdate,
  titreEtapeDelete,
  titreDocumentCreate,
  titreDocumentUpdate,
  titreDocumentDelete
} from './titres'

import {
  utilisateur,
  utilisateurs,
  utilisateurLogin,
  utilisateurUpdate,
  utilisateurAdd,
  utilisateurRemove,
  utilisateurPasswordUpdate,
  utilisateurIdentify,
  utilisateurPasswordInit,
  utilisateurPasswordInitEmail,
  utilisateurAddEmail
} from './utilisateurs'

import {
  entreprise,
  entreprises,
  entrepriseCreate,
  entrepriseUpdate
} from './entreprises'

import { administration, administrations } from './administrations'

import { titreActiviteUpdate } from './titre-activites'

import { statistiques } from './statistiques'

export {
  init,
  titre,
  titreCreate,
  titreUpdate,
  titreDelete,
  titreDemarcheCreate,
  titreDemarcheUpdate,
  titreDemarcheDelete,
  titreEtapeCreate,
  titreEtapeUpdate,
  titreEtapeDelete,
  titreDocumentCreate,
  titreDocumentUpdate,
  titreDocumentDelete,
  titres,
  utilisateur,
  utilisateurs,
  entreprise,
  entreprises,
  entrepriseCreate,
  entrepriseUpdate,
  administration,
  administrations,
  utilisateurLogin,
  utilisateurUpdate,
  utilisateurAdd,
  utilisateurRemove,
  utilisateurPasswordUpdate,
  utilisateurIdentify,
  titreActiviteUpdate,
  utilisateurPasswordInit,
  utilisateurPasswordInitEmail,
  utilisateurAddEmail,
  statistiques
}
