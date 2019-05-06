import index from './index'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as routerApi from '../router'
import * as titresApi from './titres'
import * as metasApi from './metas'
import * as titre from './titre'
import * as mapApi from './map'
import * as utilisateurApi from './utilisateur'
import * as utilisateursApi from './utilisateurs'
import * as entreprisesApi from './entreprises'
import * as substancesApi from './substances'
import * as userApi from './user'
import * as titreActivitesApi from './titre-activites'
import { init } from '../api'

jest.mock('./titres', () => ({ titres: jest.fn() }))
jest.mock('./metas', () => ({ metas: jest.fn() }))
jest.mock('./titre', () => ({ titre: jest.fn() }))
jest.mock('./map', () => ({ map: jest.fn() }))
jest.mock('./utilisateur', () => ({ titutilisateurres: jest.fn() }))
jest.mock('./utilisateurs', () => ({ utilisateurs: jest.fn() }))
jest.mock('./entreprises', () => ({ entreprises: jest.fn() }))
jest.mock('./substances', () => ({ substances: jest.fn() }))
jest.mock('./user', () => ({ user: jest.fn() }))
jest.mock('./titre-activites', () => ({ titreActivites: jest.fn() }))
