<template>
  <Card v-if="!loaded">
    <Loader />
  </Card>
  <Card v-else>
    <h6>Entreprise</h6>
    <h1>
      {{
        entreprise
          ? `${entreprise.nom || "–"}`
          : "–"
      }}
    </h1>
    <Accordion
      class="mb"
      :sub="true"
    >
      <template slot="title">
        <span class="cap-first">
          Profil
        </span>
      </template>

      <template slot="sub">
        <div class="px-m pt-m">
          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6 class="mt-xs">
                Siren
              </h6>
            </div>
            <div
              class="tablet-blob-3-4"
            >
              <p>{{ entreprise.legalSiren }}</p>
            </div>
          </div>

          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6 class="mt-xs">
                Forme juridique
              </h6>
            </div>
            <div
              class="tablet-blob-3-4"
            >
              <p>{{ entreprise.legalForme }}</p>
            </div>
          </div>

          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6 class="mt-xs">
                Établissement{{ entreprise.etablissements.length > 1 ? 's' : '' }}
              </h6>
            </div>
            <div
              class="tablet-blob-3-4"
            >
              <ul class="list-sans">
                <li
                  v-for="e in entreprise.etablissements"
                  :key="e.id"
                >
                  <h5 class="inline-block">
                    {{ e.dateDebut | dateFormat }}
                  </h5> : {{ e.nom }}
                </li>
              </ul>
            </div>
          </div>

          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6 class="mt-xs">
                Adresse
              </h6>
            </div>
            <div
              class="tablet-blob-3-4"
            >
              <p>
                {{ entreprise.adresse }}
                <br>{{ entreprise.codePostal }}
                {{ entreprise.commune }}
              </p>
            </div>
          </div>

          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6 class="mt-xs">
                Téléphone
              </h6>
            </div>
            <div class="tablet-blob-3-4">
              <p class="word-break">
                <span v-if="entreprise.telephone">{{ entreprise.telephone }}</span>
                <span v-else>–</span>
              </p>
            </div>
          </div>

          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6 class="mt-xs">
                Email
              </h6>
            </div>
            <div class="tablet-blob-3-4">
              <p class="word-break">
                <a
                  v-if="entreprise.email"
                  :href="`mailto:${entreprise.email}`"
                  class="btn h6 bold py-xs px-s rnd"
                >
                  {{ entreprise.email }}
                </a>
                <span v-else>–</span>
              </p>
            </div>
          </div>

          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6 class="mt-xs">
                Site
              </h6>
            </div>
            <div class="tablet-blob-3-4">
              <p class="word-break">
                <a
                  v-if="entreprise.url"
                  :href="entreprise.url"
                  class="btn h6 bold py-xs px-s rnd"
                >
                  {{ entreprise.url }}
                </a>
                <span v-else>–</span>
              </p>
            </div>
          </div>
        </div>
      </template>
    </Accordion>

    <div
      v-if="utilisateurs && utilisateurs.length"
    >
      <div class="card-border mb" />
      <h3>Utilisateurs</h3>
      <UtilisateursTable
        :utilisateurs="utilisateurs"
      />
    </div>

    <div
      v-if="titresTitulaire && titresTitulaire.length"
    >
      <div class="card-border mb" />
      <h3>Titres miniers et autorisations</h3>
      <TitresTable
        :titres="titresTitulaire"
      />
    </div>
  </Card>
</template>

<script>
import Card from './ui/card.vue'
import Accordion from './ui/accordion.vue'
import Loader from './ui/loader.vue'
import UtilisateursTable from './utilisateurs/table.vue'
import TitresTable from './camino/titres-table.vue'

export default {
  components: {
    Accordion,
    Loader,
    Card,
    UtilisateursTable,
    TitresTable
  },

  computed: {
    entreprise() {
      return this.$store.state.entreprise.current
    },

    utilisateurs() {
      return this.entreprise.utilisateurs
    },

    titresTitulaire() {
      return this.entreprise.titresTitulaire
    },

    user() {
      return this.$store.state.user.current
    },

    loaded() {
      return !!this.entreprise
    }
  },

  watch: {
    $route: 'get',

    user: 'get'
  },

  created() {
    this.get()
  },

  beforeDestroy() {
    this.$store.commit('entreprise/reset')
  },

  methods: {
    get() {
      this.$store.dispatch('entreprise/get', this.$route.params.id)
    }
  }
}
</script>
