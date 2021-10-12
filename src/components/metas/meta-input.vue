<template>
  <div>
    <slot></slot>
    <input
      v-if="colonne.type === Number"
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

export default defineComponent({
  components: { InputDate },
  props: {
    colonne: { type: Object, required: true },
    element: { type: Object, required: true }
  }
})
</script>
