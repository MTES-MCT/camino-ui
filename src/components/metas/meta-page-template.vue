<template>
  <div class="desktop-blobs">
    <div class="desktop-blob-2-3">
      <router-link :to="{ name: 'metas' }">
        <h5>Métas</h5>
      </router-link>
      <h1>
        <span class="cap-first">{{ title }}</span>
      </h1>
    </div>
  </div>

  <div class="line-neutral width-full mb-m" />

  <div class="mb-xxl">
    <DefinitionEdit :definitions-tree="definitionsTree" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DefinitionEdit from '@/components/metas/definition-edit.vue'

export default defineComponent({
  components: {
    DefinitionEdit
  },

  props: {
    title: {
      type: String,
      required: true,
      default: ''
    },

    definitionsTree: {
      type: Object,
      required: true,
      default: () => ({})
    }
  }
})
</script>
