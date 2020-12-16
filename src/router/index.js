import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import Titre from '../components/titre.vue'
import Titres from '../components/titres.vue'
import Demarches from '../components/demarches.vue'
import Utilisateur from '../components/utilisateur.vue'
import Utilisateurs from '../components/utilisateurs.vue'
import Entreprise from '../components/entreprise.vue'
import Entreprises from '../components/entreprises.vue'
import Administration from '../components/administration.vue'
import Administrations from '../components/administrations.vue'
import Activite from '../components/activite.vue'
import Activites from '../components/activites.vue'
import Glossaire from '../components/glossaire.vue'
import Error from '../components/error.vue'
import About from '../components/content/about.vue'
import Accessibilite from '../components/content/accessibilite.vue'
import Contribution from '../components/content/contribution.vue'
import MentionsLegalesCGU from '../components/content/mentions-legales-cgu.vue'
import Cgu1 from '../components/content/cgu-1-0-0.vue'
import UserPasswordInit from '../components/user/password-init.vue'
import UserAdd from '../components/user/add.vue'
import Definition from '../components/glossaire/definition.vue'
import store from '../store'

const StatistiquesGlobales = () =>
  import(
    /* webpackChunkName: "stats" */ '../components/statistiques/globales.vue'
  )
const Statistiques = () =>
  import(/* webpackChunkName: "stats" */ '../components/statistiques.vue')
const StatistiquesGuyane = () =>
  import(
    /* webpackChunkName: "stats" */ '../components/statistiques/guyane.vue'
  )
const StatistiquesGranulatsMarins = () =>
  import(
    /* webpackChunkName: "stats" */ '../components/statistiques/granulats-marins.vue'
  )

Vue.use(VueRouter)

Vue.use(VueMeta, { keyName: 'page' })

const routes = [
  {
    path: '/titres',
    name: 'titres',
    component: Titres
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
    name: 'creation-de-compte',
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
  {
    path: '/stats',
    redirect: 'statistiques'
  },
  {
    path: '/',
    redirect: 'titres'
  },
  {
    path: '/erreur',
    alias: '*',
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

const router = new VueRouter({
  routes,
  mode: 'history'
})

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
