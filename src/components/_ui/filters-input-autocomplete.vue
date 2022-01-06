<template>
  <div class="mb">
    <h5>{{ filter.name }}</h5>
    <hr class="mb-s" />

    <InputAutocomplete
      :selected="values"
      :options="options"
      :options-disabled="values"
      value-prop="id"
      label-prop="text"
      class="p-s"
      @update:selected="handler"
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

  computed: {
    values() {
      return this.filter.value.split(', ').filter(v => v !== '')
    }
  },

  methods: {
    handler(e) {
      console.log(e)
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
                id: e.id,
                text: e.nom
              }))
            : []
      }
    }
  }
})
</script>
