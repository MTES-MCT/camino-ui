<template>
  <div>
    <slot></slot>
    <EditNumber
      v-if="colonne.type === Number"
      :value="element[colonne.id]"
      @update="$emit('update', $event, element, colonne.id)"
    />
    <EditDate
      v-else-if="colonne.type === Date"
      :value="element[colonne.id] || ''"
      @update="$emit('update', $event, element, colonne.id)"
    />
    <EditBoolean
      v-else-if="colonne.type === Boolean"
      :value="element[colonne.id] || false"
      @update="$emit('update', $event, element, colonne.id)"
    />
    <EditArray
      v-else-if="colonne.type === Array"
      :value="element[colonne.id] || ''"
      :elements="colonne.elements"
      @update="$emit('update', $event, element, colonne.id)"
    />
    <EditJson
      v-else-if="colonne.type === 'json'"
      :value="element[colonne.id]"
      @update="$emit('update', $event, element, colonne.id)"
    />
    <EditString
      v-else-if="colonne.type === String"
      :value="element[colonne.id] || ''"
      @update="$emit('update', $event, element, colonne.id)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EditString from '@/components/_ui/edit-string.vue'
import EditNumber from '@/components/_ui/edit-number.vue'
import EditArray from '@/components/_ui/edit-array.vue'
import EditBoolean from '@/components/_ui/edit-boolean.vue'
import EditDate from '@/components/_ui/edit-date.vue'
import EditJson from '@/components/_ui/edit-json.vue'

export default defineComponent({
  components: {
    EditString,
    EditNumber,
    EditArray,
    EditBoolean,
    EditDate,
    EditJson
  },
  props: {
    colonne: { type: Object, required: true },
    element: { type: Object, required: true }
  },

  emits: ['update']
})
</script>
