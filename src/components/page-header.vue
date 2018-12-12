<template>
  <div class="tablet-blobs header-blobs">
    <div class="tablet-blob-1-4 desktop-blob-1-2 large-blob-2-3">
      <div
        v-if="!apiError"
        class="flex"
      >
        <ul class="header-menu hide">
          <li
            :class="{
              active: $route.name === 'titres' || $route.name === 'titre'
            }"
          >
            <RouterLink
              :to="{ name: 'titres' }"
              class="btn-transparent px pb-m pt-xl"
              active-class="active"
            >
              Titres
            </RouterLink>
          </li>
        </ul>
        <div class="flex-right">
          <ul class="list-inline mt-l">
            <li class="ml-xs">
              <div
                v-if="loading"
                class="loader"
              />
            </li>
            <li
              v-if="permissionsCheck(['super', 'admin'])"
              class="ml-xs"
            >
              <MenuButton />
            </li>
            <li class="ml-xs">
              <UserButton />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="tablet-blob-3-4 desktop-blob-1-2 large-blob-1-3">
      <RouterLink
        :to="{ name: 'titres' }"
        class="pt pr-m mb-xs inline-block full-x"
      >
        <img src="../../public/img/logo-camino.svg">
      </RouterLink>
      <p class="h5 color-neutral camino-header-baseline">
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
