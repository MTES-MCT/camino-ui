<template>
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
          <Statut :color="titre.statut.couleur" :nom="titre.statut.nom" />
        </div>

        <div
          v-if="phases && phases.length"
          class="mb bg-bg mx--m px-m pt-xs pb-s rnd-xs"
        >
          <table class="table-xxs full-x mb-0">
            <tr>
              <th class="max-width-1" />
              <th>Phase</th>
              <th>Début</th>
              <th>Fin</th>
            </tr>
            <tr v-for="demarche in phases" :key="demarche.id">
              <td class="max-width-1">
                <Dot :color="`bg-${demarche.phase.statut.couleur}`" />
              </td>
              <td>
                <span class="cap-first bold h5">
                  {{ demarche.type.nom }}
                </span>
              </td>
              <td>
                <span class="h5">{{
                  demarche.phase.dateDebut | dateFormat
                }}</span>
              </td>
              <td>
                <span class="h5">{{
                  demarche.phase.dateFin | dateFormat
                }}</span>
              </td>
            </tr>
          </table>
        </div>

        <div v-if="titre.references && titre.references.length" class="mb">
          <ul class="list-prefix h5">
            <li v-for="reference in titre.references" :key="reference.nom">
              <span v-if="reference.type" class="word-break fixed-width bold">
                {{ reference.type.nom }}
              </span>
              {{ reference.nom }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="desktop-blob-1-2 mt">
      <div v-if="titre.substances && titre.substances.length > 0" class="mb">
        <h6>Substances</h6>
        <TagList :elements="titre.substances.map(s => s.nom)" />
      </div>

      <div v-if="titre.titulaires.length" class="mb">
        <h6>
          {{ titre.titulaires.length > 1 ? 'Titulaires' : 'Titulaire' }}
        </h6>
        <ul class="list-prefix">
          <li v-for="titulaire in titre.titulaires" :key="titulaire.id">
            {{ titulaire.nom }}
          </li>
        </ul>
      </div>

      <div v-if="titre.amodiataires.length" class="mb">
        <h6>
          {{ titre.amodiataires.length > 1 ? 'Amodiataires' : 'Amodiataire' }}
        </h6>
        <ul class="list-prefix">
          <li v-for="amodiataire in titre.amodiataires" :key="amodiataire.id">
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
</template>

<script>
import Pill from '../_ui/pill.vue'
import TagList from '../_ui/tag-list.vue'
import Dot from '../_ui/dot.vue'
import Section from '../_common/section.vue'
import Statut from '../_common/statut.vue'

export default {
  components: { Pill, Dot, TagList, Section, Statut },

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
  }
}
</script>
