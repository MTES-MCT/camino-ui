<template>
  <Journaux />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Journaux from './journaux/journaux.vue'

export default defineComponent({
  components: { Journaux },

  watch: {
    user: 'refresh',

    '$route.query': {
      handler: function () {
        this.$store.dispatch('journaux/routeUpdate')
      }
    }
  },

  unmounted() {
    this.$store.commit('journaux/reset')
  },

  methods: {
    async refresh() {
      await this.$store.dispatch('journaux/init')
    }
  }
})
</script>
