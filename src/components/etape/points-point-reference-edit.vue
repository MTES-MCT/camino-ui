<template>
  <div class="tablet-blobs">
    <div class="mb tablet-blob-1-3">
      <h5>
        Système
        <span
          v-if="geoSystemeOpposableId === geoSysteme.id"
          class="bg-info py-xxs px-xs rnd-xs color-bg ml-xxs"
          >Opposable</span
        >
      </h5>

      <p class="py-s mb-0 h6 bold">
        {{ geoSysteme.nom }}
      </p>
    </div>
    <div class="mb tablet-blob-1-3">
      <h5>X ({{ geoSysteme.unite.nom }})</h5>
      <inputNumber
        v-model="pointReference.x"
        :negative="true"
        placeholder="0,01"
      />
    </div>
    <div class="mb tablet-blob-1-3">
      <h5>Y ({{ geoSysteme.unite.nom }})</h5>
      <inputNumber
        v-model="pointReference.y"
        :negative="true"
        placeholder="0,01"
      />
    </div>
  </div>
</template>

<script>
import InputNumber from '../_ui/input-number.vue'

export default {
  components: { InputNumber },

  props: {
    geoSysteme: { type: Object, required: true },
    geoSystemeOpposableId: { type: String, required: true },
    pointReferences: { type: Object, required: true }
  },

  computed: {
    pointReference() {
      return this.pointReferences[this.geoSysteme.id]
        ? this.pointReferences[this.geoSysteme.id]
        : { id: undefined, x: 0, y: 0 }
    }
  }
}
</script>
