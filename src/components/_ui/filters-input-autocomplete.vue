<template>
  <div class="mb">
    <h5>{{ filter.name }}</h5>
    <hr class="mb-s" />

    <InputAutocomplete
      :selected="filter.value.split(', ')"
      :options="options"
      value-prop="text"
      label-prop="text"
      class="p-s"
      @update:selected="filter.value = $event.map(e => e.value).join(', ')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputAutocomplete from './input-autocomplete.vue'

export default defineComponent({
  components: { InputAutocomplete },

  props: {
    filter: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      options: []
    }
  },

  async mounted() {
    await this.fetchItems()
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
        this.options =
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
