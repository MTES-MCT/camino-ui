import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import Titre from '../components/titre.vue'
import Titres from '../components/titres.vue'
import Utilisateur from '../components/utilisateur.vue'
import Utilisateurs from '../components/utilisateurs.vue'
import Entreprise from '../components/entreprise.vue'
import Entreprises from '../components/entreprises.vue'
import Error from '../components/error.vue'
import About from '../components/content/about.vue'
import Accessibilite from '../components/content/accessibilite.vue'
import Contribution from '../components/content/contribution.vue'
import Cgu from '../components/content/cgu.vue'
import Cgu1 from '../components/content/cgu-1-0-0.vue'
import MentionsLegales from '../components/content/mentions-legales.vue'
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
    path: '/cgu',
    name: 'cgu',
    component: Cgu
  },
  {
    path: '/cgu/1-0-0',
    name: 'cgu-1-0-0',
    component: Cgu1
  },
  {
    path: '/mentions-legales',
    name: 'mentions-legales',
    component: MentionsLegales
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
    if (to.name === from.name) {
      return false
    }

    if (savedPosition) {
      return savedPosition
    }

    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  store.commit('menuClose')
  if (store.state.error) {
    store.commit('errorRemove')
  }
  next()
})

router.afterEach(() => {})

export default router
