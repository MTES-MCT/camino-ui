<template>
  <div class="tablet-blobs mb-xl">
    <div class="tablet-blob-1-4">
      <div v-if="surface">
        <h6>Surface</h6>
        <p>{{ surface }} km² environ</p>
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
          <TagList :elements="departement.communes.map(c => c.nom)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TagList from '../_ui/tag-list.vue'

export default {
  components: {
    TagList
  },
  props: {
    pays: {
      type: Array,
      default: () => []
    },

    surface: {
      type: Number,
      default: 0
    }
  }
}
</script>
