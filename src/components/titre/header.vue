<template>
  <div>
    <div class="tablet-blobs">
      <div class="tablet-blob-3-4">
        <h1 class="mt-xs mb-s">
          {{ titre.nom }}
        </h1>
      </div>
      <div class="tablet-blob-1-4 flex">
        <div
          v-if="titre.modification || titre.suppression"
          class="tablet-flex-right mb-s"
        >
          <button
            v-if="titre.modification"
            class="btn rnd-l-xs py-s px-m mr-line"
            :class="{'rnd-r-xs': !titre.suppression }"
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

    <div class="line" />

    <div class="desktop-blobs">
      <div class="desktop-blob-1-2">
        <div class="rnd-b-s bg-alt pt px overflow-auto">
          <h4 class="mb">
            <Pill
              :color="`bg-titre-domaine-${titre.domaine.id}`"
              class="mono mr-s mt--m"
            >
              {{ titre.domaine.id }}
            </Pill>
            <span class="cap-first">
              {{ titre.type.type.nom }}
            </span>
          </h4>


          <div class="mb">
            <Statut
              :color="titre.statut.couleur"
              :nom="titre.statut.nom"
            />
          </div>


          <div
            v-if="phases && phases.length"
            class="mb"
          >
            <table class="table-xxs full-x mb-0">
              <tr>
                <th class="max-width-1" />
                <th>Phase</th>
                <th>Début</th>
                <th>Fin</th>
              </tr>
              <tr
                v-for="demarche in phases"
                :key="demarche.id"
              >
                <td class="max-width-1">
                  <Dot :color="`bg-${demarche.phase.statut.couleur}`" />
                </td>
                <td>
                  <span class="cap-first bold h5">
                    {{ demarche.type.nom }}
                  </span>
                </td>
                <td><span class="h5">{{ demarche.phase.dateDebut | dateFormat }}</span></td>
                <td><span class="h5">{{ demarche.phase.dateFin | dateFormat }}</span></td>
              </tr>
            </table>
          </div>

          <div
            v-if="titre.references && titre.references.length"
            class="mb"
          >
            <ul class="list-prefix">
              <li
                v-for="reference in titre.references"
                :key="reference.nom"
              >
                <span
                  v-if="reference.type"
                  class="h5 word-break fixed-width bold"
                >
                  {{ reference.type.nom }}
                </span>
                {{ reference.nom }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="desktop-blob-1-2 mt">
        <div
          v-if="titre.substances && titre.substances.length > 0"
          class="mb"
        >
          <h6>Substances</h6>
          <PillList :elements="titre.substances.map(s => s.nom)" />
        </div>

        <div
          v-if="titre.titulaires.length"
          class="mb"
        >
          <h6>
            {{ titre.titulaires.length > 1 ? 'Titulaires' : 'Titulaire' }}
          </h6>
          <ul class="list-prefix">
            <li
              v-for="titulaire in titre.titulaires"
              :key="titulaire.id"
            >
              {{ titulaire.nom }}
            </li>
          </ul>
        </div>

        <div
          v-if="titre.amodiataires.length"
          class="mb"
        >
          <h6>
            {{ titre.amodiataires.length > 1 ? 'Amodiataires' : 'Amodiataire' }}
          </h6>
          <ul class="list-prefix">
            <li
              v-for="amodiataire in titre.amodiataires"
              :key="amodiataire.id"
            >
              {{ amodiataire.nom }}
            </li>
          </ul>
        </div>

        <div v-if="hasContenu">
          <Section
            v-for="s in titre.type.sections"
            :key="s.id"
            :entete="false"
            :section="s"
            :contenu="titre.contenu[s.id]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pill from '../_ui/pill.vue'
import PillList from '../_ui/pill-list.vue'
import Dot from '../_ui/dot.vue'
import EditPopup from './edit-popup.vue'
import RemovePopup from './remove-popup.vue'
import Section from '../_common/section.vue'
import Statut from '../_common/statut.vue'

export default {
  components: { Pill, Dot, PillList, Section, Statut },

  props: {
    titre: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    phases() {
      return this.titre.demarches.filter(d => d.phase)
    },

    hasContenu() {
      return (
        this.titre.contenu &&
        this.titre.type.sections &&
        this.titre.type.sections.some(s =>
          s.elements.some(
            e =>
              this.titre.contenu[s.id] &&
              this.titre.contenu[s.id][e.id] !== undefined
          )
        )
      )
    }
  },

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

      this.$store.commit('popupOpen', {
        component: EditPopup,
        props: {
          titre
        }
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
    }
  }
}
</script>
