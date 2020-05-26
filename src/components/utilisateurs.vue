<template>
  <div>
    <div class="desktop-blobs pt-s">
      <div class="desktop-blob-2-3">
        <h1 class="mt-xs mb-m">
          <h1>Utilisateurs</h1>
        </h1>
      </div>

      <div class="desktop-blob-1-3">
        <button
          v-if="permissionsCheck(['super', 'admin'])"
          class="btn rnd-xs py-s px-m full-x flex mb-s h5"
          @click="addPopupOpen"
        >
          <span class="mt-xxs">Ajouter un utilisateur</span>
          <i class="icon-24 icon-plus flex-right" />
        </button>
      </div>
    </div>

    <Url
      v-if="metasLoaded"
      :params="urlParamsFiltres"
      :values="preferences.filtres"
      @params:update="preferencesFiltresUpdate"
    />

    <Url
      v-if="metasLoaded"
      :params="urlParamsTable"
      :values="preferences.table"
      @params:update="preferencesTableUpdate"
    />

    <Filtres
      :filtres="filtres"
      :loaded="metasLoaded"
      :metas="metas"
      :preferences="preferences.filtres"
      @elements:update="utilisateursUpdate"
      @preferences:update="preferencesFiltresUpdate"
    />

    <div class="tablet-blobs tablet-flex-direction-reverse">
      <div class="tablet-blob-1-3 flex mb-s">
        <Downloads
          v-if="utilisateurs.length"
          :formats="['csv', 'xlsx', 'ods']"
          section="utilisateurs"
          class="flex-right full-x"
        />
      </div>

      <div class="tablet-blob-2-3 flex">
        <div class="py-m h6 bold mb-xs">
          {{ resultat }}
        </div>
      </div>
    </div>

    <div class="line" />

    <Table
      :colonnes="utilisateursColonnes"
      :lignes="lignes"
      :preferences="preferences.table"
      :total="total"
      @elements:update="utilisateursUpdate"
      @preferences:update="preferencesTableUpdate"
    />
  </div>
</template>

<script>
import Url from './_ui/url.vue'
import Downloads from './_common/downloads.vue'
import Filtres from './_common/filtres.vue'
import Table from './_common/table.vue'
import UtilisateurEditPopup from './utilisateur/edit-popup.vue'

import filtres from './utilisateurs/filtres'
import {
  utilisateursColonnes,
  utilisateursLignesBuild
} from './utilisateurs/table'

export default {
  name: 'Utilisateurs',

  components: { Url, Downloads, Filtres, Table },

  data() {
    return {
      filtres,
      utilisateursColonnes,
      metasLoaded: false
    }
  },

  computed: {
    user() {
      return this.$store.state.user.current
    },

    utilisateurs() {
      return this.$store.state.utilisateurs.list
    },

    total() {
      return this.$store.state.utilisateurs.total
    },

    preferences() {
      return this.$store.state.utilisateurs.preferences
    },

    metas() {
      return this.$store.state.utilisateurs.metas
    },

    params() {
      return this.$store.state.utilisateurs.params
    },

    lignes() {
      return utilisateursLignesBuild(this.utilisateurs)
    },

    resultat() {
      const res =
        this.total > this.utilisateurs.length
          ? `${this.utilisateurs.length} / ${this.total}`
          : this.utilisateurs.length
      return `${res} résultat${this.utilisateurs.length > 1 ? 's' : ''}`
    },

    urlParamsFiltres() {
      const paramsIds = Object.keys(this.preferences.filtres)
      const pa = this.params.reduce((p, param) => {
        if (paramsIds.includes(param.id)) {
          p[param.id] = param
        }

        return p
      }, {})

      return pa
    },

    urlParamsTable() {
      const paramsIds = Object.keys(this.preferences.table)

      return this.params.reduce((p, param) => {
        if (paramsIds.includes(param.id)) {
          p[param.id] = param
        }

        return p
      }, {})
    }
  },

  watch: {
    user: 'metasGet'
  },

  created() {
    this.metasGet()
  },

  methods: {
    async utilisateursUpdate() {
      if (this.metasLoaded) {
        await this.$store.dispatch('utilisateurs/get')
      }
    },

    async metasGet() {
      if (
        !this.user ||
        !this.user.sections ||
        !this.user.sections.utilisateurs
      ) {
        await this.$store.dispatch('pageError')
        this.metasLoaded = false
      } else {
        await this.$store.dispatch('utilisateurs/metasGet')
        if (!this.metasLoaded) {
          this.metasLoaded = true
        }
      }
    },

    addPopupOpen() {
      this.$store.commit('popupOpen', {
        component: UtilisateurEditPopup,
        props: {
          utilisateur: {
            permissionId: 'defaut',
            entreprises: [],
            administrations: []
          },
          action: 'create'
        }
      })
    },

    async preferencesTableUpdate(params) {
      await this.$store.dispatch('utilisateurs/preferencesSet', {
        section: 'table',
        params
      })
    },

    async preferencesFiltresUpdate(params) {
      await this.$store.dispatch('utilisateurs/preferencesSet', {
        section: 'filtres',
        params
      })
    }
  }
}
</script>
