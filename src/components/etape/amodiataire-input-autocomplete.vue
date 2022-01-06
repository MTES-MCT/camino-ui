<template>
  <InputAutocomplete
    v-if="options?.length"
    :selected="amodiataireId?.split()"
    :options="options"
    value-prop="id"
    label-prop="label"
    :max-items="1"
    :options-disabled="optionsDisabled"
    @update:selected="
      $emit('update:amodiataireId', $event.length ? $event[0].value : '')
    "
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
      required: true,
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

  data() {
    return {
      amodiataires: [] as IEntreprise[]
    }
  },

  computed: {
    options(): IItem[] {
      return this.entreprises.map(e => ({
        id: e.id,
        label: e.nom + ' (' + e.id + ')'
      }))
    }
  }
})
</script>
