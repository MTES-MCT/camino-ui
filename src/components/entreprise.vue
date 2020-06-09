<template>
  <Loader v-if="!loaded" />
  <div v-else>
    <h6>Entreprise</h6>
    <h1>
      {{ nom }}
    </h1>
    <Accordion
      class="mb-xxl"
      :sub="true"
    >
      <template slot="title">
        <span class="cap-first">
          Profil
        </span>
      </template>

      <template
        v-if="entreprise.modification"
        slot="buttons"
      >
        <DocumentAddButton
          :document="documentNew"
          :context="documentContext"
          repertoire="entreprises"
          :title="nom"
          class="btn py-s px-m mr-line"
        />
        <button
          class="btn py-s px-m"
          @click="editPopupOpen"
        >
          <i class="icon-24 icon-pencil" />
        </button>
      </template>

      <template slot="sub">
        <div class="px-m pt-m border-b-s">
          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6 class="mt-xs">
                Siren
              </h6>
            </div>
            <div class="tablet-blob-3-4">
              <p>{{ entreprise.legalSiren }}</p>
            </div>
          </div>

          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6 class="mt-xs">
                Forme juridique
              </h6>
            </div>
            <div class="tablet-blob-3-4">
              <p>{{ entreprise.legalForme }}</p>
            </div>
          </div>

          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6 class="mt-xs">
                Établissement{{ entreprise.etablissements.length > 1 ? 's' : '' }}
              </h6>
            </div>
            <div class="tablet-blob-3-4">
              <ul class="list-sans">
                <li
                  v-for="e in entreprise.etablissements"
                  :key="e.id"
                >
                  <h5 class="inline-block">
                    {{ e.dateDebut | dateFormat }}
                  </h5>
                  : {{ e.nom }}
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
            <div class="tablet-blob-3-4">
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
                <span v-if="entreprise.telephone">{{
                  entreprise.telephone
                }}</span>
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

        <Documents
          v-if="entreprise.documents.length"
          :element-id="entreprise.id"
          :documents="entreprise.documents"
          :context="{ id: entreprise.id, name: 'entreprise' }"
          repertoire="entreprises"
          :title="nom"
          class="px-m"
          :bouton-suppression="entreprise.modification"
          :bouton-modification="entreprise.modification"
        />
      </template>
    </Accordion>

    <div
      v-if="utilisateurs && utilisateurs.length"
      class="mb-xxl"
    >
      <div class="line-neutral mb-xxl" />
      <h3>Utilisateurs</h3>
      <div class="line" />
      <Table
        class="width-max"
        :columns="utilisateursColonnes"
        :rows="utilisateursLignes"
        :utilisateurs="utilisateurs"
      />
    </div>

    <div
      v-if="titresTitulaire && titresTitulaire.length"
      class="mb-xxl"
    >
      <div class="line-neutral mb-xxl" />
      <h3>Titres miniers et autorisations</h3>
      <div class="line" />
      <TitresTable :titres="titresTitulaire" />
    </div>

    <div
      v-if="titresAmodiataire && titresAmodiataire.length"
      class="mb-xxl"
    >
      <div class="line my-xxl" />
      <h3>Titres miniers et autorisations (amodiataire)</h3>
      <div class="line" />
      <TitresTable :titres="titresAmodiataire" />
    </div>
  </div>
</template>

<script>
import Accordion from './_ui/accordion.vue'
import Loader from './_ui/loader.vue'
import Table from './_ui/table.vue'
import TitresTable from './titres/table.vue'
import EntrepriseEditPopup from './entreprise/edit-popup.vue'
import DocumentAddButton from './document/button-add.vue'
import Documents from './documents/list.vue'

import {
  utilisateursColonnes,
  utilisateursLignesBuild
} from './utilisateurs/table'

export default {
  components: {
    Accordion,
    Loader,
    Table,
    TitresTable,
    DocumentAddButton,
    Documents
  },

  data() {
    return {
      utilisateursColonnes
    }
  },

  computed: {
    entreprise() {
      return this.$store.state.entreprise.current
    },

    nom() {
      return this.entreprise && this.entreprise.nom ? this.entreprise.nom : '–'
    },

    utilisateurs() {
      return this.entreprise.utilisateurs
    },

    utilisateursLignes() {
      return utilisateursLignesBuild(this.utilisateurs)
    },

    titresTitulaire() {
      return this.entreprise.titresTitulaire
    },

    titresAmodiataire() {
      return this.entreprise.titresAmodiataire
    },

    user() {
      return this.$store.state.user.current
    },

    loaded() {
      return !!this.entreprise
    },

    documentNew() {
      return {
        entrepriseId: this.entreprise.id,
        typeId: '',
        fichier: null,
        fichierNouveau: null,
        fichierTypeId: null
      }
    },

    documentContext() {
      return {
        name: 'entreprise',
        id: this.entreprise.id
      }
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
    async get() {
      await this.$store.dispatch('entreprise/get', this.$route.params.id)
    },

    editPopupOpen() {
      const entreprise = {
        id: this.entreprise.id,
        telephone: this.entreprise.telephone,
        url: this.entreprise.url,
        email: this.entreprise.email
      }

      this.$store.commit('popupOpen', {
        component: EntrepriseEditPopup,
        props: {
          entreprise
        }
      })
    }
  }
}
</script>
