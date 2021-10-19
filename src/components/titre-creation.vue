<template>
  <h1 class="mt-xs mb-m">Demande de titre</h1>
  <hr />

  <div class="tablet-blobs">
    <div class="tablet-blob-1-3 tablet-pt-s pb-s">
      <h5>Entreprise</h5>
    </div>
    <div class="tablet-blob-2-3">
      <select
        class="p-s mb"
        :value="titreDemande?.entrepriseId"
        @change="entrepriseUpdate"
      >
        <option
          v-for="e in entreprises"
          :key="e.id"
          :value="e.id"
          :disabled="titreDemande.entrepriseId === e.id"
        >
          {{ e.nom }}
        </option>
      </select>
    </div>
  </div>

  <hr />

  <TitreTypeSelect
    v-if="titreDemande.entrepriseId"
    v-model:element="titreDemande"
    :domaines="domaines"
  />

  <div v-if="titreDemande.typeId">
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5>Nom du titre</h5>
      </div>
      <div class="tablet-blob-2-3">
        <input v-model="titreDemande.nom" type="text" class="p-s mb" />
      </div>
    </div>
    <hr />
  </div>

  <div
    v-if="titreDemande.typeId && titreDemande.entrepriseId && !entrepriseCheck"
  >
    <h3 class="mb-s">Références</h3>
    <p class="h6 italic">Optionnel</p>
    <div
      v-for="(reference, index) in titreDemande.references"
      :key="index"
      class="flex full-x mb-s"
    >
      <select v-model="reference.typeId" class="p-s mr-s">
        <option
          v-for="referenceType in referencesTypes"
          :key="referenceType.id"
          :value="referenceType.id"
        >
          {{ referenceType.nom }}
        </option>
      </select>
      <input
        v-model="reference.nom"
        type="text"
        class="p-s mr-s"
        placeholder="valeur"
      />
      <div class="flex-right">
        <button class="btn py-s px-m rnd-xs" @click="referenceRemove(index)">
          <i class="icon-24 icon-minus" />
        </button>
      </div>
    </div>

    <button
      v-if="
        titreDemande.references &&
        !titreDemande.references.find(r => !r.typeId || !r.nom)
      "
      class="btn small rnd-xs py-s px-m full-x mb flex"
      @click="referenceAdd"
    >
      <span class="mt-xxs">Ajouter une référence</span
      ><i class="icon-24 icon-plus flex-right" />
    </button>

    <hr />
  </div>

  <div class="tablet-blobs mb">
    <div class="tablet-blob-1-3" />
    <div class="tablet-blob-2-3">
      <button
        v-if="!loading"
        id="cmn-titre-activite-edit-popup-button-enregistrer"
        ref="save-button"
        :disabled="!complete"
        class="btn btn-primary"
        @click="save"
      >
        Créer le titre
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
      titreDemande: {}
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
      return this.entreprises.find(e => e.id === this.titreDemande.entrepriseId)
    },

    entrepriseCheck() {
      return permissionsCheck(this.user, ['entreprise'])
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

    referencesTypes() {
      return this.$store.state.titreCreation.metas.referencesTypes
    },

    complete() {
      return (
        this.titreDemande.entrepriseId &&
        this.titreDemande.typeId &&
        this.titreDemande.nom
      )
    },

    loading() {
      return this.$store.state.loading.includes('titreCreationAdd')
    }
  },

  watch: {
    entreprises: 'init'
  },

  async created() {
    await this.init()

    document.addEventListener('keyup', this.keyUp)
  },

  beforeUnmount() {
    document.removeEventListener('keyup', this.keyUp)
  },

  methods: {
    keyUp(e) {
      if ((e.which || e.keyCode) === 13 && this.complete && !this.loading) {
        this.$refs['save-button'].focus()
        this.save()
      }
    },
    async init() {
      if (!this.entreprises.length) {
        await this.$store.dispatch('pageError')
      }

      await this.$store.dispatch('titreCreation/init')

      if (this.entreprises?.length === 1) {
        this.titreDemande.entrepriseId = this.entreprises[0].id
      }
    },

    entrepriseUpdate(event) {
      this.titreDemande = { entrepriseId: event.target.value, references: [] }
    },

    save() {
      this.$store.dispatch('titreCreation/save', this.titreDemande)
    },

    referenceAdd() {
      this.titreDemande.references.push({ typeId: '', nom: '' })
    },

    referenceRemove(index) {
      this.titreDemande.references.splice(index, 1)
    }
  }
}
</script>
