<template>
  <div class="tablet-blobs header-blobs mb">
    <div class="tablet-blob-1-3">
      <div v-if="!apiError" class="flex">
        <div class="flex-right">
          <div class="mt-m tablet-mb-m flex">
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
    <div class="tablet-blob-2-3 pt-m">
      <router-link
        v-if="$route.name !== 'titres'"
        :to="{ name: 'titres' }"
        class="flex text-decoration-none"
      >
        <img src="/img/logo-rf.svg" class="logo mr" />
        <div>
          <p class="mb-0 mt-xs title">Cadastre minier</p>
          <p class="h5 mb-0 bold">
            camino<span class="color-neutral">.beta.gouv.fr</span>
          </p>
        </div>
      </router-link>
      <span v-else class="flex">
        <img src="/img/logo-rf.svg" class="logo mr" />
        <div>
          <p class="mb-0 mt-xs title">Cadastre minier</p>
          <p class="h5 mb-0 bold">
            camino<span class="color-neutral">.beta.gouv.fr</span>
          </p>
        </div>
      </span>
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
    loaded: { type: Boolean, default: false }
  },

  computed: {
    apiError() {
      return this.$store.state.apiError
    }
  }
}
</script>
