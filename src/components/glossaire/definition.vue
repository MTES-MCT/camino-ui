<template>
  <div>
    <h2>{{ definition.nom }}</h2>
    <div
      class="mb-l"
    />
    {{ descriptionHTML }}
  </div>
  <div v-if="elements">
    <DefinitionSection
      v-for="element in elements"
      :id="definitionId"
      :key="element.id"
      :definition="element"
    />
  </div>
</template>

<script>
import format from './index'
import DefinitionSection from './definition-section.vue'

export default {
  name: 'Definition',

  components: { DefinitionSection },

  props: {
    definition: { type: Object, required: true },
    slug: { type: String, required: true }
  },

  computed: {
    elements() {
      return this.definitionElements
    },

    descriptionHTML() {
      return format(this.definition.description)
    }
  },

  async created() {
    await this.sectionsGet()
  },

  methods: {
    async sectionsGet() {
      await this.$store.dispatch('sectionGet/get', slug)
    }
  }
}
</script>
