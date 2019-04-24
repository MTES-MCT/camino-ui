<template>
  <div class="mb">
    <div class="card-border" />
    <div class="desktop-blobs">
      <div class="desktop-blob-1-2">
        <h3 class="cap-first">
          {{ demarche.type.nom }}
        </h3>
      </div>
      <div class="desktop-blob-1-4">
        <h6>Statut</h6>
        <h4>
          <Dot :color="`bg-${demarche.statut.couleur}`" /><span
            class="cap-first"
          >
            {{ demarche.statut.nom }}
          </span>
        </h4>
      </div>
      <div class="desktop-blob-1-4 flex">
        <button
          class="btn-border rnd-l-xs py-s px-m mb flex-right"
          @click="removePopupOpen"
        >
          <i class="icon-24 icon-24-trash" />
        </button>

        <button
          class="btn-border rnd-r-xs py-s px-m mb"
          @click="editPopupOpen"
        >
          <i class="icon-24 icon-24-pencil" />
        </button>
      </div>
    </div>

    <button
      v-if="permissionsCheck(['super'])"
      class="btn-border rnd-xs p-s full-x flex mb"
      @click="etapeAddPopupOpen"
    >
      Ajouter une étape <i class="icon-24 icon-24-plus flex-right" />
    </button>

    <TitreEtape
      v-for="etape in demarche.etapes"
      :key="etape.id"
      :etape="etape"
      :demarche-type="demarche.type"
      :demarche-id="demarche.id"
    />
  </div>
</template>

<script>
import Dot from '../ui/dot.vue'
import EtapeEditPopup from './etape-edit-popup.vue'
import TitreEtape from './etape.vue'
import EditPopup from './demarche-edit-popup.vue'

export default {
  components: {
    Dot,
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
    },

    titreId: {
      type: String,
      default: ''
    }
  },

  computed: {
    titre() {
      return this.$store.state.titre.current
    }
  },

  methods: {
    editPopupOpen() {
      const demarche = JSON.parse(JSON.stringify(this.demarche))

      demarche.typeId = demarche.type.id
      delete demarche.type

      demarche.statutId = demarche.statut.id
      delete demarche.statut

      this.$store.commit('popupOpen', {
        component: EditPopup,
        props: {
          demarche,
          type: this.type,
          titreNom: this.titre.nom
        }
      })
    },

    removePopupOpen() {},

    etapeAddPopupOpen() {
      const etape = {
        id: `${this.demarche.id}-ooo00`,
        ordre: 0,
        titreDemarcheId: this.demarche.id,
        typeId: null,
        statutId: null,
        visas: [],
        titulairesIds: [],
        amodiatairesIds: [],
        substancesIds: [],
        groupes: []
      }

      this.$store.commit('popupOpen', {
        component: EtapeEditPopup,
        props: {
          etape,
          domaineId: this.$store.state.titre.current.domaine.id,
          demarcheType: this.demarche.type,
          titreNom: this.$store.state.titre.current.nom
        }
      })
    }
  }
}
</script>
