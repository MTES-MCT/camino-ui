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
import Activite from '../components/activite.vue'
import Activites from '../components/activites.vue'
import Error from '../components/error.vue'
import About from '../components/content/about.vue'
import Accessibilite from '../components/content/accessibilite.vue'
import Contribution from '../components/content/contribution.vue'
import MentionsLegalesCGU from '../components/content/mentions-legales-cgu.vue'
import Cgu1 from '../components/content/cgu-1-0-0.vue'
import UserPasswordInit from '../components/user/password-init.vue'
import UserAdd from '../components/user/add.vue'
import Statistiques from '../components/content/statistiques.vue'
import store from '../store'

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
    // children: [
    //   {
    //     path: 'activite',
    //     name: 'activite',
    //     component: TitleDetails
    //   }
    // ]
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
    path: '/creation-de-compte',
    name: 'creation-de-compte',
    component: UserAdd
  },
  {
    path: '/statistiques',
    name: 'statistiques',
    component: Statistiques
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
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return { x: 0, y: 0 }
  }
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
