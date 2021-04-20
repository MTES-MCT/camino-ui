<template>
  <div>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3">
        <h6>Nom</h6>
        <input v-model.lazy="point.nom" type="text" class="p-s" />
      </div>
      <div class="mb tablet-blob-2-3">
        <div class="flex">
          <h6>Description</h6>
          <p class="h5 italic mb-0 flex-right mt-xs">Optionnel</p>
        </div>
        <input v-model="point.description" type="text" class="p-s" />
      </div>
    </div>

    <div class="h5 mb">
      <label>
        <input v-model="point.subsidiaire" type="checkbox" /> Subsidiaire
      </label>
    </div>

    <EditPointReference
      v-for="geoSysteme in geoSystemes"
      :key="`${point.id}-${geoSysteme.id}`"
      v-model:point-references="point.references"
      :geo-systeme="geoSysteme"
      :geo-systeme-opposable-id="geoSystemeOpposableId"
    />
  </div>
</template>

<script>
import EditPointReference from './edit-points-point-reference.vue'

export default {
  components: { EditPointReference },

  props: {
    point: { type: Object, default: () => ({}) },
    geoSystemeIds: { type: Array, required: true },
    geoSystemeOpposableId: { type: String, required: true }
  },

  computed: {
    geoSystemes() {
      return this.$store.state.titreEtape.metas.geoSystemes.filter(({ id }) =>
        this.geoSystemeIds.includes(id)
      )
    }
  }
}
</script>
