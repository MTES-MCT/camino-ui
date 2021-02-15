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
          <p class="h6 italic mb-0 flex-right mr-xs">Optionnel</p>
        </div>
        <input v-model="point.description" type="text" class="p-s" />
      </div>
    </div>

    <label class="h5 mb">
      <input v-model="point.subsidiaire" type="checkbox" /> subsidiaire
    </label>

    <div
      v-for="geoSysteme in geoSystemes.filter(({ id }) =>
        geoSystemeIds.includes(id)
      )"
      :key="`${point.id}-${geoSysteme.id}`"
      class="tablet-blobs"
    >
      <div class="mb tablet-blob-1-3">
        <h6>
          Système
          <span
            v-if="geoSystemeOpposableId === geoSysteme.id"
            class="bg-info py-xxs px-xs rnd-xs color-bg"
            >Opposable</span
          >
        </h6>

        <p class="py-s mb-0 h5 bold">
          {{ geoSysteme.nom }}
        </p>
      </div>
      <div class="mb tablet-blob-1-3">
        <h6>X ({{ geoSysteme.unite.nom }})</h6>
        <inputNumber
          v-model.trim.number="point.references[geoSysteme.id][0]"
          :negative="true"
          placeholder="0,01"
        />
      </div>
      <div class="mb tablet-blob-1-3">
        <h6>Y ({{ geoSysteme.unite.nom }})</h6>
        <inputNumber
          v-model.trim.number="point.references[geoSysteme.id][1]"
          :negative="true"
          placeholder="0,01"
        />
      </div>
    </div>
  </div>
</template>

<script>
import InputNumber from '../../_ui/input-number.vue'

export default {
  components: { InputNumber },

  props: {
    point: { type: Object, default: () => ({}) },
    geoSystemeIds: { type: Array, required: true },
    geoSystemeOpposableId: { type: String, required: true }
  },

  computed: {
    geoSystemes() {
      return this.$store.state.titreEtape.metas.geoSystemes
    }
  }
}
</script>
