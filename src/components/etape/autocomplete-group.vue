<template>
  <div v-for="(element, n) in modelElements || []" :key="`element-${n}`">
    <div class="flex mb-s">
      <div class="mr-s flex-grow">
        <EtapeInputAutocomplete
          v-model:model-element-id="element.id"
          :options="options"
          :options-disabled="optionsDisabled"
          :placeholder="placeholder"
        />
      </div>
      <button class="btn py-s px-m rnd-xs" @click="elementRemove(n)">
        <i class="icon-24 icon-minus" />
      </button>
    </div>
    <div v-if="element.id && operateur" class="h6 mb">
      <label>
        <input v-model="element.operateur" type="checkbox" class="mr-xs" />
        Opérateur
      </label>
    </div>
  </div>

  <EtapeInputAutocomplete
    :model-element-id="elementSelected"
    :options="options"
    :options-disabled="optionsDisabled"
    :placeholder="placeholder"
    @update:model-element-id="elementAdd"
  />

  <div v-if="modelElementsLength" class="h6">
    <label>
      <input v-model="incertitudes" type="checkbox" class="mr-xs" />
      Incertain
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import EtapeInputAutocomplete from './etape-input-autocomplete.vue'

interface IModelElement {
  id: string
  operateur?: boolean
}

interface IOption {
  id: string
  nom: string
}

export default defineComponent({
  components: { EtapeInputAutocomplete },

  props: {
    modelElements: {
      type: Array as PropType<Array<IModelElement>>,
      required: true,
      default: () => []
    },
    incertitudes: {
      type: Boolean,
      default: false
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
    operateur: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    }
  },

  data: () => ({
    elementSelected: null
  }),

  computed: {
    modelElementsLength() {
      return this.modelElements.filter(({ id }) => id).length || 0
    }
  },

  methods: {
    elementAdd(elementId: string) {
      if (elementId) {
        this.modelElements.push({ id: elementId })
        this.elementSelected = null
      }
    }
  }
})
</script>
