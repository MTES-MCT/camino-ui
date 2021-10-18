<template>
  <Metas title="Étape" :definitions-tree="definitionsTree" />
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
        id: 'etapes-types',
        foreignKey: 'etapeTypeId',
        definitions: [
          {
            id: 'etapes-statuts',
            foreignKey: 'etapeStatutId',
            joinTable: 'etapes-types--etapes-statuts',
            definitions: []
          },
          {
            id: 'documents-types',
            foreignKey: 'documentTypeId',
            joinTable: 'etapes-types--documents-types',
            definitions: []
          },
          {
            id: 'documents-types',
            foreignKey: 'documentTypeId',
            joinTable: 'etapes-types--justificatifs-types',
            definitions: []
          },
          {
            id: 'titres-types',
            foreignKey: 'titreTypeId',
            definitions: [
              {
                id: 'demarches-types',
                foreignKey: 'demarcheTypeId',
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
