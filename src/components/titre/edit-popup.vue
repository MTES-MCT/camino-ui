<template>
  <Popup :messages="messages">
    <template #header>
      <div>
        <h2 class="cap-first">
          {{ creation ? "Ajout d'un" : 'Modification du' }} titre
        </h2>
      </div>
    </template>

    <div>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h5>Nom</h5>
        </div>
        <div class="mb tablet-blob-2-3">
          <input v-model="titre.nom" type="text" class="p-s" />
        </div>
      </div>
      <hr />
    </div>

    <TitreTypeSelect v-model:element="titre" :domaines="domaines" />

    <div>
      <h3 class="mb-s">Références</h3>
      <p class="h6 italic">Optionnel</p>
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
        class="btn rnd-xs py-s px-m full-x mb flex h6"
        @click="referenceAdd"
      >
        <span class="mt-xxs">Ajouter une référence</span
        ><i class="icon-24 icon-plus flex-right" />
      </button>
    </div>

    <div v-if="userIsSuper">
      <h3 class="mb-s">Administrations</h3>
      <p class="h6 italic">Administrations ajoutées manuellement au titre</p>
      <hr />
      <div
        v-for="(administration, index) in titre.titresAdministrations"
        :key="index"
        class="flex full-x mb-s"
      >
        <select v-model="administration.id" class="p-s mr-s">
          <option v-for="a in administrations" :key="a.id" :value="a.id">
            {{ a.nom }}
          </option>
        </select>
        <div class="flex-right">
          <button
            class="btn py-s px-m rnd-xs"
            @click="administrationRemove(index)"
          >
            <i class="icon-24 icon-minus" />
          </button>
        </div>
      </div>

      <button
        v-if="
          titre.titresAdministrations &&
          !titre.titresAdministrations.find(r => !r.id)
        "
        class="btn rnd-xs py-s px-m full-x mb flex h6"
        @click="administrationAdd"
      >
        <span class="mt-xxs">Ajouter une administration</span
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
            ref="save-button"
            class="btn btn-primary rnd-xs p-s full-x"
            :disabled="!complete"
            :class="{ disabled: !complete }"
            @click="save"
          >
            Enregistrer
          </button>
        </div>
      </div>
      <div v-else class="p-s full-x bold">Enregistrement en cours…</div>
    </template>
  </Popup>
</template>

<script>
import Popup from '../_ui/popup.vue'

import TitreTypeSelect from '../_common/titre-type-select.vue'

export default {
  name: 'CaminoDemarcheEditPopup',

  components: {
    Popup,
    TitreTypeSelect
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
      return this.$store.state.user.metas.domaines.filter(d =>
        d.titresTypes.some(dtt => dtt.titresCreation)
      )
    },

    referencesTypes() {
      return this.$store.state.titre.metas.referencesTypes
    },

    administrations() {
      return this.$store.state.titre.metas.administrations
    },

    complete() {
      return !!this.titre.nom && !!this.titre.typeId && !!this.titre.domaineId
    },

    userIsSuper() {
      return this.$store.getters['user/userIsSuper']
    }
  },

  created() {
    this.get()
    document.addEventListener('keyup', this.keyup)
  },

  beforeUnmount() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    async get() {
      await this.$store.dispatch('titre/init')
    },

    async save() {
      if (this.complete) {
        const titre = JSON.parse(JSON.stringify(this.titre))
        titre.references = titre.references.filter(reference => {
          return reference.nom
        })

        if (this.creation) {
          await this.$store.dispatch('titre/add', titre)
        } else {
          await this.$store.dispatch('titre/update', titre)
        }

        this.eventTrack({
          categorie: 'titre-sections',
          action: 'titre-enregistrer',
          nom: titre.id
        })
      }
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
          this.$refs['save-button'].focus()
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

    administrationAdd() {
      this.titre.titresAdministrations.push({ id: '' })
    },

    administrationRemove(index) {
      this.titre.titresAdministrations.splice(index, 1)
    },

    eventTrack(event) {
      if (this.$matomo) {
        this.$matomo.trackEvent(event.categorie, event.action, event.nom)
      }
    }
  }
}
</script>
