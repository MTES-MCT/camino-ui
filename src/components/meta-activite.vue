<template>
  <div class="desktop-blobs">
    <div class="desktop-blob-2-3">
      <h1 class="mt-xs mb-m cap-first">métas</h1>
    </div>
  </div>

  <DefinitionEdit :definitions-tree="definitionsTree" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DefinitionEdit from '@/components/metas/definition-edit.vue'

export default defineComponent({
  components: {
    DefinitionEdit
  },

  data() {
    return {
      definitionsTree: {
        id: 'activites-types',
        foreignKey: 'activiteTypeId',
        definitions: [
          {
            id: 'titres-types',
            foreignKey: 'titreTypeId',
            joinTable: 'activites-types--titres-types'
          },
          {
            id: 'documents-types',
            foreignKey: 'documentTypeId',
            joinTable: 'activites-types--documents-types'
          },
          {
            id: 'pays',
            foreignKey: 'paysId',
            joinTable: 'activites-types--pays'
          }
        ]
      }
    }
  }
})
</script>
