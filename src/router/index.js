import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import NProgress from 'nprogress'
import Titre from '@/components/Titre.vue'
// import TitleDetails from '@/components/TitleDetails.vue'
import Titres from '@/components/Titres.vue'
import Erreur from '@/components/Erreur.vue'

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
    path: '/Erreur',
    name: 'erreur',
    component: Erreur,
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true
  },
  {
    path: '/',
    redirect: 'titres'
  },
  {
    path: '*',
    redirect: 'erreur'
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

router.beforeEach((routeTo, routeFrom, next) => {
  if (routeFrom.name) {
    NProgress.start()
  }

  return next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
