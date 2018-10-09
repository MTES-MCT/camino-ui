<template>
  <div>
    <div class="tablet-blobs blobs-header">
      <div class="tablet-blob-1-4 desktop-blob-1-2 large-blob-2-3">
        <div  
          v-if="!apiError" 
          class="flex"
        >
          <ul class="header-menu hide">
            <li :class="{ active: $route.name === 'titres' || $route.name === 'titre' }">
              <router-link
                :to="{ name: 'titres' }"
                class="btn-menu px pb-m pt-xl"
              >Titres</router-link>
            </li>
            <li :class="{ active: $route.name === 'utilisateurs' || $route.name === 'utilisateur' }">
              <router-link
                :to="{ name: 'utilisateurs' }"
                class="btn-menu px pb-m pt-xl"
              >Utilisateurs</router-link>
            </li>
          </ul>
          <login class="mt-l header-login" />
        </div>
      </div>
      <div class="tablet-blob-3-4 desktop-blob-1-2 large-blob-1-3">
        <router-link
          :to="{ name: 'titres' }"
          class="pt pr-m mb-xs inline-block full-x"
        >
          <img src="../../public/img/logo-camino.svg">
        </router-link>
        <p class="h5 color-neutral camino-header-baseline">Le cadastre minier numérique ouvert</p>
      </div>
    </div>
  </div>
  
</template>

<script>
import Login from './ui/login.vue'

export default {
  name: 'PageHeader',

  components: {
    Login
  },

  computed: {
    apiError () {
      return this.$store.state.apiError
    }
  }
}
</script>
