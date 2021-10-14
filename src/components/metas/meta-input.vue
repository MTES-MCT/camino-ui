<template>
  <div>
    <slot></slot>
    <select
      v-if="colonne.type === 'entities'"
      v-model="element[colonne.id]"
      class="py-xs px-s mb-s"
    >
      <option
        v-for="entity in entitiesGet(colonne)"
        :key="entity.id"
        :value="entity.id"
      >
        {{ entityLabelGet(colonne, entity) }}
      </option>
    </select>
    <input
      v-else-if="colonne.type === Number"
      v-model.number="element[colonne.id]"
      type="number"
      class="px-s py-xs mb-s text-right"
      min="1"
    />
    <InputDate
      v-else-if="colonne.type === Date"
      v-model="element[colonne.id]"
      class="mb-s"
      :padding="'px-s py-xs'"
    />
    <input
      v-else-if="colonne.type === Boolean"
      v-model="element[colonne.id]"
      type="checkbox"
      class="px-s py-xs mb-s"
    />
    <select
      v-else-if="colonne.type === Array"
      v-model="element[colonne.id]"
      class="py-xs px-s mb-s"
    >
      <option v-for="el in colonne.elements" :key="el" :value="el">
        {{ el }}
      </option>
    </select>
    <textarea
      v-else-if="colonne.type === String || colonne.type === 'json'"
      v-model="element[colonne.id]"
      rows="1"
      class="px-s py-xs mb-s"
    />
    <input
      v-else
      v-model="element[colonne.id]"
      type="text"
      class="px-s py-xs mb-s"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputDate from '@/components/_ui/input-date.vue'
import metasIndex from '@/store/metas-definitions'

export default defineComponent({
  components: { InputDate },
  props: {
    colonne: { type: Object, required: true },
    element: { type: Object, required: true },
    joinTable: { type: String, default: '' }
  },

  computed: {
    entities() {
      return this.$store.state.meta.elementsIndex
    }
  },

  methods: {
    entitiesGet(colonne) {
      const entities = this.entities[colonne.entities]
      if (!this.joinTable) {
        return entities
      }

      const definitions = metasIndex[this.joinTable]
      const idsUsed = this.entities[this.joinTable]
        .filter(e =>
          definitions.ids.every(
            id => id === colonne.id || e[id] === this.element[id]
          )
        )
        .map(e => e[colonne.id])

      return entities.filter(e => !idsUsed.includes(e.id))
    },
    entityLabelGet(colonne, entity) {
      return entity ? metasIndex[colonne.entities].labelGet(entity) : ''
    }
  }
})
</script>
