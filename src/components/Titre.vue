<template>
  <div>
    <loader v-if="!loaded" />
    <card v-else>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-2">
          <h1 class="mt-xs">{{ titre['nom'] }}</h1>
          <h4 class="mb"><pill
            :color="`bg-title-domain-${titre.domaine.id}`"
            class="mono mr-s mt--s">{{ titre.domaine.id }}</pill>
            <span class="cap-first">{{ titre.type.nom }}</span>
          </h4>
          <div v-if="titre.references">
            <h6>{{ titre.references.length > 1 ? 'Références' : 'Référence' }}</h6>
            <ul class="list-prefix">
              <li 
                v-for="reference in titre['références']"
                :key="reference['valeur']">
                <span
                  v-if="reference['type']"
                  class="h5 word-break color-neutral fixed-width">{{ reference['type'] }} </span>{{ reference['valeur'] }}
              </li>
            </ul>
          </div>
          <div
            v-if="titre.substancesPrincipales && titre.substancesPrincipales.length > 0">
            <h6>Substances principales</h6>
            <pill-list :elements="titre.substancesPrincipales.map(s=>s.nom)" />
          </div>
          <div 
            v-if="titre.substancesConnexes && titre.substancesConnexes.length > 0" >
            <h6>Substances connexes</h6>
            <pill-list :elements="titre.substancesConnexes" />
          </div>
        </div>
        <div class="tablet-blob-1-2">
          <div class="blobs">
            <div class="blob-1-2">
              <h6>Statut</h6>
              <h4 class="cap"><dot :color="`bg-${titre.statut.couleur}`" />{{ titre.statut.nom }}</h4>
            </div>
          </div>
          <div v-if="titre.titulaires">
            <h6>{{ titre.titulaires.length > 1 ? 'Titulaires' : 'Titulaire' }}</h6>
            <ul class="list-prefix">
              <li 
                v-for="titulaire in titre.titulaires"
                :key="titulaire.id">
                {{ titulaire['nom'] }}
              </li>
            </ul>
          </div>
          <div>
            <table class="table-xxs">
              <tr>
                <th>Phase</th><th>Date</th><th>Durée</th>
              </tr>
              <tr
                v-for="phase in titre.phases"
                :key="phase.date">
                <td class="cap-first">{{ phase['nom'] }}</td>
                <td>{{ phase['date'] | dateFormat }}</td>
                <td>{{ `${phase['duree']} ans` }}</td>
              </tr>
            </table>
          </div>
          <div v-if="titre['liens']">
            <h6>Liens</h6>
            <ul class="list-sans">
              <li 
                v-for="link in titre['liens']"
                :key="link.id"
                class="mb-xs">
                <router-link
                  :to="{ name: 'titre', params: { id: link.id }}"
                  class="btn h6 bold py-xs px-s rnd">{{ link['type'] }} : {{ link['nom'] }}</router-link></li>
            </ul>
          </div>
        </div>
      </div>
      <titre-map
        v-if="perimetreCurrent.geojsonMultiPolygon"
        :geojson="perimetreCurrent.geojsonMultiPolygon"
        class="mb" />

      <div class="tablet-blobs">
        <div class="tablet-blob-1-4">
          <h6>Surface</h6>
          <p>{{ perimetreCurrent.surface }} Km²</p>
        </div>
        <div class="tablet-blob-3-4">
          <h6>Communes</h6>
          <div
            v-for="(departements, region) in perimetreCurrent.communes"
            :key="region">
            <div
              v-for="(communes, departement) in departements"
              :key="departement">
              <h5 class="mb-xs">{{ region }} / {{ departement }}</h5>
              <pill-list :elements="communes" />
            </div>
          </div>
        </div>
      </div>

      <div class="tablet-blobs">
        <div class="tablet-blob-1-2">
          <div v-if="titre.titulaires">
            <h6>{{ titre.titulaires.length > 1 ? 'Titulaires' : 'Titulaire' }}</h6>
            <company
              v-for="holder in titre.titulaires"
              :key="holder['id']"
              :company="holder"
              class="mb" />
          </div>
          <div v-if="titre.amodiataires">
            <h6>{{ titre.amodiataires.length > 1 ? 'Amodiataires' : 'Amodiataire' }}</h6>
            <company
              v-for="holder in titre.amodiataires"
              :key="holder['id']"
              :company="holder"
              class="mb" />
          </div>
        </div>

        <div class="tablet-blob-1-2">
          <h6>Administrations</h6>
          <company
            v-for="referent in titre['administrations']"
            :key="referent['id']"
            :company="referent"
            class="mb" />
        </div>
      </div>

      <div
        v-if="titre['démarches en cours']"
        class="mb-xxl">
        <h4 class="mt-s">Démarches en cours</h4>
        <hr class="mb-0">
        <div class="overflow-scroll-x">
          <table>
            <tr>
              <th>Type</th>
              <th>Nom</th>
              <th>Statut</th>
            </tr>
            <tr
              v-for="d in titre['démarches en cours']"
              :key="d.id"
              class="h5">
              <td><pill class="mt--s mb--s">{{ d.type }}</pill></td>
              <td>{{ d.nom }}</td>
              <td>
                <dot :color="d.statut.couleur" />
                {{ d.statut.nom }}
              </td>
            </tr>
          </table>
        </div>
      </div>

      <titre-chronologie
        v-if="titre['démarches']"
        :event-types="titre['démarches']" />

      <titre-outils />
    </card>
  </div>
</template>

<script>
import Card from '@/components/ui/Card.vue'
import Pill from '@/components/ui/Pill.vue'
import PillList from '@/components/ui/PillList.vue'
import Loader from '@/components/ui/Loader.vue'
import Dot from '@/components/ui/Dot.vue'
import TitreMap from '@/components/camino/TitreMap.vue'
import Company from '@/components/camino/Company.vue'
import TitreOutils from '@/components/camino/TitreOutils.vue'
import TitreChronologie from '@/components/camino/TitreChronologie.vue'

export default {
  components: {
    Pill,
    PillList,
    Loader,
    Dot,
    Company,
    Card,
    TitreMap,
    TitreOutils,
    TitreChronologie
  },

  data () {
    return {
      perimetreCurrentIndex: 0
    }
  },

  computed: {
    titre () {
      return this.$store.state.titre.current
    },
    perimetres () {
      return this.titre && this.titre.perimetres
    },
    perimetreCurrent () {
      return this.perimetres && this.perimetres[this.perimetreCurrentIndex]
    },
    loaded () {
      return !!this.titre
    }
  },

  watch: {
    '$route': 'get'
  },

  created () {
    this.get()
  },

  beforeDestroy () {
    this.$store.commit('titre/reset')
  },

  methods: {
    get () {
      this.$store.dispatch('titre/get', { id: this.$route.params.id })
    }
  }
}
</script>
