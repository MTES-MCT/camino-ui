<template>
  <div class="mb-xxl">
    <div class="tablet-blobs mb">
      <div class="tablet-blob-1-2">
        <h2 class="cap-first mb-s">
          {{ travaux.type.nom }}
        </h2>
        <div class="mb-s hide">
          <Statut :color="travaux.statut.couleur" :nom="travaux.statut.nom" />
        </div>
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
            class="btn small rnd-l-xs py-s px-m flex mr-px"
            :class="{
              'rnd-r-xs': !travaux.suppression && !travaux.modification
            }"
            @click="etapeAdd"
          >
            <span class="mt-xxs">Ajouter une étape</span>
          </button>
          <button
            v-if="travaux.modification"
            class="btn py-s px-m mr-px"
            :class="{ 'rnd-l-xs': !travaux.etapesCreation }"
            @click="edit"
          >
            <i class="icon-24 icon-pencil" />
          </button>
          <button
            v-if="travaux.suppression"
            class="btn rnd-r-xs py-s px-m mr-px"
            :class="{ 'rnd-l-xs': !travaux.modification }"
            @click="removePopupOpen"
          >
            <i class="icon-24 icon-trash" />
          </button>
        </div>
      </div>
    </div>

    <TitreTravauxEtape
      v-for="travauxEtape in travaux.travauxEtapes"
      :key="travauxEtape.id"
      :travaux-etape="travauxEtape"
      :travaux-type="travaux.type"
      :travaux-id="travaux.id"
      :titre-id="titre.id"
      :titre-nom="titre.nom"
      :titre-type-type="titre.type.type"
      :opened="etapeOpened[travauxEtape.id]"
      @close="travauxEtapeClose(travauxEtape.id)"
      @toggle="travauxEtapeToggle(travauxEtape.id)"
    />

    <div class="line width-full my-xxl" />
  </div>
</template>

<script>
import Statut from '../_common/statut.vue'
import TitreTravauxEtape from '../travaux-etape/preview.vue'
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

  emits: ['titre-event-track'],

  computed: {
    titre() {
      return this.$store.state.titre.element
    },
    etapeOpened() {
      return this.$store.state.titre.opened.travaux
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

    etapeAdd() {
      this.$router.push({
        name: 'travaux-etape-creation',
        query: { 'travaux-id': this.travaux.id }
      })

      this.eventTrack({
        categorie: 'titre-sections',
        action: 'titre-travaux-etape_ajouter',
        nom: this.$route.params.id
      })
    },

    eventTrack(event) {
      this.$emit('titre-event-track', event)
    },

    travauxEtapeClose(id) {
      this.$store.commit('titre/close', { section: 'travaux', id })
    },

    travauxEtapeToggle(id) {
      this.$store.commit('titre/toggle', { section: 'travaux', id })
    }
  }
}
</script>
