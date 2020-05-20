<template>
  <div class="mb-xxl">
    <div class="line mb-xxl" />
    <div class="tablet-blobs mb">
      <div class="tablet-blob-1-2 mb">
        <h2 class="cap-first mb-m">
          {{ demarche.type.nom }}
        </h2>
        <Statut
          :color="demarche.statut.couleur"
          :nom="demarche.statut.nom"
        />
      </div>
      <div class="tablet-blob-1-2 flex">
        <div
          v-if="demarche.modification || demarche.suppression || demarche.etapesCreation"
          class="flex-right flex"
        >
          <button
            v-if="demarche.etapesCreation"
            class="btn rnd-l-xs py-s px-m h5 flex mr-line"
            :class="{'rnd-r-xs': !demarche.suppression && !demarche.modification }"
            @click="etapeAddPopupOpen"
          >
            <span class="mt-xxs">Ajouter une étape</span>
          </button>
          <button
            v-if="demarche.modification"
            class="btn py-s px-m mr-line"
            :class="{'rnd-l-xs': !demarche.etapesCreation }"
            @click="editPopupOpen"
          >
            <i class="icon-24 icon-pencil" />
          </button>
          <button
            v-if="demarche.suppression"
            class="btn rnd-r-xs py-s px-m mr-line"
            :class="{'rnd-l-xs': !demarche.modification }"
            @click="removePopupOpen"
          >
            <i class="icon-24 icon-trash" />
          </button>
        </div>
      </div>
    </div>

    <TitreEtape
      v-for="etape in demarche.etapes"
      :key="etape.id"
      :etape="etape"
      :demarche-type="demarche.type"
      :demarche-id="demarche.id"
      @titre:eventTrack="eventTrack"
    />
  </div>
</template>

<script>
import Statut from '../_common/statut.vue'
import EtapeEditPopup from './etape/edit.vue'
import TitreEtape from './etape.vue'
import EditPopup from './demarche-edit-popup.vue'
import RemovePopup from './demarche-remove-popup.vue'

export default {
  components: {
    Statut,
    TitreEtape
  },

  props: {
    demarche: {
      type: Object,
      default: () => ({})
    },

    type: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    titre() {
      return this.$store.state.titre.current
    }
  },

  methods: {
    editPopupOpen() {
      const demarche = {}

      demarche.typeId = this.demarche.type.id
      demarche.titreId = this.titre.id
      demarche.id = this.demarche.id

      this.$store.commit('popupOpen', {
        component: EditPopup,
        props: {
          demarche,
          types: this.type.demarchesTypes,
          titreTypeNom: this.type.type.nom,
          titreNom: this.titre.nom
        }
      })

      this.eventTrack({
        categorie: 'titre-sections',
        action: 'titre-demarche_editer',
        nom: this.$route.params.id
      })
    },

    removePopupOpen() {
      this.$store.commit('popupOpen', {
        component: RemovePopup,
        props: {
          id: this.demarche.id,
          typeNom: this.demarche.type.nom,
          titreNom: this.titre.nom,
          titreTypeNom: this.titre.type.type.nom
        }
      })

      this.eventTrack({
        categorie: 'titre-sections',
        action: 'titre-demarche_supprimer',
        nom: this.$route.params.id
      })
    },

    etapeAddPopupOpen() {
      const etape = {
        ordre: 0,
        titreDemarcheId: this.demarche.id,
        typeId: null,
        typeIdOriginal: null,
        statutId: null,
        duree: { ans: null, mois: null },
        titulaires: [],
        amodiataires: [],
        administrations: [],
        substances: [],
        groupes: [],
        geoSystemeIds: [],
        geoSystemeOpposableId: null,
        incertitudes: {},
        contenu: {}
      }

      this.$store.commit('popupOpen', {
        component: EtapeEditPopup,
        props: {
          etape,
          domaineId: this.titre.domaine.id,
          demarcheType: this.demarche.type,
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
      this.$emit('titre:eventTrack', event)
    }
  }
}
</script>
