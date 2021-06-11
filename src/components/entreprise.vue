<template>
  <Loader v-if="!loaded" />
  <div v-else>
    <h5>Entreprise</h5>
    <h1>
      {{ nom }}
    </h1>
    <Accordion class="mb-xxl" :slot-sub="true" :slot-buttons="true">
      <template #title>
        <span class="cap-first"> Profil </span>
      </template>

      <template v-if="entreprise.modification" #buttons>
        <DocumentAddButton
          :route="route"
          :document="documentNew"
          :title="nom"
          repertoire="entreprises"
          class="btn py-s px-m mr-px"
        />
        <button class="btn py-s px-m" @click="editPopupOpen">
          <i class="icon-24 icon-pencil" />
        </button>
      </template>

      <template #sub>
        <div class="px-m pt-m border-b-s">
          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h5>Siren</h5>
            </div>
            <div class="tablet-blob-3-4">
              <p>{{ entreprise.legalSiren }}</p>
            </div>
          </div>

          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h5>Forme juridique</h5>
            </div>
            <div class="tablet-blob-3-4">
              <p>{{ entreprise.legalForme }}</p>
            </div>
          </div>

          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h5>
                Établissement{{
                  entreprise.etablissements.length > 1 ? 's' : ''
                }}
              </h5>
            </div>
            <div class="tablet-blob-3-4">
              <ul class="list-sans">
                <li v-for="e in entreprise.etablissements" :key="e.id">
                  <h6 class="inline-block">
                    {{ dateFormat(e.dateDebut) }}
                  </h6>
                  : {{ e.nom }}
                </li>
              </ul>
            </div>
          </div>

          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h5>Adresse</h5>
            </div>
            <div class="tablet-blob-3-4">
              <p>
                {{ entreprise.adresse }}
                <br />{{ entreprise.codePostal }}
                {{ entreprise.commune }}
              </p>
            </div>
          </div>

          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h5>Téléphone</h5>
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
              <h5>Email</h5>
            </div>
            <div class="tablet-blob-3-4">
              <p class="word-break">
                <a
                  v-if="entreprise.email"
                  :href="`mailto:${entreprise.email}`"
                  class="btn small bold py-xs px-s rnd"
                >
                  {{ entreprise.email }}
                </a>
                <span v-else>–</span>
              </p>
            </div>
          </div>

          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h5>Site</h5>
            </div>
            <div class="tablet-blob-3-4">
              <p class="word-break">
                <a
                  v-if="entreprise.url"
                  :href="entreprise.url"
                  class="btn small bold py-xs px-s rnd"
                >
                  {{ entreprise.url }}
                </a>
                <span v-else>–</span>
              </p>
            </div>
          </div>

          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h5>Archivée</h5>
            </div>
            <div class="tablet-blob-3-4">
              <p>{{ entreprise.archive ? 'Oui' : 'Non' }}</p>
            </div>
          </div>
        </div>

        <div v-if="entreprise.documents.length">
          <h4 class="px-m pt mb-0">Documents</h4>
          <Documents
            :bouton-modification="entreprise.modification"
            :bouton-suppression="
              entreprise.modification &&
              permissionsCheck(user, ['super', 'admin', 'editeur'])
            "
            :route="route"
            :documents="entreprise.documents"
            :etiquette="entreprise.modification"
            :parent-id="entreprise.id"
            :title="nom"
            repertoire="entreprises"
            class="px-m"
          />
        </div>
      </template>
    </Accordion>

    <div v-if="utilisateurs && utilisateurs.length" class="mb-xxl">
      <div class="line-neutral width-full mb-xxl" />
      <h3>Utilisateurs</h3>
      <div class="line width-full" />
      <Table
        class="width-full-p"
        :columns="utilisateursColonnes"
        :rows="utilisateursLignes"
        :utilisateurs="utilisateurs"
      />
    </div>

    <div v-if="titulaireTitres && titulaireTitres.length" class="mb-xxl">
      <div class="line-neutral width-full mb-xxl" />
      <h3>Titres miniers et autorisations</h3>
      <div class="line width-full" />
      <TitresTable :titres="titulaireTitres" />
    </div>

    <div v-if="amodiataireTitres && amodiataireTitres.length" class="mb-xxl">
      <div class="line width-full my-xxl" />
      <h3>Titres miniers et autorisations (amodiataire)</h3>
      <div class="line width-full" />
      <TitresTable :titres="amodiataireTitres" />
    </div>

    <div v-if="permissionsCheck(user, ['super'])" class="mb-xxl">
      <div class="line-neutral width-full mb-xxl" />
      <h2>Permissions</h2>

      <EntreprisePermission :entreprise="entreprise" />
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
import { dateFormat, permissionsCheck } from '../utils/index'
import EntreprisePermission from './entreprise/permissions.vue'

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
    Documents,
    EntreprisePermission
  },

  data() {
    return {
      utilisateursColonnes
    }
  },

  computed: {
    entreprise() {
      return this.$store.state.entreprise.element
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

    titulaireTitres() {
      return this.entreprise.titulaireTitres
    },

    amodiataireTitres() {
      return this.entreprise.amodiataireTitres
    },

    user() {
      return this.$store.state.user.element
    },

    loaded() {
      return !!this.entreprise
    },

    documentNew() {
      return {
        entrepriseId: this.entreprise.id,
        entreprisesLecture: false,
        publicLecture: false,
        fichier: null,
        fichierNouveau: null,
        fichierTypeId: null,
        typeId: ''
      }
    },

    route() {
      return {
        id: this.entreprise.id,
        name: 'entreprise'
      }
    }
  },

  watch: {
    '$route.params.id': function (id) {
      if (this.$route.name === 'entreprise' && id) {
        this.get()
      }
    },

    user: 'get'
  },

  async created() {
    await this.get()
  },

  beforeUnmount() {
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
        email: this.entreprise.email,
        archive: this.entreprise.archive
      }

      this.$store.commit('popupOpen', {
        component: EntrepriseEditPopup,
        props: {
          entreprise
        }
      })
    },

    dateFormat(date) {
      return dateFormat(date)
    },

    permissionsCheck(user, permissions) {
      return permissionsCheck(user, permissions)
    }
  }
}
</script>
