<template>
  <div class="tablet-blobs mb-xl">
    <div class="tablet-blob-1-4">
      <div v-if="surface">
        <h5>Surface</h5>
        <p>{{ numberFormat(surface) }} km² environ</p>
      </div>
    </div>
    <div
      v-if="(pays && pays.length) || (forets && forets.length)"
      class="tablet-blob-3-4"
    >
      <h5>Territoires</h5>
      <template v-if="pays && pays.length">
        <div v-for="region in pays[0].regions" :key="region.id">
          <div v-for="departement in region.departements" :key="departement.id">
            <h6 class="mb-s">
              {{
                pays[0].nom === 'République Française'
                  ? region.nom + ' / ' + departement.nom
                  : region.nom
              }}
            </h6>
            <TagList :elements="departement.communes.map(c => c.nom)" />
          </div>
        </div>
      </template>
      <div v-if="forets?.length">
        <div>
          <h6 class="mb-s">Forêts</h6>
          <TagList :elements="forets.map(f => f.nom)" />
        </div>
      </div>
      <div v-if="sdomZones?.length">
        <div>
          <h6 class="mb-s">Zones du SDOM</h6>
          <TagList :elements="sdomZones.map(f => f.nom)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numberFormat from '@/utils/number-format'
import TagList from '../_ui/tag-list.vue'

export default {
  components: {
    TagList
  },

  props: {
    pays: { type: Array, default: () => [] },

    forets: { type: Array, default: () => [] },

    sdomZones: { type: Array, default: () => [] },

    surface: { type: Number, default: 0 }
  },

  methods: {
    numberFormat(number) {
      return numberFormat(number)
    }
  }
}
</script>
