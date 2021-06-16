import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const Titre = () => import('../components/titre.vue')
const Titres = () => import('../components/titres.vue')
const Demarches = () => import('../components/demarches.vue')
const Utilisateur = () => import('../components/utilisateur.vue')
const Utilisateurs = () => import('../components/utilisateurs.vue')
const Entreprise = () => import('../components/entreprise.vue')
const Entreprises = () => import('../components/entreprises.vue')
const Administration = () => import('../components/administration.vue')
const Administrations = () => import('../components/administrations.vue')
const Meta = () => import('../components/meta.vue')
const Metas = () => import('../components/metas.vue')
const Activite = () => import('../components/activite.vue')
const Activites = () => import('../components/activites.vue')
const Glossaire = () => import('../components/glossaire.vue')
const Error = () => import('../components/error.vue')
const UserPasswordInit = () => import('../components/user/password-init.vue')
const UserAdd = () => import('../components/user/add.vue')
const Definition = () => import('../components/glossaire/definition.vue')
const Contacts = () => import('../components/content/contacts.vue')
const About = () => import('../components/content/about.vue')
const Accessibilite = () => import('../components/content/accessibilite.vue')
const Contribution = () => import('../components/content/contribution.vue')
const MentionsLegalesCGU = () =>
  import('../components/content/mentions-legales-cgu.vue')
const Cgu1 = () => import('../components/content/cgu-1-0-0.vue')
const StatistiquesGlobales = () =>
  import('../components/statistiques/globales.vue')
const Statistiques = () => import('../components/statistiques.vue')
const StatistiquesGuyane = () => import('../components/statistiques/guyane.vue')
const StatistiquesGranulatsMarins = () =>
  import('../components/statistiques/granulats-marins.vue')
const TitreCreation = () => import('../components/titre-creation.vue')
const Etape = () => import('../components/etape.vue')
const EtapeEdition = () => import('../components/etape-edition.vue')
const Dashboard = () => import('../components/dashboard.vue')

const routes = [
  {
    path: '/titres',
    name: 'titres',
    component: Titres
  },
  {
    path: '/titres/creation',
    name: 'titre-creation',
    component: TitreCreation
  },
  {
    path: '/titres/:id',
    name: 'titre',
    component: Titre
  },
  {
    path: '/demarches',
    name: 'demarches',
    component: Demarches
  },
  {
    path: '/etapes/:id',
    name: 'etape',
    component: Etape
  },
  {
    path: '/etapes/creation',
    name: 'etape-creation',
    component: EtapeEdition
  },
  {
    path: '/etapes/:id/edition',
    name: 'etape-edition',
    component: EtapeEdition
  },
  {
    path: '/utilisateurs',
    name: 'utilisateurs',
    component: Utilisateurs
  },
  {
    path: '/utilisateurs/:id',
    name: 'utilisateur',
    component: Utilisateur
  },
  {
    path: '/entreprises',
    name: 'entreprises',
    component: Entreprises
  },
  {
    path: '/entreprises/:id',
    name: 'entreprise',
    component: Entreprise
  },
  {
    path: '/administrations',
    name: 'administrations',
    component: Administrations
  },
  {
    path: '/administrations/:id',
    name: 'administration',
    component: Administration
  },
  {
    path: '/metas',
    name: 'metas',
    component: Metas
  },
  {
    path: '/metas/:id',
    name: 'meta',
    component: Meta
  },
  {
    path: '/activites',
    name: 'activites',
    component: Activites
  },
  {
    path: '/activites/:id',
    name: 'activite',
    component: Activite
  },
  {
    path: '/glossaire',
    name: 'glossaire',
    component: Glossaire,
    children: [
      {
        path: ':slug',
        name: 'definition',
        component: Definition
      }
    ]
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: Contacts
  },
  {
    path: '/a-propos',
    name: 'a-propos',
    component: About
  },
  {
    path: '/accessibilite',
    name: 'accessibilite',
    component: Accessibilite
  },
  {
    path: '/contribution',
    name: 'contribution',
    component: Contribution
  },
  {
    path: '/mentions-legales-cgu',
    component: MentionsLegalesCGU
  },
  {
    path: '/cgu/1-0-0',
    name: 'cgu-1-0-0',
    component: Cgu1
  },
  {
    path: '/mot-de-passe',
    name: 'mot-de-passe',
    component: UserPasswordInit
  },
  {
    path: '/email',
    beforeEnter: (to, from, next) => {
      store.dispatch('utilisateur/emailUpdate', {
        emailToken: to.query.token
      })
      next('/')
    }
  },
  {
    path: '/creation-de-compte',
    name: 'account-creation',
    component: UserAdd
  },
  {
    path: '/tableau-de-bord',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/statistiques',
    name: 'statistiques',
    component: Statistiques,
    children: [
      {
        path: 'guyane',
        name: 'statistiques-guyane',
        component: StatistiquesGuyane
      },
      {
        path: 'globales',
        name: 'statistiques-globales',
        component: StatistiquesGlobales
      },
      {
        path: 'granulats-marins',
        name: 'statistiques-granulats-marins',
        component: StatistiquesGranulatsMarins
      }
    ]
  },
  // url /stats : demande de Samuel
  // pour avoir une uniformité entre toutes les start-ups
  {
    path: '/stats',
    redirect: 'statistiques'
  },
  {
    path: '/',
    redirect: 'titres'
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'erreur',
    component: Error,
    props: {
      message: {
        type: 'error',
        value: 'Page introuvable'
      }
    }
  }
]

const history = createWebHistory()

const router = createRouter({ routes, history })

router.beforeEach(async (to, from, next) => {
  if (store.state.menu.component) {
    store.commit('menuClose')
  }

  if (store.state.error && to.name !== from.name) {
    store.dispatch('errorRemove')
  }

  next()
})

router.afterEach((to, from) => {})

export default router
