<template>
  <InputAutocomplete
    v-if="options?.length"
    :selected="selected"
    :options="formattedOptions"
    value-prop="id"
    label-prop="label"
    :max-items="1"
    :options-disabled="optionsDisabled"
    :placeholder="placeholder"
    @update:selected="$emit('update:entityId', $event)"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import InputAutocomplete from '../_ui/input-autocomplete.vue'

interface IOption {
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
    entityId: {
      type: String,
      default: ''
    },
    options: {
      type: Array as PropType<Array<IOption>>,
      required: true,
      default: () => []
    },
    optionsDisabled: {
      type: Array as PropType<Array<IOption>>,
      required: true,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ''
    }
  },

  emits: ['update:entityId'],

  computed: {
    selected() {
      return this.entityId && this.entityId !== '' ? [this.entityId] : undefined
    },
    formattedOptions(): IItem[] {
      return this.options.map(e => ({
        id: e.id,
        label: e.nom + ' (' + e.id + ')'
      }))
    }
  }
})
</script>
