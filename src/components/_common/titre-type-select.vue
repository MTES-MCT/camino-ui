<template>
  <div>
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5>Domaine</h5>
      </div>
      <div class="mb tablet-blob-2-3">
        <select v-model="element.domaineId" class="p-s mr">
          <option
            v-for="domaine in domaines"
            :key="domaine.id"
            :value="domaine.id"
          >
            {{ domaine.nom }}
          </option>
        </select>
      </div>
    </div>
    <hr />
  </div>

  <div>
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5>Type</h5>
      </div>
      <div class="mb tablet-blob-2-3">
        <select
          v-model="element.typeId"
          class="p-s mr"
          :disabled="!titresTypes"
        >
          <option
            v-for="titreType in titresTypes"
            :key="titreType.id"
            :value="titreType.id"
          >
            {{ titreType.type.nom }}
          </option>
        </select>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  props: {
    element: { type: Object, required: true },
    domaines: { type: Array, required: true }
  },

  computed: {
    titresTypes() {
      const domaine = this.domaines.find(
        ({ id }) => id === this.element.domaineId
      )

      return domaine && domaine.titresTypes.filter(tt => tt.titresCreation)
    }
  },

  watch: {
    domaines: 'domainesUpdate',
    titresTypes: 'titresTypesUpdate'
  },

  created() {
    this.domainesUpdate()
  },

  methods: {
    domainesUpdate() {
      if (this.domaines?.length === 1) {
        this.element.domaineId = this.domaines[0].id
      }
    },

    titresTypesUpdate() {
      if (this.titresTypes?.length === 1) {
        this.element.typeId = this.titresTypes[0].id
      }
    }
  }
}
</script>
