<template>
  <Popup>
    <template slot="header">
      <div>
        <h5>
          <span class="cap-first">
            {{ titreNom }} | Rapport trimestriel d'activité
          </span>
        </h5>
        <h2 class="cap-first mb-0">
          {{ trimestreNom }}
        </h2>
      </div>
    </template>

    <div class="p-s bg-info color-bg mb">
      Besoin d'aide pour remplir ce rapport ? Appelez le 06.61.26.42.89
    </div>

    <div
      v-for="contenu in contenus"
      :key="contenu.id"
    >
      <div class="tablet-blobs">
        <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>{{ contenu.nom }}</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <input
            v-model.number="rapport.contenu[contenu.id]"
            type="number"
            class="p-s mb-s"
            placeholder="…"
          >
          <!-- eslint-disable vue/no-v-html -->
          <p
            class="h5 mb-0"
            v-html="contenu.description"
          />
        </div>
      </div>

      <hr>
    </div>


    <h4>Statut des travaux</h4>
    <div
      v-for="mois in rapport.contenu.travaux"
      :key="mois.id"
    >
      <hr>
      <div class="tablet-blobs">
        <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>{{ mois.nom }}</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <label
            v-for="statut in travauxStatuts"
            :key="statut.id"
          >
            <input
              v-model="mois[statut.id]"
              type="checkbox"
            >{{ statut.nom }}
          </label>
        </div>
      </div>
    </div>

    <hr>
    <h4>Informations complémentaires</h4>
    <hr>
    <div class="mb">
      <textarea
        v-model="rapport.contenu.complement"
        class="p-s mb-s"
      />
      <p class="h5 mb-0">
        Toute information sur les événements marquants du trimestre (accident,
        incident, arrêt ou suspension d’activité en précisant les raisons,
        évolution de l’exploitation, difficultés rencontrées, etc.).
      </p>
    </div>

    <div class="p-s bg-warning color-bg bold mb">
      Une fois enregistré ce formulaire ne sera plus modifiable.
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
        <div
          class="tablet-blob-2-3"
          :class="{ disabled: !complete }"
        >
          <button
            class="btn-flash rnd-xs p-s full-x"
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
  name: 'CaminoTitreTravauxRapportEditPopup',

  components: {
    Popup,
    Messages
  },

  props: {
    rapport: {
      type: Object,
      default: () => ({})
    },
    trimestreNom: {
      type: String,
      default: ''
    },
    titreNom: {
      type: String,
      default: ''
    }
  },

  computed: {
    messages() {
      return this.$store.state.popup.messages
    },
    entreprises() {
      return this.$store.state.entreprises.list
    },
    substances() {
      return this.$store.state.substances.list
    },
    travauxStatuts() {
      return this.$store.state.titreTravaux.rapportStatuts
    },
    contenus() {
      return this.$store.state.titreTravaux.rapportContenus
    },
    travauxComplete() {
      return this.rapport.contenu.travaux.reduce(
        (res, mois) =>
          res &&
          (mois.nonDebutes ||
            mois.exploitationEnCours ||
            mois.arretTemporaire ||
            mois.rehabilitation ||
            mois.arretDefinitif),
        true
      )
    },
    complete() {
      return (
        (this.rapport.contenu.or || this.rapport.contenu.or === 0) &&
        (this.rapport.contenu.mercure || this.rapport.contenu.mercure === 0) &&
        (this.rapport.contenu.carburantDetaxe ||
          this.rapport.contenu.carburantDetaxe === 0) &&
        (this.rapport.contenu.carburantConventionnel ||
          this.rapport.contenu.carburantConventionnel === 0) &&
        (this.rapport.contenu.pompes || this.rapport.contenu.pompes === 0) &&
        (this.rapport.contenu.pelles || this.rapport.contenu.pelles === 0) &&
        (this.rapport.contenu.effectifs ||
          this.rapport.contenu.effectifs === 0) &&
        (this.rapport.contenu.environnement ||
          this.rapport.contenu.environnement === 0) &&
        this.travauxComplete
      )
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
      if (this.complete) {
        this.rapport.date = new Date()

        this.$store.dispatch('titreTravaux/rapportAdd', this.rapport)
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
      this.$store.commit('popupMessagesRemove')
    }
  }
}
</script>
