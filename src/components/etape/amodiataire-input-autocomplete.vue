<template>
  <InputAutocomplete :items="items" @update:model-value="updateHandler" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import InputAutocomplete from '../_ui/input-autocomplete.vue'

interface Entreprise {
  id: string
  name: string
}

export default defineComponent({
  components: { InputAutocomplete },

  props: {
    modelValue: {
      type: [] as PropType<string[]>,
      required: true,
      default: [] as string[]
    },
    entreprises: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  emits: ['update:modelValue'],

  data() {
    return {
      items: [] as Entreprise[]
    }
  },

  mounted() {
    this.setItems()
  },

  methods: {
    setItems() {
      this.items = this.entreprises.map(e => ({ id: e.id, text: e.nom }))
    },

    updateHandler(event) {
      const amodiataires = [...this.modelValue]
      console.log(event, amodiataires)
    }
  }
})
</script>
