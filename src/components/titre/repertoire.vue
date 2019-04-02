<template>
  <div class="tablet-blobs mb">
    <div class="tablet-blob-1-2">
      <div v-if="titulaires.length">
        <h6>
          Titulaire{{ titulaires.length > 1 ? 's' : '' }}
        </h6>
        <Entreprise
          v-for="titulaire in titulaires"
          :key="titulaire.id"
          :entreprise="titulaire"
          class="mb"
        />
      </div>
      <div v-if="amodiataires.length">
        <h6>
          Amodiataire{{ amodiataires.length > 1 ? 's' : '' }}
        </h6>
        <Entreprise
          v-for="amodiatiare in amodiataires"
          :key="amodiatiare.id"
          :entreprise="amodiatiare"
          class="mb"
        />
      </div>
    </div>

    <div class="tablet-blob-1-2">
      <div v-if="administrations.length">
        <h6>Administrations</h6>
        <Administration
          v-for="administration in administrations"
          :key="administration.id"
          :administration="administration"
          class="mb"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Entreprise from '../titre/entreprise.vue'
import Administration from '../titre/administration.vue'

export default {
  components: {
    Entreprise,
    Administration
  },
  props: {
    titulaires: {
      type: Array,
      default: () => []
    },

    amodiataires: {
      type: Array,
      default: () => []
    },

    administrations: {
      type: Array,
      default: () => []
    }
  }
}
</script>
