<template>
  <Metas title="Titre" :definitions-tree="definitionsTree" />
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
        id: 'titres-types',
        foreignKey: 'titreTypeId',
        definitions: [
          {
            id: 'titres-statuts',
            foreignKey: 'titreStatutId',
            joinTable: 'titre-types--titres-statuts'
          },
          {
            id: 'demarches-types',
            foreignKey: 'demarcheTypeId',
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
