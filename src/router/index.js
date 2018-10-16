import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import Titre from '../components/titre.vue'
import Titres from '../components/titres.vue'
import Utilisateur from '../components/utilisateur.vue'
import Utilisateurs from '../components/utilisateurs.vue'
import Error from '../components/error.vue'
import About from '../components/content/about.vue'
import Accessibilite from '../components/content/accessibilite.vue'
import Contribution from '../components/content/contribution.vue'
import Cgu from '../components/content/cgu.vue'
import MentionsLegales from '../components/content/mentions-legales.vue'
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
    component: Utilisateurs,
    meta: { permissions: ['super', 'admin'] }
  },
  {
    path: '/utilisateurs/:id',
    name: 'utilisateur',
    component: Utilisateur
    // children: [
    //   {
    //     path: 'activite',
    //     name: 'activite',
    //     component: TitleDetails
    //   }
    // ]
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
    path: '/mentions-legales',
    name: 'mentions-legales',
    component: MentionsLegales
  },
  {
    path: '/',
    redirect: 'titres'
  },
  {
    path: '/erreur',
    alias: '*',
    name: 'erreur',
    component: Error
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  store.commit('menuClose')
  next()
})

router.afterEach(() => {})

export default router
