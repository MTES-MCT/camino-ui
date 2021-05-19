<template>
  <h1 class="mt-xs mb-m">Demande de titre</h1>
  <hr />

  <div class="tablet-blobs">
    <div class="tablet-blob-1-3 tablet-pt-s pb-s">
      <h5>Entreprise</h5>
    </div>
    <div class="tablet-blob-2-3">
      <select
        class="p-s"
        :value="newTitre?.entrepriseId"
        @change="entrepriseUpdate"
      >
        <option
          v-for="e in entreprises"
          :key="e.id"
          :value="e.id"
          :disabled="newTitre.entrepriseId === e.id"
        >
          {{ e.nom }}
        </option>
      </select>
    </div>
  </div>

  <hr />

  <TitreTypeSelect
    v-if="newTitre.entrepriseId"
    v-model:element="newTitre"
    :domaines="domaines"
  />

  <div v-if="newTitre.typeId">
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5>Nom</h5>
      </div>
      <div class="tablet-blob-2-3">
        <input v-model="newTitre.nom" type="text" class="p-s" />
      </div>
    </div>
    <hr />
  </div>

  <div v-if="newTitre.typeId === 'arm'">
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5>Prospection mécanisée</h5>
      </div>
      <div class="tablet-blob-2-3">
        <input v-model="newTitre.mecanise" type="checkbox" class="pb-s" />
      </div>
    </div>
    <hr />
  </div>

  <div v-if="newTitre.typeId && newTitre.entrepriseId && !entrepriseCheck">
    <h3 class="mb-s">Références</h3>
    <p class="h6 italic">Optionnel</p>
    <div
      v-for="(reference, index) in newTitre.references"
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
        newTitre.references &&
        !newTitre.references.find(r => !r.typeId || !r.nom)
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
        class="btn-flash rnd-xs p-s full-x"
        @click="save"
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
      return this.$store.state.titreDemande.metas.referencesTypes
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

  watch: {
    entreprises: 'init'
  },

  async created() {
    await this.init()
  },

  methods: {
    async init() {
      if (!this.entreprises.length) {
        await this.$store.dispatch('pageError')
      }

      await this.$store.dispatch('titreDemande/init')

      if (this.entreprises?.length === 1) {
        this.newTitre.entrepriseId = this.entreprises[0].id
      }
    },

    entrepriseUpdate(event) {
      this.newTitre = { entrepriseId: event.target.value, references: [] }
    },

    save() {
      this.$store.dispatch('titreDemande/save', this.newTitre)
    },

    referenceAdd() {
      this.newTitre.references.push({ typeId: '', nom: '' })
    },

    referenceRemove(index) {
      this.newTitre.references.splice(index, 1)
    }
  }
}
</script>
