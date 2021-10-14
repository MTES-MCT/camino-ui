<template>
  <div class="desktop-blobs">
    <div class="desktop-blob-2-3">
      <router-link :to="{ name: 'metas' }">
        <h5>Métas</h5>
      </router-link>
      <h1>
        <span class="cap-first">Démarche</span>
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
