<template>
  <div class="mb">
    <h5>{{ filter.name }}</h5>
    <hr class="mb-s" />

    <InputAutocomplete
      v-if="options?.length || lazyLoaded"
      :selected="values"
      :options="options"
      value-prop="id"
      label-prop="nom"
      class="p-s"
      @opened="$emit('opened', $event)"
      @update:selected="updateHandler"
      @search="search"
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

  emits: ['opened', 'search'],

  data: () => ({
    lazyLoaded: false
  }),

  computed: {
    values() {
      return this.filter.value || []
    },
    options() {
      return this.filter.elements
    }
  },
  async created() {
    if (
      this.filter.type === 'autocomplete' &&
      this.filter.lazy &&
      this.filter.value?.length
    ) {
      const result = await this.filter.load(this.filter.value)
      this.filter.elements = result.elements
    }
    if (this.filter.lazy) {
      this.lazyLoaded = true
    }
  },
  methods: {
    updateHandler(e: string[]) {
      this.filter.value = e
    },

    async search(value: string) {
      if (this.filter.lazy) {
        const result = await this.filter.search(value)

        // Si les options déjà selectionnées ne sont plus disponibles dans la nouvelle
        // liste d’options, on les ajoute à la nouvelle liste pour conserver notre sélection
        const options = [...result.elements]
        this.filter.value?.forEach((optionId: string) => {
          if (!options || !options.some(o => o.id === optionId)) {
            const oldOption = this.filter.elements.find(
              (o: { id: string }) => o.id === optionId
            )
            options.push(oldOption)
          }
        })

        this.filter.elements = options
      }
    }
  }
})
</script>
