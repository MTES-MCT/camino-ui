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
          :disabled="newTitre.entrepriseId === entreprise.id"
        >
          {{ entreprise.nom }}
        </option>
      </select>
    </div>
  </div>

  <TitreTypeSelect
    v-if="newTitre.entrepriseId"
    v-model:element="newTitre"
    :domaines="domaines"
  />

  <div v-if="newTitre.typeId" class="tablet-blobs">
    <div class="tablet-blob-1-3 tablet-pt-s pb-s">
      <h6>Nom</h6>
    </div>
    <div class="tablet-blob-2-3">
      <input v-model="newTitre.nom" type="text" class="p-s" />
    </div>
  </div>

  <div v-if="newTitre.typeId === 'arm'" class="tablet-blobs">
    <div class="tablet-blob-1-3 tablet-pt-s pb-s">
      <h6>Prospection mécanisée</h6>
    </div>
    <div class="tablet-blob-2-3">
      <input v-model="newTitre.mecanise" type="checkbox" class="pb-s" />
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
import { permissionsCheck } from '@/utils'

import TitreTypeSelect from './_common/titre-type-select.vue'

export default {
  components: { TitreTypeSelect },

  data() {
    return {
      newTitre: {}
    }
  },

  computed: {
    user() {
      return this.$store.state.user.element
    },

    entreprises() {
      return this.$store.state.user.metas.entreprisesTitresCreation
    },

    entreprise() {
      return this.entreprises.find(e => e.id === this.newTitre.entrepriseId)
    },

    domaines() {
      if (permissionsCheck(this.user, ['super', 'admin', 'editeur'])) {
        return this.$store.state.user.metas.domaines
      }

      if (permissionsCheck(this.user, ['entreprise'])) {
        return this.entreprise.titresTypes.reduce((domaines, tt) => {
          if (!domaines.find(({ id }) => tt.domaine.id === id)) {
            tt.domaine.titresTypes = []
            domaines.push(tt.domaine)
          }

          const domaine = domaines.find(({ id }) => tt.domaine.id === id)

          domaine.titresTypes.push({
            id: tt.id,
            type: tt.type,
            titresCreation: tt.titresCreation
          })

          return domaines
        }, [])
      }

      return []
    },

    complete() {
      return (
        this.newTitre.entrepriseId && this.newTitre.typeId && this.newTitre.nom
      )
    },

    loading() {
      return this.$store.state.loading.includes('titreDemandeAdd')
    }
  },

  methods: {
    entrepriseUpdate(event) {
      this.newTitre = { entrepriseId: event.target.value }
    },

    save() {
      this.$store.dispatch('titreDemande/save', this.newTitre)
    }
  }
}
</script>
