<template>
  <div class="sticky-header width-full">
    <div class="container">
      <div class="tablet-blobs">
        <div class="tablet-blob-2-3">
          <h1 class="mt-m mb-m">
            {{ titre.nom }}
          </h1>
        </div>
        <div class="tablet-blob-1-3 flex">
          <div class="flex-right flex my-s">
            <button
              class="btn-border small rnd-l-xs px-m py-s lh-2"
              :class="{
                'rnd-r-xs': !titre.suppression || !titre.modification,
                'mr-px': titre.suppression || titre.modification
              }"
              @click="emailSend"
            >
              <span class="mt-xs">Signaler une erreur…</span>
            </button>
            <button
              v-if="titre.modification"
              class="btn py-s px-m mr-px"
              :class="{ 'rnd-r-xs': !titre.suppression }"
              @click="editPopupOpen"
            >
              <i class="icon-24 icon-pencil" />
            </button>
            <button
              v-if="titre.suppression"
              class="btn rnd-r-xs py-s px-m"
              @click="removePopupOpen"
            >
              <i class="icon-24 icon-trash" />
            </button>
          </div>
        </div>
      </div>

      <div class="line width-full" />
    </div>
  </div>
</template>

<script>
import EditPopup from './edit-popup.vue'
import RemovePopup from './remove-popup.vue'

export default {
  props: {
    titre: {
      type: Object,
      default: () => ({})
    }
  },

  emits: ['titre-event-track'],

  methods: {
    editPopupOpen() {
      const titre = {}
      titre.id = this.titre.id
      titre.nom = this.titre.nom
      titre.domaineId = this.titre.domaine.id
      titre.typeId = this.titre.type.id
      titre.references = this.titre.references.map(reference => ({
        typeId: reference.type.id,
        nom: reference.nom
      }))
      titre.titresAdministrations = this.titre.titresAdministrations

      this.$store.commit('popupOpen', {
        component: EditPopup,
        props: {
          titre
        }
      })

      this.eventTrack({
        categorie: 'titre-sections',
        action: 'titre-editer',
        nom: this.$route.params.id
      })
    },

    removePopupOpen() {
      this.$store.commit('popupOpen', {
        component: RemovePopup,
        props: {
          titreNom: this.titre.nom,
          titreId: this.titre.id,
          typeNom: this.titre.type.type.nom
        }
      })

      this.eventTrack({
        categorie: 'titre-sections',
        action: 'titre-supprimer',
        nom: this.$route.params.id
      })
    },

    emailSend() {
      this.eventTrack({
        categorie: 'titre-sections',
        action: 'titre-erreur_signaler',
        nom: this.$route.params.id
      })
      window.location.href = `mailto:camino@beta.gouv.fr?subject=Erreur ${this.$route.params.id}&body=Bonjour, j'ai repéré une erreur sur le titre ${this.$route.params.id} : `
    },

    eventTrack(event) {
      this.$emit('titre-event-track', event)
    }
  }
}
</script>
