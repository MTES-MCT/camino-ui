<template>
  <div class="tablet-blobs mb">
    <div class="tablet-blob-1-2">
      <div v-if="titulaires.length">
        <h6>
          {{ titulaires.length > 1 ? "Titulaires" : "Titulaire" }}
        </h6>
        <Company
          v-for="titulaire in titulaires"
          :key="titulaire.id"
          :entreprise="titulaire"
          class="mb"
        />
      </div>
      <div v-if="amodiataires.length">
        <h6>
          {{
            amodiataires.length > 1 ? "Amodiataires" : "Amodiataire"
          }}
        </h6>
        <Company
          v-for="amodiatiare in amodiataires"
          :key="amodiatiare.id"
          :entreprise="amodiatiare"
          class="mb"
        />
      </div>
    </div>

    <div class="tablet-blob-1-2">
      <h6>Administrations</h6>
      <Administration
        v-for="administration in administrations"
        :key="administration.id"
        :administration="administration"
        class="mb"
      />
    </div>
  </div>
</template>

<script>
import Company from '../titre/company.vue'
import Administration from '../titre/administration.vue'

export default {
  components: {
    Company,
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
