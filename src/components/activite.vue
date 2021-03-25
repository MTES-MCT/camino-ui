<template>
  <Loader v-if="!loaded" />
  <div v-else>
    <h6>Activité</h6>
    <h1 class="cap-first">
      {{ activite.titre.nom }}
    </h1>

    <ActiviteDetail
      :key="activite.id"
      :activite="activite"
      :context="{ name: 'titreActivite', id: activite.id }"
      class="mb"
    />
  </div>
</template>

<script>
import Loader from './_ui/loader.vue'

import ActiviteDetail from './activite/detail.vue'

export default {
  components: {
    Loader,
    ActiviteDetail
  },

  computed: {
    activite() {
      return this.$store.state.titreActivite.current
    },

    user() {
      return this.$store.state.user.current
    },

    loaded() {
      return !!this.activite
    }
  },

  watch: {
    user: 'get'
  },

  created() {
    this.get()
  },

  beforeUnmount() {
    this.$store.commit('titreActivite/reset')
  },

  methods: {
    async get() {
      await this.$store.dispatch('titreActivite/get', this.$route.params.id)
    }
  }
}
</script>
