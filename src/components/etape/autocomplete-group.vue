<template>
  <div v-for="(entity, n) in entities || []" :key="`entity-${n}`">
    <div class="flex mb-s">
      <div class="mr-s flex-grow">
        <EntityInputAutocomplete
          v-model:entity-id="entity.id"
          :options="options"
          :options-disabled="optionsDisabled"
          :placeholder="placeholder"
          :remove-item-button="false"
        />
      </div>
      <button class="btn py-s px-m rnd-xs" @click="entityRemove(n)">
        <i class="icon-24 icon-minus" />
      </button>
    </div>
    <slot :entity="entity" />
  </div>

  <EntityInputAutocomplete
    :entity-id="entitySelected"
    :options="options"
    :options-disabled="optionsDisabled"
    :placeholder="placeholder"
    :remove-item-button="false"
    @update:entity-id="entityAdd"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import EntityInputAutocomplete from './entity-input-autocomplete.vue'

interface IModelElement {
  id: string
}

interface IOption {
  id: string
  nom: string
}

export default defineComponent({
  components: { EntityInputAutocomplete },

  props: {
    entities: {
      type: Array as PropType<Array<IModelElement>>,
      required: true,
      default: () => []
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

  data: () => ({
    entitySelected: null
  }),

  methods: {
    entityAdd(entityId: string) {
      if (entityId) {
        this.entities.push({ id: entityId })
        this.entitySelected = null
      }
    },

    entityRemove(entityIndex: number) {
      this.entities.splice(entityIndex, 1)
    }
  }
})
</script>
