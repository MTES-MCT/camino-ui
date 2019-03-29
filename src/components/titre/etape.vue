<template>
  <Accordion
    class="mb"
    :sub="true"
  >
    <template slot="title">
      <Dot :color="`bg-${etape.statut.couleur}`" />
      <span class="cap-first">
        {{ etape.type.nom }}
      </span>
    </template>

    <template
      v-if="permissionsCheck(['super'])"
      slot="buttons"
    >
      <button
        class="btn-alt py-s px-m"
        @click="editPopupOpen"
      >
        <i class="icon-24 icon-24-pencil" />
      </button>
    </template>

    <template slot="sub">
      <div class="tablet-blobs">
        <div class="tablet-blob-1-4">
          <h6>Date</h6>
          <p>{{ etape.date | dateFormat }}</p>
        </div>
        <div
          v-if="etape.duree"
          class="tablet-blob-1-4"
        >
          <h6>Durée</h6>
          <p>{{ etape.duree }} ans</p>
        </div>
        <div
          v-if="etape.dateDebut"
          class="tablet-blob-1-4"
        >
          <h6>Date de début</h6>
          <p>{{ etape.dateDebut | dateFormat }}</p>
        </div>
        <div
          v-if="etape.dateFin"
          class="tablet-blob-1-4"
        >
          <h6>Date d'échéance</h6>
          <p>{{ etape.dateFin | dateFormat }}</p>
        </div>
        <div
          v-if="etape.geojsonMultiPolygon"
          class="tablet-blob-1-4"
        >
          <h6>Périmètre</h6>
          <p>–</p>
        </div>
        <div
          v-if="etape.titulaires.length"
          class="tablet-blob-1-4"
        >
          <h6>Titulaires</h6>
          <ul class="list-prefix">
            <li
              v-for="t in etape.titulaires"
              :key="t.id"
            >
              {{ etablissementNameFind(t.etablissements, etape.date) || t.nom }}
            </li>
          </ul>
        </div>
        <div
          v-if="etape.amodiataires.length"
          class="tablet-blob-1-4"
        >
          <h6>Amodiataires</h6>

          <ul class="list-prefix">
            <li
              v-for="t in etape.amodiataires"
              :key="t.id"
            >
              {{ etablissementNameFind(t.etablissements, etape.date) || t.nom }}
            </li>
          </ul>
        </div>
        <div
          v-if="etape.engagement"
          class="tablet-blob-1-4"
        >
          <h6>Engagement financier</h6>
          <p>{{ numberFormat(etape.engagement) }} {{ etape.engagementDevise.id }}</p>
        </div>
        <div
          v-if="etape.substances.length"
          class="tablet-blob-1-2 large-blob-1-4"
        >
          <h6>Substances</h6>
          <PillList :elements="etape.substances.map(s => s.nom)" />
        </div>

        <div
          v-if="etape.visas && etape.visas.length"
          class="tablet-blob-1 large-blob-1-2"
        >
          <h6>Visas</h6>
          <ul class="list-prefix h5">
            <li
              v-for="(visa, i) in etape.visas"
              :key="i"
            >
              {{ visa }}
            </li>
          </ul>
        </div>
      </div>
    </template>

    <Documents
      v-if="etape.documents.length"
      :documents="etape.documents"
      class="px-m"
    />
  </Accordion>
</template>

<script>
import Dot from '../ui/dot.vue'
import Accordion from '../ui/accordion.vue'
import PillList from '../ui/pill-list.vue'
import Documents from './documents.vue'
import EditPopup from './etape-edit-popup.vue'

export default {
  name: 'CaminoTitreEtape',

  components: {
    Dot,
    Accordion,
    Documents,
    PillList
  },

  props: {
    etape: {
      type: Object,
      default: () => {}
    },
    demarcheType: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    editPopupOpen() {
      const etapeCloneAndFormat = etape => {
        const etapeTmp = JSON.parse(JSON.stringify(etape))

        if (etapeTmp.date) {
          etapeTmp.date = this.dateFormat(etapeTmp.date)
        }

        if (etapeTmp.dateDebut) {
          etapeTmp.dateDebut = this.dateFormat(etapeTmp.dateDebut)
        }

        if (etapeTmp.dateFin) {
          etapeTmp.dateFin = this.dateFormat(etapeTmp.dateFin)
        }

        etapeTmp.visas = etapeTmp.visas
          ? etapeTmp.visas.map((texte, id) => ({
              id,
              texte
            }))
          : []

        console.log(etapeTmp.visas)

        if (etapeTmp.points) {
          etapeTmp.groupes = etapeTmp.points.reduce((groupes, point) => {
            groupes[point.groupe - 1] = groupes[point.groupe - 1] || []
            groupes[point.groupe - 1][point.contour - 1] =
              groupes[point.groupe - 1][point.contour - 1] || []
            groupes[point.groupe - 1][point.contour - 1][point.point - 1] = {
              id: point.id,
              nom: point.nom,
              groupe: point.groupe,
              contour: point.contour,
              point: point.point,
              coordonnees: point.coordonnees,
              description: point.description,
              references: point.references
            }

            return groupes
          }, [])
        }

        delete etapeTmp.points
        delete etapeTmp.geojsonPoints
        delete etapeTmp.geojsonMultiPolygon
        delete etapeTmp.documents

        return etapeTmp
      }

      this.$store.commit('popupOpen', {
        component: EditPopup,
        props: {
          etape: etapeCloneAndFormat(this.etape),
          domaineId: this.$store.state.titre.current.domaine.id,
          demarcheType: this.demarcheType,
          titreNom: this.$store.state.titre.current.nom
        }
      })
    },
    editPopupClose() {
      this.$store.commit('popupClose')
    },
    etablissementNameFind(etablissements, date) {
      const etablissement = etablissements.find(
        e =>
          (this.dateFormat(e.dateDebut) < this.dateFormat(date) &&
            (!e.dateFin ||
              this.dateFormat(e.dateFin) > this.dateFormat(date))) ||
          !e.dateDebut
      )

      return etablissement && etablissement.nom
    }
  }
}
</script>
