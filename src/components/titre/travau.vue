<template>
  <div class="mb-xxl">
    <div class="line mb-xxl" />
    <div class="tablet-blobs mb">
      <div class="tablet-blob-1-2 mb">
        <h2 class="cap-first mb-m">
          {{ travaux.type.nom }}
        </h2>
        <Statut :color="travaux.statut.couleur" :nom="travaux.statut.nom" />
      </div>
      <div class="tablet-blob-1-2 flex">
        <div
          v-if="
            travaux.modification ||
              travaux.suppression ||
              travaux.etapesCreation
          "
          class="flex-right flex"
        >
          <button
            v-if="travaux.etapesCreation"
            class="btn rnd-l-xs py-s px-m h5 flex mr-line"
            :class="{
              'rnd-r-xs': !travaux.suppression && !travaux.modification
            }"
            @click="etapeAddPopupOpen"
          >
            <span class="mt-xxs">Ajouter une étape</span>
          </button>
          <button
            v-if="travaux.modification"
            class="btn py-s px-m mr-line"
            :class="{ 'rnd-l-xs': !travaux.etapesCreation }"
            @click="editPopupOpen"
          >
            <i class="icon-24 icon-pencil" />
          </button>
          <button
            v-if="travaux.suppression"
            class="btn rnd-r-xs py-s px-m mr-line"
            :class="{ 'rnd-l-xs': !travaux.modification }"
            @click="removePopupOpen"
          >
            <i class="icon-24 icon-trash" />
          </button>
        </div>
      </div>
    </div>

    <TitreTravauxEtape
      v-for="etape in travaux.etapes"
      :key="etape.id"
      :etape="etape"
      :travaux-type="travaux.type"
      :travaux-id="travaux.id"
      @titre-event-track="eventTrack"
    />
  </div>
</template>

<script>
import Statut from '../_common/statut.vue'
import EtapeEditPopup from './travau-etape/edit.vue'
import TitreTravauxEtape from './travau-etape.vue'
import EditPopup from './travaux-edit-popup.vue'
import RemovePopup from './travaux-remove-popup.vue'

export default {
  components: {
    Statut,
    TitreTravauxEtape
  },

  props: {
    travaux: { type: Object, default: () => ({}) },
    type: { type: Object, default: () => ({}) }
  },

  computed: {
    titre() {
      return this.$store.state.titre.current
    }
  },

  methods: {
    editPopupOpen() {
      const travaux = {}

      travaux.typeId = this.travaux.type.id
      travaux.titreId = this.titre.id
      travaux.id = this.travaux.id

      this.$store.commit('popupOpen', {
        component: EditPopup,
        props: {
          travaux,
          types: this.type.travauxsTypes,
          titreTypeNom: this.type.type.nom,
          titreNom: this.titre.nom
        }
      })

      this.eventTrack({
        categorie: 'titre-sections',
        action: 'titre-travaux_editer',
        nom: this.$route.params.id
      })
    },

    removePopupOpen() {
      this.$store.commit('popupOpen', {
        component: RemovePopup,
        props: {
          id: this.travaux.id,
          typeNom: this.travaux.type.nom,
          titreNom: this.titre.nom,
          titreTypeNom: this.titre.type.type.nom
        }
      })

      this.eventTrack({
        categorie: 'titre-sections',
        action: 'titre-travaux_supprimer',
        nom: this.$route.params.id
      })
    },

    etapeAddPopupOpen() {
      const etape = {
        ordre: 0,
        titreTravauxId: this.travaux.id,
        typeId: null,
        typeIdOriginal: null,
        statutId: null,
        duree: { ans: null, mois: null },
        contenu: {}
      }

      this.$store.commit('popupOpen', {
        component: EtapeEditPopup,
        props: {
          etape,
          domaineId: this.titre.domaine.id,
          travauxType: this.travaux.type,
          titreNom: this.titre.nom,
          creation: true
        }
      })

      this.eventTrack({
        categorie: 'titre-sections',
        action: 'titre-etape_ajouter',
        nom: this.$route.params.id
      })
    },

    eventTrack(event) {
      this.$emit('titre-event-track', event)
    }
  }
}
</script>
