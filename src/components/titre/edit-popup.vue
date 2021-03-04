<template>
  <Popup :messages="messages">
    <template #header>
      <div>
        <h2 class="cap-first mb-0">
          {{ creation ? "Ajout d'un" : 'Modification du' }} titre
        </h2>
      </div>
    </template>

    <div>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Nom</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <input v-model="titre.nom" type="text" class="p-s" />
        </div>
      </div>
      <hr />
    </div>

    <div>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Domaine</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <select v-model="titre.domaineId" class="p-s mr">
            <option
              v-for="domaine in domaines"
              :key="domaine.id"
              :value="domaine.id"
              :disabled="titre.domaineId === domaine.id"
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
          <h6>Type</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <select v-model="titre.typeId" class="p-s mr" :disabled="!types">
            <option
              v-for="type in types"
              :key="type.id"
              :value="type.id"
              :disabled="titre.typeId === type.id"
            >
              {{ type.type.nom }}
            </option>
          </select>
        </div>
      </div>
      <hr />
    </div>

    <div>
      <h3 class="mb-s">Références</h3>
      <p class="h5 italic">Optionnel</p>
      <hr />
      <div
        v-for="(reference, index) in titre.references"
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
          titre.references && !titre.references.find(r => !r.typeId || !r.nom)
        "
        class="btn rnd-xs py-s px-m full-x mb flex h5"
        @click="referenceAdd"
      >
        <span class="mt-xxs">Ajouter une référence</span
        ><i class="icon-24 icon-plus flex-right" />
      </button>
    </div>

    <template #footer>
      <div v-if="!loading" class="tablet-blobs">
        <div class="tablet-blob-1-3 mb tablet-mb-0">
          <button class="btn-border rnd-xs p-s full-x" @click="cancel">
            Annuler
          </button>
        </div>
        <div class="tablet-blob-2-3">
          <button
            class="btn-flash rnd-xs p-s full-x"
            :disabled="!complete"
            :class="{ disabled: !complete }"
            @click="save"
          >
            Enregistrer
          </button>
        </div>
      </div>
      <div v-else class="p-s full-x bold">
        Enregistrement en cours…
      </div>
    </template>
  </Popup>
</template>

<script>
import Popup from '../_ui/popup.vue'

export default {
  name: 'CaminoDemarcheEditPopup',

  components: {
    Popup
  },

  props: {
    titre: {
      type: Object,
      default: () => ({})
    },

    creation: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    loading() {
      return this.$store.state.popup.loading
    },

    messages() {
      return this.$store.state.popup.messages
    },

    domaines() {
      return this.$store.state.user.metas.domaines.filter(d => d.titresCreation)
    },

    referencesTypes() {
      return this.$store.state.titre.metas.referencesTypes
    },

    types() {
      const domaine = this.domaines.find(
        ({ id }) => id === this.titre.domaineId
      )

      return domaine && domaine.titresTypes.filter(tt => tt.titresCreation)
    },

    complete() {
      return !!this.titre.nom && !!this.titre.typeId && !!this.titre.domaineId
    }
  },

  created() {
    this.get()
    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    async get() {
      await this.$store.dispatch('titre/metasGet')
    },

    async save() {
      const titre = JSON.parse(JSON.stringify(this.titre))
      titre.references = titre.references.filter(reference => {
        return reference.nom
      })

      if (this.creation) {
        await this.$store.dispatch('titre/titreAdd', titre)
      } else {
        await this.$store.dispatch('titre/titreUpdate', titre)
      }

      this.eventTrack({
        categorie: 'titre-sections',
        action: 'titre-enregistrer',
        nom: titre.id
      })
    },

    cancel() {
      this.errorsRemove()
      this.$store.commit('popupClose')
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 27) {
        this.cancel()
      } else if ((e.which || e.keyCode) === 13) {
        if (this.complete) {
          this.save()
        }
      }
    },

    errorsRemove() {
      // this.$store.commit('utilisateur/loginMessagesRemove')
    },

    referenceAdd() {
      this.titre.references.push({ typeId: '', nom: '' })
    },

    referenceRemove(index) {
      this.titre.references.splice(index, 1)
    },

    eventTrack(event) {
      if (this.$matomo) {
        this.$matomo.trackEvent(event.categorie, event.action, event.nom)
      }
    }
  }
}
</script>
