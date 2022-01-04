<template>
  <div class="mb">
    <h5>{{ filter.name }}</h5>
    <hr class="mb-s" />

    <InputAutocomplete
      :model-value="[filter.value]"
      :items="items"
      :max-items="1"
      class="p-s"
      @update:model-value="
        filter.value = $event.length ? $event[0].value : null
      "
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
      items: []
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
