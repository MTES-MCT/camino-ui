<template>
  <Accordion :opened="opened" @close="close" @toggle="toggle">
    <template #title>
      <span class="h5">Fond de carte</span>
    </template>
    <ul class="list-sans mt-m px-m">
      <li v-for="tile in tiles" :key="tile.name">
        <label class="h5 bold">
          <input
            :value="tile.id"
            :checked="tile.id === tilesId"
            type="radio"
            class="mr-s"
            @change="select(tile.id)"
          />
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

  data() {
    return {
      opened: false
    }
  },

  methods: {
    close() {
      this.opened = false
    },

    toggle() {
      this.opened = !this.opened
    },

    select(tilesId) {
      this.$emit('params-update', { tilesId })
    }
  }
}
</script>
