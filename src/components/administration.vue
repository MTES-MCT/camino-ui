<template>
  <Loader v-if="!loaded" />
  <div v-else>
    <h6>Administration</h6>
    <h1>
      {{ administration.abreviation }}
    </h1>
    <Accordion class="mb-xxl" :sub="true">
      <template #title>
        <span class="cap-first">{{ administration.nom }}</span>
      </template>

      <template v-if="administration.modification" #buttons>
        <button class="btn py-s px-m" @click="editPopupOpen">
          <i class="icon-24 icon-pencil" />
        </button>
      </template>

      <template #sub>
        <div class="px-m pt-m border-b-s">
          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6 class="mt-xs">Type</h6>
            </div>
            <div class="tablet-blob-3-4">
              <p class="word-break">
                {{ administration.type.nom }}
              </p>
            </div>
          </div>

          <div v-if="administration.service" class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6 class="mt-xs">Service</h6>
            </div>
            <div class="tablet-blob-3-4">
              <p class="word-break">
                {{ administration.service }}
              </p>
            </div>
          </div>

          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6 class="mt-xs">Adresse</h6>
            </div>
            <div class="tablet-blob-3-4">
              <p>
                {{ administration.adresse1 }}
                <span v-if="administration.adresse2"
                  ><br />{{ administration.adresse2 }}</span
                >
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

          <div v-if="administration.departement" class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6 class="mt-xs">Département</h6>
            </div>
            <div class="tablet-blob-3-4">
              <p class="word-break">
                {{ administration.departement.nom }}
              </p>
            </div>
          </div>

          <div v-if="administration.region" class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6 class="mt-xs">Région</h6>
            </div>
            <div class="tablet-blob-3-4">
              <p class="word-break">
                {{ administration.region.nom }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </Accordion>

    <div v-if="utilisateurs && utilisateurs.length" class="mb-xxl">
      <div class="line-neutral width-full mb-xxl" />
      <h2>Utilisateurs</h2>
      <div class="line width-full" />
      <Table
        class="width-full-p"
        :columns="utilisateursColonnes"
        :rows="utilisateursLignes"
        :utilisateurs="utilisateurs"
      />
    </div>

    <div v-if="permissionsCheck(['super'])" class="mb-xxl">
      <div class="line-neutral width-full mb-xxl" />
      <h2>Permissions</h2>

      <AdministrationPermission :administration="administration" />
    </div>
  </div>
</template>

<script>
import Accordion from './_ui/accordion.vue'
import Loader from './_ui/loader.vue'
import Table from './_ui/table.vue'
import AdministrationEditPopup from './administration/edit-popup.vue'
import AdministrationPermission from './administration/permissions.vue'

import {
  utilisateursColonnes,
  utilisateursLignesBuild
} from './utilisateurs/table'

export default {
  components: {
    Accordion,
    Loader,
    Table,
    AdministrationPermission
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

    utilisateurs() {
      return this.administration.utilisateurs
    },

    utilisateursLignes() {
      return utilisateursLignesBuild(this.utilisateurs)
    },

    user() {
      return this.$store.state.user.current
    },

    loaded() {
      return !!this.administration
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
    this.$store.commit('administration/reset')
  },

  methods: {
    async get() {
      await this.$store.dispatch('administration/get', this.$route.params.id)
    },

    editPopupOpen() {
      const administration = {
        id: this.administration.id,
        typeId: this.administration.type.id,
        nom: this.administration.nom,
        abreviation: this.administration.abreviation,
        service: this.administration.service,
        url: this.administration.url,
        email: this.administration.email,
        telephone: this.administration.telephone,
        adresse1: this.administration.adresse1,
        adresse2: this.administration.adresse2,
        codePostal: this.administration.codePostal,
        commune: this.administration.commune,
        cedex: this.administration.cedex,
        departementId:
          this.administration.departement && this.administration.departement.id,
        regionId: this.administration.region && this.administration.region.id
      }

      this.$store.commit('popupOpen', {
        component: AdministrationEditPopup,
        props: { administration }
      })
    }
  }
}
</script>
