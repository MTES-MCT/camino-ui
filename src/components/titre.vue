<template>
  <Loader v-if="!loaded" />
  <div v-else>
    <div v-if="titre.doublonTitre?.id" class="p-m bg-warning color-bg mb">
      Ce titre est un doublon. Le titre déjà existant est :
      <a class="color-bg" :href="`/titres/${titre.doublonTitre.id}`">{{
        titre.doublonTitre.nom
      }}</a
      >.
    </div>

    <TitreHeader :titre="titre" @titre-event-track="eventTrack" />

    <TitreInfos :titre="titre" class="mb" />

    <Perimetre
      v-if="titre.geojsonMultiPolygon && titre.points"
      :titre-id="titre.id"
      :domaine-id="titre.domaine.id"
      :titre-type-id="titre.type.type.id"
      :points="titre.points"
      :is-main="true"
      :tab-id="geoTabId"
      :geojson-multi-polygon="titre.geojsonMultiPolygon"
      @tab-update="geoTabUpdate"
    />

    <TitreTerritoires
      :pays="titre.pays"
      :forets="titre.forets"
      :sdom-zones="titre.sdomZones"
      :surface="titre.surface"
    />

    <div class="line width-full mb-xl" />

    <TitreRepertoire
      :titulaires="titre.titulaires"
      :amodiataires="titre.amodiataires"
      :administrations="titre.administrations"
      @titre-event-track="eventTrack"
    />

    <div v-if="tabs.length > 1">
      <div class="flex">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          class="mr-xs"
          :class="{ active: tabId === tab.id }"
        >
          <button
            :id="`cmn-titre-tab-${tab.id}`"
            class="p-m btn-tab rnd-t-s"
            @click="tabUpdate(tab.id)"
          >
            {{ tab.nom }}
            <ActivitesPills
              v-if="tab.id === 'activites'"
              class="inline-block ml-s"
              :activites-absentes="titre.activitesAbsentes"
              :activites-en-construction="titre.activitesEnConstruction"
            />
          </button>
        </div>
      </div>
      <div class="line-neutral width-full mb" />
    </div>

    <TitreDemarches
      v-if="tabId === 'demarches'"
      :demarches="demarches"
      :tab-id="tabId"
      @event-track="eventTrack"
    />

    <TitreActivitesList
      v-if="tabId === 'activites'"
      :activites="titre.activites"
      :titre-id="titre.id"
    />

    <TitreDemarches
      v-if="tabId === 'travaux'"
      :demarches="travaux"
      :tab-id="tabId"
      @titre-event-track="eventTrack"
    />

    <Journaux v-if="tabId === 'journaux'" :titre-id="titre.id" />
  </div>
</template>

<script>
import Loader from './_ui/loader.vue'
import Perimetre from './_common/perimetre.vue'
import ActivitesPills from './activites/pills.vue'

import TitreHeader from './titre/header.vue'
import TitreInfos from './titre/infos.vue'
import TitreTerritoires from './titre/territoires.vue'
import TitreRepertoire from './titre/repertoire.vue'
import TitreDemarches from './titre/demarches.vue'
import TitreActivitesList from './activites/list.vue'
import Journaux from './journaux/journaux.vue'

export default {
  components: {
    Loader,
    ActivitesPills,
    TitreHeader,
    TitreInfos,
    TitreTerritoires,
    TitreRepertoire,
    TitreDemarches,
    TitreActivitesList,
    Perimetre,
    Journaux
  },

  data() {
    return {
      geoTabId: 'carte',
      show: false
    }
  },

  computed: {
    titre() {
      return this.$store.state.titre.element
    },

    user() {
      return this.$store.state.user.element
    },

    loaded() {
      return !!this.titre
    },

    tabs() {
      return this.$store.getters['titre/tabs']
    },

    tabId() {
      return this.$store.getters['titre/tabId']
    },

    demarches() {
      return this.$store.getters['titre/demarches']
    },

    travaux() {
      return this.$store.getters['titre/travaux']
    }
  },

  watch: {
    '$route.params.id': function (id) {
      if (this.$route.name === 'titre' && id) {
        this.get()
      }
    },

    user: 'get'
  },

  async created() {
    await this.get()

    if (this.$route.hash) {
      const yOffset = -88
      const id = this.$route.hash.substring(1)
      const element = document.getElementById(id)
      if (element) {
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset

        window.scrollTo({ top: y })
      }
    }
  },

  beforeUnmount() {
    this.$store.commit('titre/reset')
  },

  methods: {
    async get() {
      await this.$store.dispatch('titre/get', this.$route.params.id)
    },

    tabUpdate(tabId) {
      this.eventTrack({
        categorie: 'titre-sections',
        action: `titre-${this.tabId}_consulter`,
        nom: this.$store.state.titre.element.id
      })

      this.$store.commit('titre/openTab', tabId)
    },

    geoTabUpdate(tabId) {
      this.eventTrack({
        categorie: 'titre-sections',
        action: `titre-vue${this.tabId}_consulter`,
        nom: this.$store.state.titre.element.id
      })

      this.geoTabId = tabId
    },

    eventTrack(event) {
      if (this.$matomo) {
        this.$matomo.trackEvent(event.categorie, event.action, event.nom)
      }
    }
  }
}
</script>
