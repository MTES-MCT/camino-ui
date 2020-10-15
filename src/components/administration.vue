<template>
  <Loader v-if="!loaded" />
  <div v-else>
    <h6>Administration</h6>
    <h1>
      {{ nom }}
    </h1>
    <Accordion class="mb-xxl" :sub="true">
      <template slot="title">
        <span class="cap-first"> Profil </span>
      </template>

      <template v-if="administration.modification" slot="buttons">
        <DocumentAddButton
          :context="documentContext"
          :document="documentNew"
          :parent-id="administration.id"
          :title="nom"
          repertoire="entreprises"
          class="btn py-s px-m mr-line"
        />
        <button class="btn py-s px-m" @click="editPopupOpen">
          <i class="icon-24 icon-pencil" />
        </button>
      </template>

      <template slot="sub">
        <div class="px-m pt-m border-b-s">
          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6 class="mt-xs">Adresse</h6>
            </div>
            <div class="tablet-blob-3-4">
              <p>
                {{ administration.adresse }}
                <br />{{ administration.codePostal }}
                {{ administration.commune }}
              </p>
            </div>
          </div>

          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6 class="mt-xs">Téléphone</h6>
            </div>
            <div class="tablet-blob-3-4">
              <p class="word-break">
                <span v-if="administration.telephone">{{
                  administration.telephone
                }}</span>
                <span v-else>–</span>
              </p>
            </div>
          </div>

          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6 class="mt-xs">Email</h6>
            </div>
            <div class="tablet-blob-3-4">
              <p class="word-break">
                <a
                  v-if="administration.email"
                  :href="`mailto:${administration.email}`"
                  class="btn h6 bold py-xs px-s rnd"
                >
                  {{ administration.email }}
                </a>
                <span v-else>–</span>
              </p>
            </div>
          </div>

          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6 class="mt-xs">Site</h6>
            </div>
            <div class="tablet-blob-3-4">
              <p class="word-break">
                <a
                  v-if="administration.url"
                  :href="administration.url"
                  class="btn h6 bold py-xs px-s rnd"
                >
                  {{ administration.url }}
                </a>
                <span v-else>–</span>
              </p>
            </div>
          </div>
        </div>

      </template>
    </Accordion>

    <div v-if="utilisateurs && utilisateurs.length" class="mb-xxl">
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

    <div v-if="titresAdministrationLocale && titresAdministrationLocale.length" class="mb-xxl">
      <div class="line-neutral mb-xxl" />
      <h3>Titres miniers et autorisations (administration locale)</h3>
      <div class="line" />
      <TitresTable :titres="titresAdministrationLocale" />
    </div>

    <div v-if="titresAdministrationGestionnaire && titresAdministrationGestionnaire.length" class="mb-xxl">
      <div class="line my-xxl" />
      <h3>Titres miniers et autorisations (administration gestionnaire)</h3>
      <div class="line" />
      <TitresTable :titres="titresAdministrationGestionnaire" />
    </div>
  </div>
</template>

<script>
import Accordion from './_ui/accordion.vue'
import Loader from './_ui/loader.vue'
import Table from './_ui/table.vue'
import TitresTable from './titres/table.vue'
// import EntrepriseEditPopup from './administration/edit-popup.vue'
import DocumentAddButton from './document/button-add.vue'

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
    DocumentAddButton
  },

  data() {
    return {
      utilisateursColonnes
    }
  },

  computed: {
    administration() {
      return this.$store.state.administration.current
    },

    nom() {
      return this.administration && this.administration.nom ? this.administration.nom : '–'
    },

    utilisateurs() {
      return this.administration.utilisateurs
    },

    utilisateursLignes() {
      return utilisateursLignesBuild(this.utilisateurs)
    },

    titresAdministrationLocale() {
      return this.administration.titresAdministrationLocale
    },

    titresAdministrationGestionnaire() {
      return this.administration.titresAdministrationGestionnaire
    },

    user() {
      return this.$store.state.user.current
    },

    loaded() {
      return !!this.administration
    },
  },

  watch: {
    $route: 'get',

    user: 'get'
  },

  created() {
    this.get()
  },

  beforeDestroy() {
    this.$store.commit('administration/reset')
  },

  methods: {
    async get() {
      await this.$store.dispatch('administration/get', this.$route.params.id)
    },

    editPopupOpen() {
      // const administration = {
      //   id: this.administration.id,
      //   telephone: this.administration.telephone,
      //   url: this.administration.url,
      //   email: this.administration.email
      // }

      // this.$store.commit('popupOpen', {
      //   component: AdministrationEditPopup,
      //   props: { administration }
      // })
    }
  }
}
</script>
