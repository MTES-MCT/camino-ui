<template>
  <div class="tablet-blobs tablet-flex-direction-reverse">
    <div class="tablet-blob-1-3 flex mb-s">
      <Downloads
        v-if="titres.length"
        :formats="['geojson', 'csv', 'xlsx', 'ods']"
        section="titres"
        class="flex-right full-x downloads"
      />
    </div>

    <div class="tablet-blob-2-3 flex">
      <div
        v-for="v in vues"
        :key="v.id"
        class="mr-xs"
        :class="{ active: vueId === v.id }"
      >
        <button
          v-if="vueId !== v.id"
          class="p-m btn-tab rnd-t-s"
          @click="vueClick(v.id)"
        >
          <i :class="`icon-${v.icon}`" class="icon-24" />
        </button>
        <div v-else class="p-m span-tab rnd-t-s">
          <i :class="`icon-${v.icon}`" class="icon-24" />
        </div>
      </div>
      <div class="pl-m pt-m h5 bold">
        {{ resultat }}
      </div>
    </div>
  </div>

  <div class="line-neutral width-full" />
  <template v-if="initialized">
    <Map v-if="vueId === 'carte'" :titres="titres" />

    <Table v-else-if="vueId === 'table'" :titres="titres" :total="total" />
  </template>
  <div v-else class="table-view mb-xxl mt">…</div>
</template>

<script>
import Downloads from '../_common/downloads.vue'
import Table from './table-pagination.vue'
import Map from './map.vue'
export default {
  components: { Downloads, Map, Table },

  props: {
    titres: { type: Array, default: () => [] },
    vueId: { type: String, required: true },
    initialized: { type: Boolean, required: true },
    total: { type: Number, required: true }
  },

  emits: ['vueSet'],

  data() {
    return {
      vues: [
        { id: 'carte', icon: 'globe' },
        { id: 'table', icon: 'list' }
      ]
    }
  },

  computed: {
    resultat() {
      const res =
        this.total > this.titres.length
          ? `${this.titres.length} / ${this.total}`
          : this.titres.length

      return `${res} résultat${this.titres.length > 1 ? 's' : ''}`
    }
  },

  methods: {
    vueClick(vueId) {
      this.$emit('vueSet', vueId)
    }
  }
}
</script>
