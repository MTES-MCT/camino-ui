<template>
  <Popup>
    <template slot="header">
      <div>
        <h2 class="mb-0">
          {{
            action === 'create'
              ? "Création d'une fiche entreprise"
              : "Modification d'une fiche entreprise"
          }}
        </h2>
      </div>
    </template>
    <div v-if="situation !== 'horsApi'">
      <div v-if="action === 'create'">
        <p>Renseignez le numéro Siren de l'entreprise</p>
      </div>

      <hr>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Siren</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <input
            v-model="entreprise.legalSiren"
            type="text"
            class="p-s"
            placeholder="Siren"
          >
        </div>
      </div>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s" />
        <div
          class="mb tablet-blob-2-3"
          :class="{disabled: !sirenValide}"
        >
          <button
            class="btn-border rnd-xs p-s full-x"
            @click="findBySiren"
          >
            Interroger l'API Insee
          </button>
        </div>
      </div>

      <div v-if="situation === 'enBase'">
        <hr>
        <p>Cette entreprise est dejà répertoriée dans la base de Camino</p>
      </div>
      <div v-if="situation === 'enBase' || situation === 'dansApi'">
        <hr>
        <div class="tablet-blobs">
          <div class="tablet-blob-1-3 tablet-pt-s pb-s">
            <h6>Nom</h6>
          </div>
          <div class="mb tablet-blob-2-3">
            {{ entreprise.nom }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="situation === 'horsApi'">
      <p>L'entreprise de numéro Siren {{ entreprise.legalSiren }} est introuvable dans l'api INSEE</p>
      <p>Il n'est pas préconisé de continuer l'opération</p>
      <hr>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Nom</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <input
            v-model="entreprise.nom"
            type="text"
            class="p-s"
          >
        </div>
      </div>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Adresse</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <input
            v-model="entreprise.adresse"
            type="text"
            class="p-s"
          >
        </div>
      </div>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Code postal</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <input
            v-model="entreprise.codePostal"
            type="text"
            class="p-s"
          >
        </div>
      </div>
    </div>

    <div v-if="situation === 'dansApi'">
      <hr>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Forme légale</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          {{ entreprise.legalForme }}
        </div>
      </div>
    </div>

    <div v-if="situation === 'dansApi' || situation === 'horsApi'">
      <hr>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Téléphone</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <input
            v-model="entreprise.tel"
            type="text"
            class="p-s"
            placeholder="0100000000"
          >
        </div>
      </div>

      <hr>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Adresse électronique</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <input
            v-model="entreprise.email"
            type="text"
            class="p-s"
            placeholder="xxx@yyy.fr"
          >
        </div>
      </div>

      <hr>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Site internet</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <input
            v-model="entreprise.url"
            type="text"
            class="p-s"
            placeholder="http://xxx.yyy.fr"
          >
        </div>
      </div>
    </div>

    <template slot="footer">
      <Messages :messages="messages" />
      <div class="tablet-blobs">
        <div class="mb tablet-mb-0 tablet-blob-1-3">
          <button
            class="btn-border rnd-xs p-s full-x"
            @click="cancel"
            @keyup.esc.native="cancel"
          >
            Annuler
          </button>
        </div>
        <div
          class="tablet-blob-2-3"
          :class="{ disabled: !complete }"
        >
          <button
            class="btn-flash rnd-xs p-s full-x"
            @click="save"
            @keyup.enter.native="save"
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
  name: 'CaminoEntrepriseEditPopup',

  components: {
    Popup,
    Messages
  },

  props: {
    entreprise: {
      type: Object,
      default: () => ({})
    },
    action: {
      type: String,
      default: 'edit',
      validator: val => ['edit', 'create'].includes(val)
    },
    situation: {
      type: String,
      default: 'absent'
    }
  },

  data() {
    return {
      cgu: null
    }
  },

  computed: {
    messages() {
      return this.$store.state.popup.messages
    },
    complete() {
      if (this.action === 'create') {
        return this.entreprise.siren && this.entreprise.url
      }

      return this.entreprise.siren && this.entreprise.url
    },
    sirenValide() {
      return (
        this.entreprise.legalSiren && this.entreprise.legalSiren.length === 9
      )
    }
  },

  created() {
    document.addEventListener('keyup', this.keyup)
    this.current = null
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    save() {
      if (this.complete) {
        const entreprise = JSON.parse(JSON.stringify(this.entreprise))

        if (this.action === 'create') {
          this.$store.dispatch('entreprises/add', entreprise)
        } else {
          this.$store.dispatch('entreprises/update', entreprise)
        }
      }
    },

    findBySiren() {
      if (this.sirenValide) {
        this.$store.dispatch(
          'entreprises/findBySiren',
          this.entreprise.legalSiren
        )
      }
    },

    // addPopupOpen() {
    //   this.$store.commit('popupOpen', {
    //     component: EntrepriseEditPopup,
    //     props: {
    //       entreprise: { nom: 'toto' },
    //       action: 'create'
    //     }
    //   })
    // },

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
      this.$store.commit('popupMessagesRemove')
    }
  }
}
</script>
