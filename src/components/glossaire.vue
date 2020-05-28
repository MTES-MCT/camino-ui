<template>
  <div class="desktop-blobs pt-s">
    <div class="desktop-blob-2-3">
      <h1 class="mt-xs mb-m">
        Glossaire
      </h1>
    </div>
    <div class="desktop-blob-2-3">
      <Definitions
        v-for="definition in definitions"
        :id="definition.id"
        :key="definition.id"
        :definition.sync="definition"
      />
    </div>
  </div>
</template>

<script>
import Definitions from './definitions.vue'

export default {
  name: 'Glossaire',

  components: { Definitions },

  computed: {
    definitions() {
      return this.$store.state.definitions.list
    }
  },

  created() {
    this.definitionsGet()
  },

  methods: {
    async definitionsGet() {
      await this.$store.dispatch('definitions/get')
    }
  }
}
</script>
