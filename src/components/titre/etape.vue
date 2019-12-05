<template>
  <Accordion
    ref="accordion"
    class="mb"
    icon-opened-class="icon-file-chevron-b"
    icon-closed-class="icon-file-chevron-t"
  >
    <template slot="section">
      {{ etape.date | dateFormat }}
      <span
        v-if="etape.incertitudes && etape.incertitudes.date"
        class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
      >?</span>
    </template>
    <template slot="title">
      <Dot :color="`bg-${etape.statut.couleur}`" />
      <span class="cap-first">
        {{ etape.type.nom }}
      </span>
    </template>

    <template
      v-if="etape.editable || etape.supprimable"
      slot="buttons"
    >
      <button
        v-if="etape.supprimable"
        class="btn-alt py-s px-m"
        @click="removePopupOpen"
      >
        <i class="icon-24 icon-trash" />
      </button>

      <button
        v-if="etape.editable"
        class="btn-alt py-s px-m"
        @click="editPopupOpen"
      >
        <i class="icon-24 icon-pencil" />
      </button>
    </template>

    <template
      v-if="hasProps || etape.editable"
      slot="sub"
    >
      <div
        v-if="hasProps"
        class="px-m pt-m border-b-s"
      >
        <div
          v-if="etape.duree"
          class="tablet-blobs"
        >
          <div class="tablet-blob-1-4">
            <h6>
              Durée
            </h6>
          </div>
          <div class="tablet-blob-3-4">
            <p>
              <span v-if="duree.ans">{{ `${duree.ans} an${duree.ans > 1 ? 's' : ''}` }}</span><span v-if="duree.ans && duree.mois"> et </span>
              <span v-if="duree.mois">{{ `${duree.mois} mois` }}</span>
              <span
                v-if="etape.incertitudes && etape.incertitudes.duree"
                class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
              >?</span>
            </p>
          </div>
        </div>
        <div
          v-if="etape.dateDebut"
          class="tablet-blobs"
        >
          <div class="tablet-blob-1-4">
            <h6>
              Date de début
            </h6>
          </div>
          <div class="tablet-blob-3-4">
            <p>
              {{ etape.dateDebut | dateFormat }}
              <span
                v-if="etape.incertitudes && etape.incertitudes.dateDebut"
                class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
              >?</span>
            </p>
          </div>
        </div>
        <div
          v-if="etape.dateFin"
          class="tablet-blobs"
        >
          <div class="tablet-blob-1-4">
            <h6>
              Date d'échéance
            </h6>
          </div>
          <div class="tablet-blob-3-4">
            <p>
              {{ etape.dateFin | dateFormat }}
              <span
                v-if="etape.incertitudes && etape.incertitudes.dateFin"
                class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
              >?</span>
            </p>
          </div>
        </div>
        <div
          v-if="etape.points.length"
          class="tablet-blobs"
        >
          <div class="tablet-blob-1-4">
            <h6>
              Périmètre
            </h6>
          </div>
          <div class="tablet-blob-3-4">
            <p>
              –
              <span
                v-if="etape.incertitudes && etape.incertitudes.points"
                class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
              >?</span>
            </p>
          </div>
        </div>
        <div
          v-if="etape.titulaires.length"
          class="tablet-blobs"
        >
          <div class="tablet-blob-1-4">
            <h6>
              Titulaire{{ etape.titulaires.length > 1 ? 's' : '' }}
            </h6>
          </div>
          <div class="tablet-blob-3-4">
            <ul class="list-prefix mb">
              <li
                v-for="t in etape.titulaires"
                :key="t.id"
              >
                {{ etablissementNameFind(t.etablissements, etape.date) || t.nom }}
                <span
                  v-if="etape.incertitudes && etape.incertitudes.titulaires"
                  class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
                >?</span>
              </li>
            </ul>
          </div>
        </div>
        <div
          v-if="etape.amodiataires.length"
          class="tablet-blobs"
        >
          <div class="tablet-blob-1-4">
            <h6>
              Amodiataire{{ etape.amodiataires.length > 1 ? 's' : '' }}
            </h6>
          </div>
          <div class="tablet-blob-3-4">
            <ul class="list-prefix">
              <li
                v-for="t in etape.amodiataires"
                :key="t.id"
              >
                {{ etablissementNameFind(t.etablissements, etape.date) || t.nom }}
                <span
                  v-if="etape.incertitudes && etape.incertitudes.amodiataires"
                  class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
                >?</span>
              </li>
            </ul>
          </div>
        </div>
        <div
          v-if="etape.engagement"
          class="tablet-blobs"
        >
          <div class="tablet-blob-1-4">
            <h6>
              Engagement financier
            </h6>
          </div>
          <div class="tablet-blob-3-4">
            <p>
              {{ numberFormat(etape.engagement) }}
              <span v-if="etape.engagementDevise"> {{ etape.engagementDevise.id }}</span>
              <span
                v-if="etape.incertitudes && etape.incertitudes.engagement"
                class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
              >?</span>
            </p>
          </div>
        </div>
        <div
          v-if="etape.volume"
          class="tablet-blobs"
        >
          <div class="tablet-blob-1-4">
            <h6>
              Volume
            </h6>
          </div>
          <div class="tablet-blob-3-4">
            <p>
              {{ numberFormat(etape.volume) }}
              <span v-if="etape.volumeUnite"> {{ etape.volumeUnite.symbole }}</span>
              <span
                v-if="etape.incertitudes && etape.incertitudes.volume"
                class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
              >?</span>
            </p>
          </div>
        </div>
        <div
          v-if="etape.substances.length"
          class="tablet-blobs"
        >
          <div class="tablet-blob-1-4">
            <h6>
              Substance{{ etape.substances.length > 1 ? 's' : '' }}
            </h6>
          </div>
          <div class="tablet-blob-3-4">
            <PillList :elements="etape.substances.map(s => s.nom)" />
            <span
              v-if="etape.incertitudes && etape.incertitudes.substances"
              class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
            >?</span>
          </div>
        </div>

        <div v-if="incertitudesLength">
          <p class="h5">
            <span
              class="bg-info py-xxs px-xs rnd-xs color-bg bold"
            >?</span>&nbsp;: Donnée incertaine
          </p>
        </div>
      </div>

      <div
        v-if="etape.editable"
        class="px-m pt-m"
      >
        <DocumentButtonAdd
          :etape-id="etape.id"
          :demarche-type-nom="demarcheType.nom"
          :etape-type-nom="etape.type.nom"
          :titre-nom="titreNom"
        />
      </div>
    </template>

    <Documents
      v-if="etape.documents.length"
      :etape-id="etape.id"
      :documents="etape.documents"
      :demarche-type-nom="demarcheType.nom"
      :etape-type-nom="etape.type.nom"
      :titre-nom="titreNom"
      class="px-m"
    />
  </Accordion>
</template>

<script>
import Dot from '../ui/dot.vue'
import Accordion from '../ui/accordion.vue'
import PillList from '../ui/pill-list.vue'
import Documents from './documents.vue'
import EditPopup from './etape/edit.vue'
import RemovePopup from './etape/remove.vue'
import DocumentButtonAdd from './document/button-add.vue'

import { etapeEditFormat } from './etape'

export default {
  name: 'CaminoTitreEtape',

  components: {
    Dot,
    Accordion,
    Documents,
    PillList,
    DocumentButtonAdd
  },

  props: {
    etape: { type: Object, default: () => {} },
    demarcheType: { type: Object, default: () => {} },
    demarcheId: { type: String, default: '' },
    etapesTypeIds: { type: Array, default: () => [] }
  },

  computed: {
    titre() {
      return this.$store.state.titre.current
    },

    etapeType() {
      return (
        this.demarcheType.etapesTypes.find(et => et.id === this.etape.typeId) ||
        {}
      )
    },

    incertitudesLength() {
      return (
        this.etape.incertitudes &&
        Object.keys(this.etape.incertitudes).reduce((res, i) => {
          if (this.etape.incertitudes[i] && i !== '__typename') {
            res++
          }
          return res
        }, 0)
      )
    },

    hasProps() {
      return (
        !!this.etape.duree ||
        !!this.etape.dateDebut ||
        !!this.etape.dateFin ||
        !!this.etape.points.length ||
        !!this.etape.substances.length ||
        !!this.etape.titulaires.length ||
        !!this.etape.amodiataires.length
      )
    },

    duree() {
      return {
        ans: this.etape.duree && Math.floor(this.etape.duree / 12),
        mois: this.etape.duree && Math.floor(this.etape.duree % 12)
      }
    },

    titreNom() {
      return this.$store.state.titre.current.nom
    }
  },

  watch: {
    'etape.documents.length': function(lengthNew) {
      if (length > 0) {
        this.$refs.accordion.opened = true
      }
    }
  },

  methods: {
    editPopupOpen() {
      const etape = etapeEditFormat(this.etape, this.demarcheId)

      this.$store.commit('popupOpen', {
        component: EditPopup,
        props: {
          etape,
          domaineId: this.$store.state.titre.current.domaine.id,
          demarcheType: this.demarcheType,
          titreNom: this.titreNom,
          etapesTypeIds: this.etapesTypeIds
        }
      })
    },

    removePopupOpen() {
      this.$store.commit('popupOpen', {
        component: RemovePopup,
        props: {
          etapeTypeNom: this.etape.type.nom,
          etapeId: this.etape.id,
          demarcheTypeNom: this.demarcheType.nom,
          titreNom: this.titreNom,
          titreType: this.$store.state.titre.current.type.nom
        }
      })
    },

    etablissementNameFind(etablissements, date) {
      if (!etablissements || !etablissements.length) {
        return null
      }

      const etablissement = etablissements.find(
        e =>
          (e.dateDebut < date && (!e.dateFin || e.dateFin > date)) ||
          !e.dateDebut
      )

      return etablissement && etablissement.nom
    }
  }
}
</script>
