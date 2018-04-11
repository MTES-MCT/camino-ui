<template>
  <div>
    <loader v-if="!loaded" />
    <card v-else>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-2">
          <h6>Titre</h6>
          <h1 class="mb-s">{{ titre.nom }}</h1>
          <h2>{{ titre.type }}</h2>
          <div
            v-if="titre.substances"
            class="tablet-blobs">
            <div class="tablet-blob-1-2 mb-0">
              <h6>Substances principales</h6>
              <tag-list :elements="titre.substances.principales" />
            </div>
            <div 
              v-if="titre.substances.connexes"
              class="tablet-blob-1-2 mb-0" >
              <h6>Substances connexes</h6>
              <tag-list :elements="titre.substances.connexes" />
            </div>
          </div>
        </div>
        <div class="tablet-blob-1-2">
          <div class="blobs">
            <div class="blob-1-2">
              <h6>Références</h6>
              <p>
                {{ titre['références']['métier'] }}
              </p>
            </div>
            <div 
              v-if="titre['références']['rntm']"
              class="blob-1-2">
              <h6>RNTM</h6>
              <p>
                {{ titre['références']['rntm'] }}
              </p>
            </div>
          </div>
          <div class="blobs">
            <div class="blob-1-2">
              <h6>Début</h6>
              <h4>{{ titre['validité']['début'] | dateFormat }}</h4>
            </div>
            <div class="blob-1-2">
              <h6>Durée</h6>
              <h4>{{ `${titre['validité']['durée']} ans` }}</h4>
            </div>
          </div>
          <div class="blobs">
            <div class="blob-1-2 mb-0">
              <h6>Statut</h6>
              <h4><title-status :status="titre.statut" />{{ titre.statut }}</h4>
            </div>
            <div class="blob-1-2 mb-0">
              <h6>Travaux</h6>
              <h4><title-status :status="titre.travaux" />{{ titre.travaux }}</h4>
            </div>
          </div>
        </div>
      </div>
      <lmap
        v-if="titre.geojson"
        :geojson="titre.geojson"
        class="mb" />

      <div class="tablet-blobs">
        <div class="tablet-blob-1-4">
          <h6>Surface</h6>
          <p>{{ titre.surface }}</p>
          <h6>Emprise</h6>
          <tag-list :elements="titre.emprises" />
        </div>
        <div class="tablet-blob-3-4">
          <h6>Communes</h6>
          <div
            v-for="(departements, region) in titre.communes"
            :key="region">
            <div
              v-for="(communes, departement) in departements"
              :key="departement">
              <h5 class="mb-xs">{{ region }} / {{ departement }}</h5>
              <tag-list :elements="communes" />
            </div>
          </div>
        </div>
      </div>

      <div class="tablet-blobs">
        <div class="tablet-blob-1-2">
          <h6>Titulaire s</h6>
          <company
            v-for="titulaire in titre.titulaires"
            :key="titulaire['id']"
            :company="titulaire"
            class="mb" />
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
              <td><tag>{{ d.type }}</tag></td>
              <td>{{ d.nom }}</td>
              <td>
                <title-status :status="d['statut']" />
                {{ d['statut'] }}
              </td>
            </tr>
          </table>
        </div>
      </div>

      <title-timeline
        v-if="titre['démarches']"
        :event-types="titre['démarches']" />

      <title-toolbar />
    </card>
  </div>
</template>

<script>
import Card from '@/components/ui/Card.vue'
import Lmap from '@/components/ui/Lmap.vue'
import Tag from '@/components/ui/Tag.vue'
import TagList from '@/components/ui/TagList.vue'
import Loader from '@/components/ui/Loader.vue'
import TitleStatus from '@/components/camino/TitleStatus.vue'
import Company from '@/components/camino/Company.vue'
import TitleToolbar from '@/components/camino/TitleToolbar.vue'
import TitleTimeline from './TitleTimeline.vue'

export default {
  components: {
    Tag,
    TagList,
    Loader,
    Company,
    Card,
    Lmap,
    TitleStatus,
    TitleToolbar,
    TitleTimeline
  },

  computed: {
    titre () {
      return this.$store.state.title.current
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
    this.$store.commit('title/reset')
  },

  methods: {
    get () {
      this.$store.dispatch('title/get', { id: this.$route.params.id })
    }
  }
}
</script>
