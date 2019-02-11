<template>
  <div>
    <Loader v-if="!loaded" />
    <Card v-else>
      <div class="desktop-blobs">
        <div class="desktop-blob-1-2">
          <h1 class="mt-xs">
            {{ titre["nom"] }}
          </h1>
          <h4 class="mb">
            <Pill
              :color="`bg-title-domaine-${titre.domaine.id}`"
              class="mono mr-s mt--s"
            >
              {{ titre.domaine.id }}
            </Pill>
            <span class="cap-first">
              {{ titre.type.nom }}
            </span>
          </h4>
          <div v-if="titre.references">
            <h6>
              {{ titre.references.length > 1 ? "Références" : "Référence" }}
            </h6>
            <ul class="list-prefix">
              <li
                v-for="reference in titre.references"
                :key="reference.valeur"
              >
                <span
                  v-if="reference.type"
                  class="h5 word-break color-neutral fixed-width"
                >
                  {{ reference.type }}
                </span>
                {{ reference.valeur }}
              </li>
            </ul>
          </div>
        </div>
        <div class="desktop-blob-1-2">
          <h6>Statut</h6>
          <h4>
            <Dot :color="`bg-${titre.statut.couleur}`" />
            <span class="cap-first">
              {{ titre.statut.nom }}
            </span>
          </h4>

          <div>
            <table class="table-xxs">
              <tr>
                <th />
                <th>Phase</th>
                <th>Début</th>
                <th>Fin</th>
              </tr>
              <tr
                v-for="demarche in titre.demarches.filter(d => d.phase)"
                :key="demarche.id"
              >
                <td><Dot :color="`bg-${demarche.phase.statut.couleur}`" /></td>
                <td>
                  <span class="cap-first">
                    {{ demarche.type.nom }}
                  </span>
                </td>
                <td>{{ demarche.phase.dateDebut | dateFormat }}</td>
                <td>{{ demarche.phase.dateFin | dateFormat }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="desktop-blobs">
        <div class="desktop-blob-1-2">
          <div v-if="titre.substances && titre.substances.length > 0">
            <h6>Substances</h6>
            <PillList :elements="titre.substances.map(s => s.nom)" />
          </div>
        </div>
        <div class="desktop-blob-1-2">
          <div v-if="titre.titulaires.length">
            <h6>
              {{ titre.titulaires.length > 1 ? "Titulaires" : "Titulaire" }}
            </h6>
            <ul class="list-prefix">
              <li
                v-for="titulaire in titre.titulaires"
                :key="titulaire.id"
              >
                {{ titulaire["nom"] }}
              </li>
            </ul>
          </div>

          <div v-if="titre.amodiataires.length">
            <h6>
              {{ titre.amodiataires.length > 1 ? "Amodiataires" : "Amodiataire" }}
            </h6>
            <ul class="list-prefix">
              <li
                v-for="amodiataire in titre.amodiataires"
                :key="amodiataire.id"
              >
                {{ amodiataire["nom"] }}
              </li>
            </ul>
          </div>

          <div v-if="titre['liens']">
            <h6>Liens</h6>
            <ul class="list-sans">
              <li
                v-for="link in titre['liens']"
                :key="link.id"
                class="mb-xs"
              >
                <RouterLink
                  :to="{ name: 'titre', params: { id: link.id } }"
                  class="btn h6 bold py-xs px-s rnd"
                >
                  {{ link["type"] }} : {{ link["nom"] }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <TitreMap
        v-if="titre.geojsonMultiPolygon"
        :geojson="titre.geojsonMultiPolygon"
        class="mb"
      />

      <div class="tablet-blobs">
        <div class="tablet-blob-1-4">
          <div v-if="titre.surface">
            <h6>Surface</h6>
            <p>{{ titre.surface }} km² environ</p>
          </div>
          <div v-if="titre.volume">
            <h6>Volume</h6>
            <p>{{ titre.volume }} {{ titre.volumeUnite }}</p>
          </div>
        </div>
        <div
          v-if="titre.pays && titre.pays.length"
          class="tablet-blob-3-4"
        >
          <h6>Territoires</h6>
          <div
            v-for="region in titre.pays[0].regions"
            :key="region.id"
          >
            <div
              v-for="departement in region.departements"
              :key="departement.id"
            >
              <h5 class="mb-s">
                {{ titre.pays[0].nom === 'République Française' ? region.nom + ' / ' + departement.nom : region.nom }}
              </h5>
              <PillList :elements="departement.communes.map(c => c.nom)" />
            </div>
          </div>
        </div>
      </div>

      <div class="tablet-blobs hide">
        <div class="tablet-blob-1-2">
          <div v-if="titre.titulaires">
            <h6>
              {{ titre.titulaires.length > 1 ? "Titulaires" : "Titulaire" }}
            </h6>
            <Company
              v-for="holder in titre.titulaires"
              :key="holder['id']"
              :company="holder"
              class="mb"
            />
          </div>
          <div v-if="titre.amodiataires">
            <h6>
              {{
                titre.amodiataires.length > 1 ? "Amodiataires" : "Amodiataire"
              }}
            </h6>
            <Company
              v-for="holder in titre.amodiataires"
              :key="holder['id']"
              :company="holder"
              class="mb"
            />
          </div>
        </div>

        <div class="tablet-blob-1-2">
          <h6>Administrations</h6>
          <Company
            v-for="referent in titre['administrations']"
            :key="referent['id']"
            :company="referent"
            class="mb"
          />
        </div>
      </div>

      <div
        v-if="titre['démarches en cours']"
        class="mb-xxl"
      >
        <h4 class="mt-s">
          Démarches en cours
        </h4>
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
              class="h5"
            >
              <td>
                <Pill class="mt--s mb--s">
                  {{ d.type }}
                </Pill>
              </td>
              <td>{{ d.nom }}</td>
              <td>
                <Dot :color="d.statut.couleur" />
                {{ d.statut.nom }}
              </td>
            </tr>
          </table>
        </div>
      </div>
      <Demarches
        v-if="titre.demarches"
        :demarches="titre.demarches"
      />

      <Outils />
    </Card>
  </div>
</template>

<script>
import Card from './ui/card.vue'
import Pill from './ui/pill.vue'
import PillList from './ui/pill-list.vue'
import Loader from './ui/loader.vue'
import Dot from './ui/dot.vue'
import TitreMap from './titre/map.vue'
import Company from './titre/company.vue'
import Outils from './titre/outils.vue'
import Demarches from './titre/demarches.vue'

export default {
  components: {
    Pill,
    PillList,
    Loader,
    Dot,
    Company,
    Card,
    TitreMap,
    Outils,
    Demarches
  },

  computed: {
    titre() {
      return this.$store.state.titre.current
    },
    loaded() {
      return !!this.titre
    }
  },

  watch: {
    $route: 'get'
  },

  created() {
    this.get()
  },

  beforeDestroy() {
    this.$store.commit('titre/reset')
  },

  methods: {
    get() {
      this.$store.dispatch('titre/get', this.$route.params.id)
    }
  }
}
</script>
