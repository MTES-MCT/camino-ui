<template>
  <Loader v-if="!loaded" />
  <template v-else>
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h4>{{ title }}</h4>
      </div>

      <div class="mb tablet-blob-2-3" :class="{ flex: hasButtonPlus }">
        <select :value="elementSelected?.id" class="p-s" @change="selectChange">
          <option
            v-for="element in elements"
            :key="element.id"
            :value="element.id"
          >
            {{ labelGet(element) }}
          </option>
        </select>

        <span class="ml-m">
          <ButtonPlus v-if="hasButtonPlus" @click="elementCreate" />
        </span>
      </div>
    </div>

    <div v-if="elementSelected" class="mb-xl">
      <div
        v-if="rootComponent || definitionsTree.joinTable"
        class="rnd-s border p-m"
      >
        <div class="tablet-blobs">
          <MetaLabelOrInput
            v-for="colonne of colonnesToEdit"
            :key="colonne.id"
            :colonne="colonne"
            :element="elementToEdit"
            @update="update"
          >
            {{ colonne.nom }}
          </MetaLabelOrInput>
        </div>
        <div class="flex blobs pr-m">
          <button
            v-if="definition.delete"
            class="btn py-s px-m btn rnd-xs p-s flex-right"
            title="supprimer"
            @click="elementDelete(elementToEdit)"
          >
            <i class="icon-24 icon-trash" />
          </button>
        </div>
      </div>
      <div
        v-for="definitionChild of definitionsTree.definitions"
        :key="definitionChild.joinTable"
        class="pl-l"
      >
        <span class="separator" />
        <DefinitionEdit
          :definitions-tree="definitionChild"
          :foreign-keys="foreignKeysNew"
          :root-component="false"
        />
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import metasIndex from '@/store/metas-definitions'
import MetaCreatePopup from './meta-create-popup.vue'
import MetaLabelOrInput from '@/components/metas/meta-label-or-input.vue'
import ButtonPlus from '@/components/_ui/button-plus.vue'

export default defineComponent({
  name: 'DefinitionEdit',
  components: {
    MetaLabelOrInput,
    ButtonPlus
  },
  props: {
    definitionsTree: { type: Object, required: true },
    foreignKeys: { type: Object, default: () => ({}) },
    rootComponent: { type: Boolean, default: true }
  },
  data() {
    return {
      loaded: false
    }
  },
  computed: {
    hasButtonPlus() {
      return (
        this.definition.create &&
        (this.rootComponent || this.definitionsTree.joinTable)
      )
    },
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

      return (
        this.$store.getters['meta/elements'](this.definitionsTree.id)?.filter(
          ({ id }) => elementIdsFiltered.includes(id)
        ) || []
      )
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

  async unmounted() {
    await this.elementSelect(null)
  },

  methods: {
    async selectChange(event) {
      const elementId = event.target.value
      const element = this.elements.find(({ id }) => id === elementId)
      await this.elementSelect(element)
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
    async elementSelect(element) {
      await this.$store.dispatch('meta/elementSelect', {
        id: this.definitionsTree.joinTable || this.definitionsTree.id,
        element
      })
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
          id: this.definitionsTree.id,
          joinTable: this.definitionsTree.joinTable || this.definitionsTree.id,
          foreignKeys: this.foreignKeys,
          foreignKey: this.definitionsTree.foreignKey
        }
      })
    }
  }
})
</script>
