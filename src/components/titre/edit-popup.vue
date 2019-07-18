<template>
  <Popup>
    <template slot="header">
      <div>
        <h2 class="cap-first mb-0">
          {{ creation ? 'Ajout' : 'Modification' }} d'un titre
        </h2>
      </div>
    </template>

    <div>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Nom</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <input
            v-model="titre.nom"
            type="text"
            class="p-s"
            placeholder="–"
          >
        </div>
      </div>
      <hr>
    </div>

    <div>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Domaine</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <select
            v-model="titre.domaineId"
            type="text"
            class="p-s mr"
          >
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
      <hr>
    </div>

    <div>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Type</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <select
            v-model="titre.typeId"
            type="text"
            class="p-s mr"
            :disabled="!types"
          >
            <option
              v-for="type in types"
              :key="type.id"
              :value="type.id"
              :disabled="titre.typeId === type.id"
            >
              {{ type.nom }}
            </option>
          </select>
        </div>
      </div>
      <hr>
    </div>

    <div>
      <h3 class="mb-s">
        Références
      </h3>
      <p class="h6 italic mb-s">
        Optionel
      </p>
      <hr>
      <div
        v-for="(reference, index) in titre.references"
        :key="index"
        class="flex full-x mb"
      >
        <input
          v-model="reference.type"
          type="text"
          class="p-s mr"
          placeholder="type"
        >
        <input
          v-model="reference.valeur"
          type="text"
          class="p-s mr"
          placeholder="valeur"
        >
        <div class="flex-right">
          <button
            class="btn-border py-s px-m rnd-xs"
            @click="referenceRemove(index)"
          >
            <i class="icon-24 icon-minus" />
          </button>
        </div>
      </div>

      <button
        v-if="titre.references && !titre.references.find(r => !r.type || !r.valeur)"
        class="btn-border rnd-xs py-s px-m full-x mb flex"
        @click="referenceAdd"
      >
        Ajouter une référence<i class="icon-24 icon-plus flex-right" />
      </button>
    </div>

    <template slot="footer">
      <Messages :messages="messages" />
      <div class="tablet-blobs">
        <div class="mb tablet-mb-0 tablet-blob-1-3">
          <button
            class="btn-border rnd-xs p-s full-x"
            @click="cancel"
          >
            Annuler
          </button>
        </div>
        <div class="tablet-blob-2-3">
          <button
            class="btn-flash rnd-xs p-s full-x"
            :disabled="!complete"
            @click="save"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </template>
  </Popup>
</template>

<script>
import Popup from '../ui/popup.vue'
import Messages from '../ui/messages.vue'

export default {
  name: 'CaminoDemarcheEditPopup',

  components: {
    Popup,
    Messages
  },

  props: {
    titre: {
      type: Object,
      default: () => ({})
    },

    domaines: {
      type: Array,
      default: () => []
    },

    creation: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    messages() {
      return this.$store.state.popup.messages
    },

    types() {
      const domaine = this.domaines.find(d => d.id === this.titre.domaineId)
      return domaine && domaine.types
    },

    complete() {
      return !!this.titre.nom && !!this.titre.typeId && !!this.titre.domaineId
    }
  },

  created() {
    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    save() {
      const titre = JSON.parse(JSON.stringify(this.titre))

      titre.references &&
        titre.references.length &&
        titre.references.forEach((r, index) => {
          if (!r.type || !r.valeur) {
            titre.references.splice(index, 1)
          }
        })

      if (this.creation) {
        this.$store.dispatch('titre/titreCreate', titre)
      } else {
        this.$store.dispatch('titre/titreUpdate', titre)
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
        this.save()
      }
    },

    errorsRemove() {
      // this.$store.commit('utilisateur/loginMessagesRemove')
    },

    referenceAdd() {
      this.titre.references.push({ type: '', valeur: '' })
    },

    referenceRemove(index) {
      this.titre.references.splice(index, 1)
    }
  }
}
</script>
