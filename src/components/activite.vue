<template>
  <Card v-if="!loaded">
    <Loader />
  </Card>
  <Card v-else>
    <h6>Activité</h6>
    <h1>
      {{ activite.id }} /
      {{ activite.annee }}
    </h1>

    <ActiviteDetail
      :key="activite.id"
      :activite="activite"
    />
  </Card>
</template>

<script>
import Card from './_ui/card.vue'
import Loader from './_ui/loader.vue'
import ActiviteDetail from './activite/detail.vue'

export default {
  components: {
    Loader,
    Card,
    ActiviteDetail
  },

  computed: {
    activite() {
      return this.$store.state.activite.current
    },

    user() {
      return this.$store.state.user.current
    },

    loaded() {
      return !!this.activite
    }
  },

  watch: {
    $route: 'get',

    user: 'get'
  },

  created() {
    this.get()
  },

  beforeDestroy() {
    this.$store.commit('activite/reset')
  },

  methods: {
    async get() {
      await this.$store.dispatch('activite/get', this.$route.params.id)
    }
  }
}
</script>
