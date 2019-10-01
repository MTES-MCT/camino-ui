<template>
  <div class="mb">
    <h4 class="mb-s">
      Systèmes géographiques
    </h4>
    <div
      v-for="(etapeGeoSysteme, etapeGeoSystemeIndex) in etape.geoSystemes"
      :key="etapeGeoSystemeIndex"
      class="mb-s"
    >
      <div class="flex full-x mb-s">
        <select
          v-model="etape.geoSystemes[etapeGeoSystemeIndex].id"
          type="text"
          class="p-s mr-s"
          @change="geoSystemeUpdate(etapeGeoSystemeIndex)"
        >
          <option
            v-for="geoSysteme in geoSystemes"
            :key="geoSysteme.id"
            :value="geoSysteme.id"
            :disabled="etapeGeoSystemeIds.some(id => id === geoSysteme.id)"
          >
            {{ geoSysteme.nom }}
          </option>
        </select>
        <div class="flex-right">
          <button
            class="btn-border py-s px-m rnd-xs"
            @click="geoSystemeRemove(etapeGeoSystemeIndex)"
          >
            <i class="icon-24 icon-minus" />
          </button>
        </div>
      </div>

      <div
        v-if="etapeGeoSysteme.id"
        class="tablet-blobs"
      >
        <div class="tablet-blob-1-2">
          <div class="blobs">
            <div class="blob-1-3 pt-s pb-s">
              <h6 class="mt-xs">
                Unité
              </h6>
            </div>
            <div class="blob-2-3">
              <select
                v-if="unites.filter(({type}) => etapeGeoSysteme.uniteType === type).length > 1"
                v-model="etape.geoSystemes[etapeGeoSystemeIndex].uniteId"
                type="text"
                class="p-s"
              >
                <option
                  v-for="unite in unites.filter(({type}) => etapeGeoSysteme.uniteType === type)"
                  :key="unite.id"
                  :value="unite.id"
                  :disabled="etapeGeoSysteme.uniteId === unite.id"
                >
                  {{ unite.nom }}
                </option>
              </select>
              <div v-else>
                <div class="p-s bg-alt">
                  {{ unites.find(({type}) => etapeGeoSysteme.uniteType === type).nom }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="etapeGeoSystemeIds.length > 1"
          class="tablet-blob-1-2"
        >
          <label class="h5 pt-s mb">
            <input
              v-model="etape.geoSystemeOpposableId"
              type="radio"
              :value="etapeGeoSysteme.id"
            > opposable
          </label>
        </div>
      </div>
    </div>
    <button
      v-if="!etape.geoSystemes.some(({ id }) => !id)"
      class="btn-border rnd-xs py-s px-m full-x flex"
      @click="geoSystemeAdd"
    >
      Ajouter un système géographique<i class="icon-24 icon-plus flex-right" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    etape: { type: Object, default: () => ({}) },
    etapeGeoSystemeIds: { type: Array, default: () => [] }
  },

  computed: {
    geoSystemes() {
      return this.$store.state.metas.geoSystemes
    },

    unites() {
      return this.$store.state.metas.unites
    }
  },

  methods: {
    geoSystemeAdd() {
      this.etape.geoSystemes.push({ id: '' })
    },

    geoSystemeRemove(etapeGeoSystemeIndex) {
      this.etape.geoSystemes.splice(etapeGeoSystemeIndex, 1)
    },

    geoSystemeUpdate(etapeGeoSystemeIndex) {
      const etapeGeoSysteme = this.etape.geoSystemes[etapeGeoSystemeIndex]
      const geoSysteme = this.geoSystemes.find(
        ({ id }) => id === etapeGeoSysteme.id
      )

      const unite = this.unites.find(
        ({ type }) => type === geoSysteme.uniteType
      )

      etapeGeoSysteme['nom'] = geoSysteme.nom
      etapeGeoSysteme['uniteId'] = unite.id
      etapeGeoSysteme['uniteNom'] = unite.nom
      etapeGeoSysteme['uniteType'] = unite.type

      this.etape.groupes.forEach(contours => {
        contours.forEach(points => {
          points.forEach(point => {
            if (!point.references[etapeGeoSysteme.id]) {
              point.references[etapeGeoSysteme.id] = point.lot ? [] : [0, 0]
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
