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
        id: 'demarches-types',
        foreignKey: 'demarcheTypeId',
        definitions: [
          {
            id: 'titres-types',
            foreignKey: 'titreTypeId',
            joinTable: 'titres-types--demarches-types',
            definitions: [
              {
                id: 'etapes-types',
                foreignKey: 'etapeTypeId',
                joinTable: 'titres-types--demarches-types--etapes-types',
                definitions: [
                  {
                    id: 'documents-types',
                    foreignKey: 'documentTypeId',
                    joinTable:
                      'titres-types--demarches-types--etapes-types--documents-types',
                    definitions: []
                  },
                  {
                    id: 'documents-types',
                    foreignKey: 'documentTypeId',
                    joinTable:
                      'titres-types--demarches-types--etapes-types--justificatifs-types',
                    definitions: []
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  }
})
</script>
