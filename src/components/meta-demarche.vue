<template>
  <definition-edit :definitions-tree="definitionsTree"></definition-edit>
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
