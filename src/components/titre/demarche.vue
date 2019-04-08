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
      <div class="desktop-blob-1-4">
        <button
          v-if="permissionsCheck(['super'])"
          class="btn-border rnd-xs p-s full-x flex mb"
          @click="etapeEditPopupOpen"
        >
          Ajouter une étape <i class="icon-24 icon-24-plus flex-right" />
        </button>
      </div>
    </div>
    <TitreEtape
      v-for="etape in demarche.etapes"
      :key="etape.id"
      :etape="etape"
      :demarche-type="demarche.type"
    />
  </div>
</template>

<script>
import Dot from '../ui/dot.vue'
import EditPopup from './etape-edit-popup.vue'
import TitreEtape from './etape.vue'

export default {
  components: {
    Dot,
    TitreEtape
  },

  props: {
    demarche: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    etapeEditPopupOpen() {
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
        component: EditPopup,
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
