<template>
  <div>
    <div class="desktop-blobs">
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
      @params-update="preferencesFiltresUpdate"
      @loaded="urlLoad('filtres')"
    />

    <Url
      v-if="loaded"
      :values="urlValuesTable"
      :params="preferences.table"
      @params-update="preferencesTableUpdate"
      @loaded="urlLoad('table')"
    />

    <Filtres
      :filtres="filtres"
      :loaded="loaded"
      :metas="metas"
      :preferences="preferences.filtres"
      @preferences-update="preferencesFiltresUpdateAndPageReset"
    />

    <div class="tablet-blobs tablet-flex-direction-reverse">
      <div class="tablet-blob-1-3 flex mb-s">
        <slot name="downloads" class="downloads" />
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
      @params-update="preferencesTableUpdate"
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

  data() {
    return {
      urlsLoaded: {
        filtres: false,
        table: false
      }
    }
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

      await this.$emit('preferences-update', { section: 'table', params })
    },

    preferencesFiltresUpdateAndPageReset(params) {
      this.preferencesFiltresUpdate(params)
      this.$emit('preferences-update', {
        section: 'table',
        params: { page: 1 }
      })
    },

    preferencesFiltresUpdate(params) {
      this.$emit('preferences-update', { section: 'filtres', params })
    },

    urlLoad(id) {
      this.urlsLoaded[id] = true
      if (this.urlsLoaded.table && this.urlsLoaded.filtres) {
        this.$emit('loaded')
      }
    }
  }
}
</script>
