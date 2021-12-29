<template>
  <div class="mb">
    <h5>{{ filter.name }}</h5>
    <hr class="mb-s" />

    <AutocompleteInput v-model="filter.value" :items="items" class="p-s" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AutocompleteInput from './autocomplete-input.vue'

export default defineComponent({
  components: { AutocompleteInput },

  props: {
    filter: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      items: []
    }
  },

  mounted() {
    this.fetchItems()
  },

  methods: {
    // A privilégier au dépend d'une computed property,
    // pour pallier aux problèmes de réactivité entre Vue et Choices.js
    async fetchItems() {
      const id = this.filter.id

      if (id === 'substances') {
        await this.$store.dispatch(
          'definitions/entreesGet',
          'substances-legales'
        )
        this.items =
          this.$store.state.definitions.entrees.length > 0
            ? this.$store.state.definitions.entrees.map(e => ({
                id: e.id,
                text: e.nom
              }))
            : []
      }
    }
  }
})
</script>
