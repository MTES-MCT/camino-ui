<template>
  <template v-if="loaded">
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h4>{{ title }}</h4>
      </div>

      <div class="mb tablet-blob-2-3">
        <select :value="null" class="p-s" @change="selectChange">
          <option
            v-for="element in elements"
            :key="element.id"
            :value="element.id"
          >
            {{ labelGet(element) }}
          </option>
        </select>
      </div>
    </div>

    <button v-if="definition.create" @click="elementCreate">Ajouter</button>

    <template v-if="elementSelected">
      <button v-if="definition.delete" @click="elementDelete(elementToEdit)">
        Supprimer
      </button>
      <MetaLabelOrInput
        v-for="colonne of colonnesToEdit"
        :key="colonne.id"
        :colonne="colonne"
        :element="elementToEdit"
        @update="update"
      >
        {{ colonne.nom }}
      </MetaLabelOrInput>
      <span class="separator" />

      <DefinitionEdit
        v-for="definitionChild of definitionsTree.definitions"
        :key="definitionChild.joinTable"
        :definitions-tree="definitionChild"
        :foreign-keys="foreignKeysNew"
      />
    </template>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import metasIndex from '@/store/metas-definitions'
import MetaCreatePopup from './meta-create-popup.vue'
import MetaLabelOrInput from '@/components/metas/meta-label-or-input.vue'

export default defineComponent({
  name: 'DefinitionEdit',
  components: {
    MetaLabelOrInput
  },
  props: {
    definitionsTree: { type: Object, required: true },
    foreignKeys: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      loaded: false
    }
  },
  computed: {
    title() {
      return (
        this.definition.colonnes.find(
          colonne => colonne.id === this.definitionsTree.foreignKey
        )?.nom || this.definition.nom
      )
    },
    elementSelected() {
      return this.$store.getters['meta/elementSelected'](
        this.definitionsTree.joinTable || this.definitionsTree.id
      )
    },
    definition() {
      return metasIndex[
        this.definitionsTree.joinTable
          ? this.definitionsTree.joinTable
          : this.definitionsTree.id
      ]
    },
    elements() {
      if (!this.definitionsTree.joinTable) {
        // si pas de table de jointure on peut directement charger les éléments
        return this.$store.getters['meta/elements'](this.definitionsTree.id)
      }
      // via une table de jointure
      const elementIdsFiltered = this.$store.getters['meta/elements'](
        this.definitionsTree.joinTable
      )
        // on garde les lignes en fonction des éléments déjà sélectionnés
        .filter(joinRow =>
          Object.keys(this.foreignKeys).every(
            foreignKey => joinRow[foreignKey] === this.foreignKeys[foreignKey]
          )
        )
        .map(joinRow => joinRow[this.definitionsTree.foreignKey])

      return this.$store.getters['meta/elements'](
        this.definitionsTree.id
      ).filter(({ id }) => elementIdsFiltered.includes(id))
    },

    colonnesToEdit() {
      return this.definition.colonnes
        .filter(colonne => colonne.id !== 'id')
        .filter(colonne => colonne.type !== 'entities')
    },

    elementToEdit() {
      if (!this.definitionsTree.joinTable) {
        return this.elementSelected
      }

      return this.$store.getters['meta/elements'](
        this.definitionsTree.joinTable
      ).find(joinRow =>
        Object.keys(this.foreignKeysNew).every(
          foreignKey => joinRow[foreignKey] === this.foreignKeysNew[foreignKey]
        )
      )
    },

    foreignKeysNew() {
      return {
        ...this.foreignKeys,
        [this.definitionsTree.foreignKey]: this.elementSelected?.id
      }
    }
  },

  async created() {
    const promises = []
    promises.push(this.$store.dispatch('meta/get', this.definitionsTree.id))
    if (this.definitionsTree.joinTable) {
      promises.push(
        this.$store.dispatch('meta/get', this.definitionsTree.joinTable)
      )
    }
    await Promise.all(promises)
    this.loaded = true
  },

  methods: {
    async selectChange(event) {
      const elementId = event.target.value
      const element = this.elements.find(({ id }) => id === elementId)
      await this.$store.dispatch('meta/elementSelect', {
        id: this.definitionsTree.joinTable || this.definitionsTree.id,
        element
      })
    },
    async update(content: string, element: any, colonneId: string) {
      await this.$store.dispatch('meta/update', {
        id: this.definitionsTree.joinTable || this.definitionsTree.id,
        partialElement: { [colonneId]: content },
        element
      })
    },
    labelGet(element: any) {
      return metasIndex[this.definitionsTree.id].labelGet(element)
    },
    async elementDelete(element) {
      await this.$store.dispatch('meta/delete', {
        id: this.definitionsTree.joinTable || this.definitionsTree.id,
        element
      })
    },
    async elementCreate() {
      this.$store.commit('popupOpen', {
        component: MetaCreatePopup,
        props: {
          id: this.definitionsTree.joinTable || this.definitionsTree.id,
          foreignKeys: this.foreignKeys
        }
      })
    }
  }
})
</script>
