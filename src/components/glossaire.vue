<template>
  <div>
    <h1 class="mt-m">Glossaire</h1>

    <hr class="mb-xl" />

    <div class="desktop-blobs">
      <div class="desktop-blob-1-3">
        <Sommaire :slug="slug" :definitions="definitions" />
      </div>
      <div class="desktop-blob-2-3">
        <Router-view v-if="slug" :slug="slug" :definition="definition" />
        <div v-else>
          <h3>Définitions des termes utilisés dans Camino.</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sommaire from './glossaire/sommaire.vue'

export default {
  name: 'Glossaire',

  components: { Sommaire },

  data() {
    return {
      loaded: false
    }
  },

  computed: {
    definitions() {
      return this.$store.state.definitions.elements
    },

    definition() {
      return this.definitions.find(d => d.slug === this.slug) || {}
    },

    slug() {
      return this.$route.params.slug
    }
  },

  async created() {
    await this.definitionsGet()
  },

  methods: {
    async definitionsGet() {
      await this.$store.dispatch('definitions/get')
      if (!this.loaded) {
        this.loaded = true
      }
    }
  }
}
</script>
