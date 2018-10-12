<template>
  <div class="tablet-blobs header-blobs">
    <div class="tablet-blob-1-4 desktop-blob-1-2 large-blob-2-3">
      <div  
        v-if="!apiError" 
        class="flex"
      >
        <ul class="header-menu hide">
          <li :class="{ active: $route.name === 'titres' || $route.name === 'titre' }">
            <router-link
              :to="{ name: 'titres' }"
              class="btn-transparent px pb-m pt-xl"
              active-class="active"
            >Titres</router-link>
          </li>
        </ul>
        <div class="flex-right">
          <ul class="list-inline">
            <li v-if="permissions(['super', 'admin'])"><menu-button class="mt-l" /></li>
            <li><utilisateur-button class="mt-l" /></li>
          </ul>
        </div>
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
  
</template>

<script>
import UtilisateurButton from './utilisateur/button.vue'
import MenuButton from './menu/button.vue'

export default {
  name: 'PageHeader',

  components: {
    UtilisateurButton,
    MenuButton
  },

  computed: {
    apiError () {
      return this.$store.state.apiError
    }
  }
}
</script>
