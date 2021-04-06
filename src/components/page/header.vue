<template>
  <div class="tablet-blobs header-blobs mb">
    <div class="tablet-blob-1-3">
      <div v-if="!apiError" class="flex">
        <div class="flex-right">
          <div class="mt-m tablet-mb-m flex">
            <div v-if="loading" class="loader" />
            <div v-if="loaded" class="ml-xs">
              <MenuButton />
            </div>
            <div v-if="loaded" class="ml-xs">
              <UserButton />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tablet-blob-2-3 pt-m relative">
      <router-link v-if="$route.name !== 'titres'" :to="{ name: 'titres' }">
        <img src="/img/logo-camino.svg" class="logo" />
      </router-link>
      <span v-else>
        <img src="/img/logo-camino.svg" class="logo" />
      </span>
      <p class="h5 camino-header-baseline absolute">
        Le cadastre minier numérique ouvert
      </p>
    </div>
  </div>
</template>

<script>
import UserButton from '../user/button.vue'
import MenuButton from '../menu/button.vue'

export default {
  name: 'PageHeader',

  components: {
    UserButton,
    MenuButton
  },

  props: {
    loaded: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    apiError() {
      return this.$store.state.apiError
    },

    loading() {
      return this.$store.state.loading.length > 0
    }
  }
}
</script>
