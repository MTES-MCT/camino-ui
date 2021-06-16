<template>
  <h1 class="mt-m mb-m">Tableau de bord</h1>
  <div class="line-neutral width-full mb-xxl" />
  <div v-if="user">
    <div class="flex">
      <h3>{{ user.prenom }} {{ user.nom }}</h3>
      <div class="flex-right">
        <router-link
          class="btn-border small py-s px-m rnd-s"
          :to="{ name: 'utilisateur', params: { id: user.id } }"
        >
          Profil
        </router-link>
      </div>
    </div>
    <div v-if="user.entreprises?.length" class="tablet-blobs">
      <div class="tablet-blob-1-4">
        <h5>Entreprise{{ user.entreprises.length > 1 ? 's' : '' }}</h5>
      </div>

      <div class="tablet-blob-3-4">
        <ul class="list-inline">
          <li v-for="e in user.entreprises" :key="e.id" class="mb-xs">
            <router-link
              :to="{ name: 'entreprise', params: { id: e.id } }"
              class="btn-border small p-s rnd-xs mr-xs"
              tag="button"
            >
              {{ e.legalSiren ? `${e.nom} (${e.legalSiren})` : e.nom }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="user.administrations?.length" class="tablet-blobs">
      <div class="tablet-blob-1-4">
        <h5>Administration</h5>
      </div>

      <div class="tablet-blob-3-4">
        <ul class="list-prefix">
          <li v-for="a in user.administrations" :key="a.id">
            {{ `${a.nom}${a.service ? ` - ${a.service}` : ''}` }}
          </li>
        </ul>
      </div>
    </div>

    <div class="line-neutral width-full mb-xxl" />
    <div class="flex">
      <h2>Titres miniers et autorisations actifs</h2>
      <div class="flex-right">
        <router-link
          class="btn-border small py-s px-m rnd-s"
          :to="{
            name: 'titres',
            query: { entreprises: entreprisesSirens.join(' ') }
          }"
        >
          Afficher tous les titres
        </router-link>
      </div>
    </div>
    <Titres
      :titres="titres"
      :initialized="initialized"
      :vue-id="vueId"
      :total="titresTotal"
      @vueSet="vueSet"
    />

    <div class="line-neutral width-full mb-xxl" />
    <div class="flex">
      <h2>Activités à compléter</h2>
      <div class="flex-right">
        <router-link
          class="btn-border small py-s px-m rnd-s"
          :to="{
            name: 'activites',
            query: { titresEntreprises: entreprisesSirens.join(' ') }
          }"
        >
          Afficher toutes les activités
        </router-link>
      </div>
    </div>

    <Table
      class="width-full-p"
      :columns="activitesColonnes"
      :rows="activitesLignes"
      :column="activitesParams.table.colonne"
      :range="activitesParams.table.intervalle"
      :order="activitesParams.table.ordre"
      :page="activitesParams.table.page"
      :pagination="activitesPagination"
      :total="activitesTotal"
      @params-update="activitesParamsTableUpdate"
    />
  </div>

  <div>
    <div class="line-neutral width-full mb-xxl" />
    <h2>Mises à jour</h2>

    <div class="line width-full" />
    <Table class="width-full-p" :columns="logsColonnes" :rows="logsLignes" />
  </div>
</template>

<script>
import { permissionsCheck } from '@/utils/index.js'
import { logs, user } from './logs/data.js'

import { logsLignesBuild, logsColonnes } from './logs/table.js'
import Table from './_ui/table.vue'
import Titres from './titres/preview.vue'

import { activitesColonnes, activitesLignesBuild } from './activites/table'

export default {
  components: { Table, Titres },

  data() {
    return {
      logsColonnes,
      logs,
      user,

      activitesColonnes
    }
  },

  computed: {
    logsLignes() {
      return logsLignesBuild(this.logs)
    },

    titres() {
      return this.$store.state.titres.elements
    },

    initialized() {
      return this.$store.state.titres.initialized
    },

    vueId() {
      return this.$store.state.titres.vueId
    },

    titresTotal() {
      return this.$store.state.titres.total
    },

    entreprisesSirens() {
      return this.user.entreprises.map(({ legalSiren }) => legalSiren)
    },

    activites() {
      return this.$store.state.titresActivites.elements
    },

    activitesLignes() {
      return activitesLignesBuild(this.activites)
    },

    activitesParams() {
      return this.$store.state.titresActivites.params
    },

    activitesPagination() {
      return !!this.activitesParams.table.page
    },

    activitesTotal() {
      return this.$store.state.titresActivites.total
    }
  },

  async created() {
    await this.init()
  },

  unmounted() {
    this.$store.commit('titres/reset')
  },

  methods: {
    async init() {
      this.$store.commit('titres/paramsSet', {
        section: 'filtres',
        params: {
          entreprises: this.entreprisesSirens.join(' '),
          statutsIds: ['dmi', 'ind', 'mod', 'val']
        }
      })

      this.$store.commit('titres/useUrlUpdate', false)
      await this.$store.dispatch('titres/init')

      this.$store.commit('titresActivites/useUrlUpdate', false)
      this.$store.commit('titresActivites/paramsSet', {
        section: 'filtres',
        params: {
          titresEntreprises: this.entreprisesSirens.join(' '),
          statutsIds: ['abs']
        }
      })

      await this.$store.dispatch('titresActivites/init')
    },

    async vueSet(vueId) {
      await this.$store.dispatch('titres/vueSet', vueId)
    },

    async activitesParamsTableUpdate(params) {
      if (params.range) {
        params.intervalle = params.range
        delete params.range
      }

      if (params.column) {
        params.colonne = params.column
        delete params.column
      }

      if (params.order) {
        params.ordre = params.order
        delete params.order
      }

      await this.$store.dispatch(`titresActivites/paramsSet`, {
        section: 'table',
        params
      })
    },

    permissionsCheck(user, permissions) {
      return permissionsCheck(user, permissions)
    }
  }
}
</script>
