<template>
  <Metas title="Activité" :definitions-tree="definitionsTree" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Metas from '@/components/metas/meta-page-template.vue'

export default defineComponent({
  components: {
    Metas
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
