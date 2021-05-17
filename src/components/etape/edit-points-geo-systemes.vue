<template>
  <div>
    <h4 class="mb-s">Systèmes géographiques</h4>
    <div
      v-for="(etapeGeoSystemeId, etapeGeoSystemeIndex) in etape.geoSystemeIds"
      :key="etapeGeoSystemeIndex"
    >
      <div class="flex mb-s">
        <select
          v-model="etape.geoSystemeIds[etapeGeoSystemeIndex]"
          class="p-s mr-s"
          @change="geoSystemeUpdate(etapeGeoSystemeIndex)"
        >
          <option
            v-for="geoSysteme in geoSystemes"
            :key="geoSysteme.id"
            :value="geoSysteme.id"
            :disabled="etape.geoSystemeIds.includes(geoSysteme.id)"
          >
            {{ geoSysteme.nom }} ({{ geoSysteme.id }})
          </option>
        </select>
        <button
          class="btn py-s px-m rnd-xs"
          @click="geoSystemeRemove(etapeGeoSystemeIndex)"
        >
          <i class="icon-24 icon-minus" />
        </button>
      </div>

      <div v-if="etapeGeoSystemeId" class="tablet-blobs">
        <div v-if="etape.geoSystemeIds.length > 1" class="tablet-blob-1-2">
          <div class="h6 mb">
            <label>
              <input
                v-model="etape.geoSystemeOpposableId"
                type="radio"
                :value="etapeGeoSystemeId"
              />
              Opposable
            </label>
          </div>
        </div>
      </div>
    </div>
    <button
      v-if="!etape.geoSystemeIds.some(id => !id)"
      class="btn small rnd-xs py-s px-m full-x flex mb-s"
      @click="geoSystemeAdd"
    >
      <span class="mt-xxs">Ajouter un système géographique</span
      ><i class="icon-24 icon-plus flex-right" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    etape: { type: Object, default: () => ({}) }
  },

  computed: {
    geoSystemes() {
      return this.$store.state.titreEtape.metas.geoSystemes
    },

    geoSystemesLength() {
      return this.etape.geoSystemeIds.length
    }
  },

  methods: {
    geoSystemeAdd() {
      this.etape.geoSystemeIds.push('')
    },

    geoSystemeRemove(etapeGeoSystemeIndex) {
      this.etape.geoSystemeIds.splice(etapeGeoSystemeIndex, 1)
    },

    geoSystemeUpdate(etapeGeoSystemeIndex) {
      const etapeGeoSystemeId = this.etape.geoSystemeIds[etapeGeoSystemeIndex]

      this.etape.groupes.forEach(contours => {
        contours.forEach(points => {
          points.forEach(point => {
            if (!point.references[etapeGeoSystemeId]) {
              point.references[etapeGeoSystemeId] = point.lot
                ? []
                : [null, null]
            }
          })
        })
      })

      if (!this.etape.groupes.length) {
        this.etape.groupes.push([[]])
      }
    }
  }
}
</script>
