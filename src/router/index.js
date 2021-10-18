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
const MetaTitre = () => import('../components/meta-titre.vue')
const MetaDemarche = () => import('../components/meta-demarche.vue')
const MetaEtape = () => import('../components/meta-etape.vue')
const MetaActivite = () => import('../components/meta-activite.vue')
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
const ActiviteEdition = () => import('../components/activite-edition.vue')

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
    path: '/metas/titre',
    name: 'meta-titre',
    component: MetaTitre
  },
  {
    path: '/metas/demarche',
    name: 'meta-demarche',
    component: MetaDemarche
  },
  {
    path: '/metas/etape',
    name: 'meta-etape',
    component: MetaEtape
  },
  {
    path: '/metas/activite',
    name: 'meta-activite',
    component: MetaActivite
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
    path: '/activites/:id/edition',
    name: 'activite-edition',
    component: ActiviteEdition
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

  next()
})

router.afterEach((to, from) => {
  // si on enlève l’erreur dans le beforeEach, cela va enlever l’erreur et tenter d’afficher l’ancien composant qui va
  // potentiellement regénérer une erreur. Il faut donc attendre que la route soit changée pour l’enlever.
  if (store.state.error && to.name !== from.name) {
    store.dispatch('errorRemove')
  }
})

export default router
