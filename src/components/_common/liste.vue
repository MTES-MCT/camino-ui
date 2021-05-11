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

    <Filtres
      v-if="filtres.length"
      :filtres="filtres"
      :initialized="initialized"
      :metas="metas"
      :params="params.filtres"
      @params-update="paramsFiltresUpdate"
    />

    <div class="tablet-blobs tablet-flex-direction-reverse">
      <div class="tablet-blob-1-3 flex mb-s">
        <slot name="downloads" class="downloads" />
      </div>

      <div class="tablet-blob-2-3 flex">
        <div class="py-m h5 bold mb-xs">
          {{ resultat }}
        </div>
      </div>
    </div>

    <div class="line-neutral width-full" />

    <Table
      :columns="colonnes"
      :rows="lignes"
      :column="params.table.colonne"
      :range="params.table.intervalle"
      :order="params.table.ordre"
      :page="params.table.page"
      :pagination="pagination"
      :total="total"
      @params-update="paramsTableUpdate"
    />
  </div>
</template>

<script>
import Table from '../_ui/table-pagination.vue'
import Filtres from './filtres.vue'

export default {
  name: 'Liste',

  components: { Filtres, Table },

  props: {
    nom: { type: String, required: true },
    filtres: { type: Array, default: () => [] },
    colonnes: { type: Array, required: true },
    lignes: { type: Array, required: true },
    elements: { type: Array, required: true },
    params: { type: Object, required: true },
    metas: { type: Object, default: () => ({}) },
    total: { type: Number, required: true },
    initialized: { type: Boolean, default: false }
  },

  emits: ['params-update'],

  computed: {
    resultat() {
      const res =
        this.total > this.elements.length
          ? `${this.elements.length} / ${this.total}`
          : this.elements.length

      return `${res} résultat${this.elements.length > 1 ? 's' : ''}`
    },

    pagination() {
      return !!this.params.table.page
    }
  },

  methods: {
    async paramsTableUpdate(params) {
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

      await this.$emit('params-update', { section: 'table', params })
    },

    paramsFiltresUpdate(params) {
      this.$emit('params-update', {
        section: 'filtres',
        params,
        pageReset: true
      })
    }
  }
}
</script>
