<template>
  <InputAutocomplete
    v-if="options?.length"
    :selected="selected"
    :options="options"
    value-prop="id"
    label-prop="label"
    :max-items="1"
    :options-disabled="optionsDisabled"
    placeholder="Sélectionner un amodiataire"
    @update:selected="updateHandler"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import InputAutocomplete from '../_ui/input-autocomplete.vue'

interface IEntreprise {
  id: string
  nom: string
}

interface IItem {
  id: string
  label: string
}

export default defineComponent({
  components: { InputAutocomplete },

  props: {
    amodiataireId: {
      type: String,
      default: ''
    },
    entreprises: {
      type: Array as PropType<Array<IEntreprise>>,
      required: true,
      default: () => []
    },
    optionsDisabled: {
      type: Array as PropType<Array<IEntreprise>>,
      required: true,
      default: () => []
    }
  },

  emits: ['update:amodiataireId'],

  computed: {
    selected() {
      return this.amodiataireId && this.amodiataireId !== ''
        ? [this.amodiataireId]
        : undefined
    },
    options(): IItem[] {
      return this.entreprises.map(e => ({
        id: e.id,
        label: e.nom + ' (' + e.id + ')'
      }))
    }
  },

  methods: {
    updateHandler(e: any) {
      this.$emit('update:amodiataireId', e)
    }
  }
})
</script>
