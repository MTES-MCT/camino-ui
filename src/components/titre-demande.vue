<template>
  <h1 class="mt-xs mb-m">Demande de titre</h1>
  <hr />

  <div class="tablet-blobs">
    <div class="tablet-blob-1-3 tablet-pt-s pb-s">
      <h6>Entreprise</h6>
    </div>
    <div class="tablet-blob-2-3">
      <select class="p-s" @change="entrepriseUpdate">
        <option
          v-for="entreprise in entreprises"
          :key="entreprise.id"
          :value="entreprise.id"
          :disabled="newDemande.entrepriseId === entreprise.id"
        >
          {{ entreprise.nom }}
        </option>
      </select>
    </div>
  </div>

  <div v-if="newDemande.entrepriseId" class="tablet-blobs">
    <div class="tablet-blob-1-3 tablet-pt-s pb-s">
      <h6>Type de titre</h6>
    </div>
    <div class="tablet-blob-2-3">
      <select v-model="newDemande.titreTypeId" class="p-s">
        <option
          v-for="titreType in entreprise.titresTypes"
          :key="titreType.id"
          :value="titreType.id"
          :disabled="newDemande.titreTypeId === titreType.id"
        >
          {{ titreType.domaine.id.toUpperCase() }} | {{ titreType.type.nom }}
        </option>
      </select>
    </div>
  </div>

  <div v-if="newDemande.titreTypeId" class="tablet-blobs">
    <div class="tablet-blob-1-3 tablet-pt-s pb-s">
      <h6>Nom</h6>
    </div>
    <div class="tablet-blob-2-3">
      <input v-model="newDemande.nom" type="text" class="p-s" />
    </div>
  </div>

  <div v-if="newDemande.titreTypeId === 'arm'" class="tablet-blobs">
    <div class="tablet-blob-1-3 tablet-pt-s pb-s">
      <h6>Prospection mécanisée</h6>
    </div>
    <div class="tablet-blob-2-3">
      <input v-model="newDemande.mecanise" type="checkbox" class="pb-s" />
    </div>
  </div>

  <div class="tablet-blobs">
    <div class="tablet-blob-1-3" />
    <div class="tablet-blob-2-3">
      <button
        v-if="!loading"
        id="cmn-titre-activite-edit-popup-button-enregistrer"
        ref="save-button"
        :disabled="!complete"
        class="rnd-xs p-s full-x"
        :class="{ 'btn-flash': !complete, 'btn-border': complete }"
        @click="save(false)"
      >
        Enregistrer
      </button>
      <div v-else class="p-s full-x bold">Enregistrement en cours…</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newDemande: {}
    }
  },

  computed: {
    entreprises() {
      return this.$store.state.user.metas.entreprisesTitresCreation
    },

    entreprise() {
      return this.entreprises.find(e => e.id === this.newDemande.entrepriseId)
    },

    complete() {
      return (
        this.newDemande.entrepriseId &&
        this.newDemande.titreTypeId &&
        this.newDemande.nom
      )
    },

    loading() {
      return this.$store.state.loading.includes('titreDemandeAdd')
    }
  },

  methods: {
    entrepriseUpdate(event) {
      this.newDemande = { entrepriseId: event.target.value }
    },

    save() {
      this.$store.dispatch('titreDemande/save', this.newDemande)
    }
  }
}
</script>
