<template>
  <Accordion class="mb">
    <template slot="title">
      Fond de carte
    </template>
    <ul class="list-sans mt-m px-m">
      <li
        v-for="tile in tiles"
        :key="tile.name"
      >
        <label>
          <input
            :value="tile.id"
            :checked="tile.id === tilesId"
            type="radio"
            class="mr-s"
            @change="select(tile.id)"
          >
          {{ tile.name }}
        </label>
      </li>
    </ul>
  </Accordion>
</template>

<script>
import Accordion from '../_ui/accordion.vue'

export default {
  components: {
    Accordion
  },

  props: {
    tiles: {
      type: Array,
      default: () => []
    },
    tilesId: {
      type: String,
      default: 'osm-fr'
    }
  },

  methods: {
    select(tilesId) {
      this.$emit('tiles-id-set', tilesId)
    }
  }
}
</script>
