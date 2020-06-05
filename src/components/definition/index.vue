<template>
  <div>
    <h2>{{ definition.nom }}</h2>
    <div class="mb-l">
      {{ definition.description }}
    </div>
    <div v-if="elements">
      <DefinitionElement
        v-for="element in elements"
        :id="id"
        :key="element.id"
        :definition="element"
      />
    </div>
    <div class="line mb" />
  </div>
</template>

<script>
import DefinitionElement from './element.vue'

export default {
  name: 'Definition',

  components: { DefinitionElement },

  props: {
    definition: { type: Object, default: () => ({}) },
    id: { type: String, default: () => '' }
  },

  computed: {
    elements() {
      return this.definition.elements
    }
  }
}
</script>
