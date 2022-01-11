<template>
  <div class="mb">
    <h5>{{ filter.name }}</h5>
    <hr class="mb-s" />

    <InputAutocomplete
      v-if="options?.length"
      :selected="values"
      :options="options"
      value-prop="text"
      label-prop="text"
      class="p-s"
      @update:selected="updateHandler"
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

  computed: {
    values() {
      return this.filter.value.split(', ').filter(v => v !== '')
    }
  },

  async mounted() {
    await this.fetchItems()
  },

  methods: {
    updateHandler(e) {
      this.filter.value = e.join(', ')
    },
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
                text: e.nom
              }))
            : []
      }
    }
  }
})
</script>
