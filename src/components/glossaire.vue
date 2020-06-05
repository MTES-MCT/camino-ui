<template>
  <div>
    <MapPattern
      :domaines-ids="domainesIds"
      :types-ids="typesIds"
    />

    <h1 class="mt-m">
      Glossaire
    </h1>

    <div class="line-neutral mb" />
    <Definition
      v-for="definition in definitions"
      :id="definition.id"
      :key="definition.id"
      :definition="definition"
    />
  </div>
</template>

<script>
import Definition from './definition/index.vue'
import MapPattern from './map/pattern.vue'

export default {
  name: 'Glossaire',

  components: { Definition, MapPattern },

  computed: {
    definitions() {
      return this.$store.state.definitions.list
    },

    domainesIds() {
      const domaines = this.definitions.find(d => d.id === 'dom')

      return domaines && domaines.elements.map(e => e.id)
    },

    typesIds() {
      const types = this.definitions.find(d => d.id === 'tty')

      return types && types.elements.map(e => e.id)
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
