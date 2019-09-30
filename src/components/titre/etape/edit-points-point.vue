<template>
  <div>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3">
        <h6>Nom</h6>
        <input
          v-model.lazy="point.nom"
          type="text"
          class="p-s"
        >
      </div>
      <div class="mb tablet-blob-2-3">
        <h6>Description</h6>
        <input
          v-model="point.description"
          type="text"
          class="p-s"
        >
      </div>
    </div>

    <label class="h5 mb">
      <input
        v-model="point.subsidiaire"
        type="checkbox"
      >subsidiaire
    </label>

    <div
      v-for="etapeGeoSysteme in etape.geoSystemes.filter(({ id }) => id)"
      :key="`${point.id}-${etapeGeoSysteme.id}`"
      class="tablet-blobs"
    >
      <div class="mb tablet-blob-1-3">
        <h6>Système</h6>

        <p class="py-s mb-0 h5">
          <span class="bold">{{ etapeGeoSysteme.nom }}</span> <span
            v-if="etape.geoSystemeOpposableId === etapeGeoSysteme.id"
            class="bg-info py-xxs px-xs rnd-xs color-bg"
          >Opposable</span>
        </p>
      </div>
      <div class="mb tablet-blob-1-3">
        <h6>X ({{ unites.find(({id}) => etapeGeoSysteme.uniteId === id).nom }})</h6>
        <input
          v-model.trim.number="point.references[etapeGeoSysteme.id][0]"
          type="text"
          class="p-s"
        >
      </div>
      <div class="mb tablet-blob-1-3">
        <h6>Y ({{ unites.find(({id}) => etapeGeoSysteme.uniteId === id).nom }})</h6>
        <input
          v-model.trim.number="point.references[etapeGeoSysteme.id][1]"
          type="text"
          class="p-s"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    point: { type: Object, default: () => ({}) },
    etape: { type: Object, default: () => ({}) }
  },

  computed: {
    unites() {
      return this.$store.state.metas.unites
    }
  }
}
</script>
