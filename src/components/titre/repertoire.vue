<template>
  <div class="tablet-blobs">
    <div class="tablet-blob-1-2">
      <div v-if="titulaires">
        <h6>
          {{ titulaires.length > 1 ? "Titulaires" : "Titulaire" }}
        </h6>
        <Company
          v-for="holder in titulaires"
          :key="holder['id']"
          :company="holder"
          class="mb"
        />
      </div>
      <div v-if="amodiataires">
        <h6>
          {{
            amodiataires.length > 1 ? "Amodiataires" : "Amodiataire"
          }}
        </h6>
        <Company
          v-for="holder in amodiataires"
          :key="holder['id']"
          :company="holder"
          class="mb"
        />
      </div>
    </div>

    <div class="tablet-blob-1-2">
      <h6>Administrations</h6>
      <Company
        v-for="referent in administrations"
        :key="referent['id']"
        :company="referent"
        class="mb"
      />
    </div>
  </div>
</template>

<script>
import Company from '../titre/company.vue'

export default {
  components: {
    Company
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

