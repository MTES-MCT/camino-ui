<template>
  <div class="tablet-blobs header-blobs">
    <div class="tablet-blob-1-3 desktop-blob-1-2 large-blob-2-3">
      <div
        v-if="!apiError"
        class="flex"
      >
        <div class="flex-right">
          <div class="mt tablet-mb flex">
            <div
              v-if="loading"
              class="loader"
            />
            <div
              v-if="permissionsCheck(['super', 'admin'])"
              class="ml-xs"
            >
              <MenuButton />
            </div>
            <div class="ml-xs">
              <UserButton />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tablet-blob-2-3 desktop-blob-1-2 large-blob-1-3">
      <RouterLink
        v-if="$route.name !== 'titres'"
        :to="{ name: 'titres' }"
        class="pt-m pr-m inline-block full-x"
      >
        <img src="../../public/img/logo-camino.svg">
      </RouterLink>
      <span
        v-else
        class="pt-m pr-m inline-block full-x"
      >
        <img src="../../public/img/logo-camino.svg">
      </span>
      <p class="h5 color-neutral camino-header-baseline tablet-mb-s">
        Le cadastre minier numérique ouvert
      </p>
    </div>
  </div>
</template>

<script>
import UserButton from './user/button.vue'
import MenuButton from './menu/button.vue'

export default {
  name: 'PageHeader',

  components: {
    UserButton,
    MenuButton
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
