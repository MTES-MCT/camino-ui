<template>
  <div>
    <div class="desktop-blobs pt-s">
      <div class="desktop-blob-2-3">
        <h1 class="mt-xs mb-m cap-first">
          {{ nom }}
        </h1>
      </div>

      <div class="desktop-blob-1-3">
        <slot name="addButton" />
      </div>
    </div>

    <Url
      v-if="loaded"
      :values="urlValuesFiltres"
      :params="preferences.filtres"
      @params:update="preferencesFiltresUpdate"
    />

    <Url
      v-if="loaded"
      :values="urlValuesTable"
      :params="preferences.table"
      @params:update="preferencesTableUpdate"
    />

    <Filtres
      :filtres="filtres"
      :loaded="loaded"
      :metas="metas"
      :preferences="preferences.filtres"
      @elements:update="elementsUpdate"
      @preferences:update="preferencesFiltresUpdate"
    />

    <div class="tablet-blobs tablet-flex-direction-reverse">
      <div class="tablet-blob-1-3 flex mb-s">
        <slot name="downloads" />
      </div>

      <div class="tablet-blob-2-3 flex">
        <div class="py-m h6 bold mb-xs">
          {{ resultat }}
        </div>
      </div>
    </div>

    <div class="line-neutral" />

    <Table
      :columns="colonnes"
      :rows="lignes"
      :column="preferences.table.colonne"
      :range="preferences.table.intervalle"
      :order="preferences.table.ordre"
      :page="preferences.table.page"
      :total="total"
      @elements:update="elementsUpdate"
      @params:update="preferencesTableUpdate"
    />
  </div>
</template>

<script>
import Url from '../_ui/url.vue'
import Table from '../_ui/table-pagination.vue'
import Filtres from './filtres.vue'

export default {
  name: 'Liste',

  components: { Url, Filtres, Table },

  props: {
    nom: { type: String, required: true },
    filtres: { type: Array, required: true },
    colonnes: { type: Array, required: true },
    lignes: { type: Array, required: true },
    elements: { type: Array, required: true },
    preferences: { type: Object, required: true },
    metas: { type: Object, default: () => ({}) },
    params: { type: Array, required: true },
    total: { type: Number, required: true },
    loaded: { type: Boolean, default: false }
  },

  computed: {
    resultat() {
      const res =
        this.total > this.elements.length
          ? `${this.elements.length} / ${this.total}`
          : this.elements.length

      return `${res} résultat${this.elements.length > 1 ? 's' : ''}`
    },

    urlValuesFiltres() {
      const paramsIds = Object.keys(this.preferences.filtres)

      return this.params.reduce((p, param) => {
        if (paramsIds.includes(param.id)) {
          p[param.id] = param
        }

        return p
      }, {})
    },

    urlValuesTable() {
      const paramsIds = Object.keys(this.preferences.table)

      return this.params.reduce((p, param) => {
        if (paramsIds.includes(param.id)) {
          p[param.id] = param
        }

        return p
      }, {})
    }
  },

  methods: {
    elementsUpdate() {
      this.$emit('elements:update')
    },

    async preferencesTableUpdate(params) {
      if (params.range) {
        params.intervalle = params.range
        delete params.range
      }

      if (params.column) {
        params.colonne = params.column
        delete params.column
      }

      if (params.order) {
        params.ordre = params.order
        delete params.order
      }

      await this.$emit('preferences:update', { section: 'table', params })
    },

    async preferencesFiltresUpdate(params) {
      await this.$emit('preferences:update', { section: 'filtres', params })
    }
  }
}
</script>
