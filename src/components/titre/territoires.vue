<template>
  <div class="tablet-blobs">
    <div class="tablet-blob-1-4">
      <div v-if="surface">
        <h6>Surface</h6>
        <p>{{ surface }} km² environ</p>
      </div>
      <div v-if="volume">
        <h6>Volume</h6>
        <p>{{ volume }} {{ volumeUnite }}</p>
      </div>
    </div>
    <div
      v-if="pays && pays.length"
      class="tablet-blob-3-4"
    >
      <h6>Territoires</h6>
      <div
        v-for="region in pays[0].regions"
        :key="region.id"
      >
        <div
          v-for="departement in region.departements"
          :key="departement.id"
        >
          <h5 class="mb-s">
            {{ pays[0].nom === 'République Française' ? region.nom + ' / ' + departement.nom : region.nom }}
          </h5>
          <PillList :elements="departement.communes.map(c => c.nom)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PillList from '../ui/pill-list.vue'

export default {
  components: {
    PillList
  },
  props: {
    pays: {
      type: Array,
      default: () => []
    },

    volume: {
      type: Number,
      default: 0
    },

    volumeUnite: {
      type: String,
      default: ''
    },

    surface: {
      type: Number,
      default: 0
    }
  }
}
</script>

