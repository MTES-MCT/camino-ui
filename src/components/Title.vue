<template>
  <div>
    <loader v-if="!loaded" />
    <card v-else>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-2">
          <h1 class="mt-xs">{{ title['nom'] }}</h1>
          <h4 class="mb"><tag
            :color="`bg-title-domain-${title['domaine']['code'].toLowerCase()}`"
            class="mono mr-s mt--s">{{ title['domaine']['code'] }}</tag>{{ title['type'] }}
          </h4>
          <div class="blobs">
            <div class="blob-1-2">
              <h6>{{ title['références'].length > 1 ? 'Références' : 'Référence' }}</h6>
              <ul class="list-prefix">
                <li 
                  v-for="reference in title['références']"
                  :key="reference['valeur']">
                  <span
                    v-if="reference['type']"
                    class="h5">{{ reference['type'] }}</span>{{ reference['valeur'] }}
                </li>
              </ul>
            </div>
            <div class="blob-1-2">
              <h6>{{ title['titulaires'].length > 1 ? 'Titulaires' : 'Titulaire' }}</h6>
              <ul class="list-prefix">
                <li 
                  v-for="titulaire in title['titulaires']"
                  :key="titulaire.id">
                  {{ titulaire['nom'] }}
                </li>
              </ul>

            </div>
          </div>
          <div
            v-if="title['substances']['principales'] && title['substances']['principales'].length > 0">
            <h6>Substances principales</h6>
            <tag-list :elements="title['substances']['principales']" />
          </div>
          <div 
            v-if="title['substances']['connexes'] && title['substances']['connexes'].length > 0" >
            <h6>Substances connexes</h6>
            <tag-list :elements="title['substances']['connexes']" />
          </div>
        </div>
        <div class="tablet-blob-1-2">
          <div class="blobs">
            <div class="blob-1-2">
              <h6>Statut</h6>
              <h4><title-status :status="title.statut" />{{ title.statut }}</h4>
            </div>
            <div class="blob-1-2">
              <h6>Travaux</h6>
              <h4><title-status :status="title.travaux" />{{ title.travaux }}</h4>
            </div>
          </div>
          <div>
            <table class="table-xxs">
              <tr>
                <th>Phase</th><th>Date</th><th>Durée</th>
              </tr>
              <tr
                v-for="phase in title.phases"
                :key="phase.date">
                <td>{{ phaseCurrent['nom'] }}</td>
                <td>{{ phaseCurrent['date'] | dateFormat }}</td>
                <td>{{ `${phaseCurrent['durée']} ans` }}</td>
              </tr>
            </table>
          </div>
          <div v-if="title['liens']">
            <h6>Liens</h6>
            <ul class="list-sans">
              <li 
                v-for="link in title['liens']"
                :key="link.id"
                class="mb-xs">
                <router-link
                  :to="{ name: 'titre', params: { id: link.id }}"
                  class="btn h6 bold py-xs px-s rnd">{{ link['type'] }} : {{ link['nom'] }}</router-link></li>
            </ul>
          </div>
        </div>
      </div>
      <lmap
        v-if="phaseCurrent.geojson"
        :geojson="phaseCurrent.geojson"
        class="mb" />

      <div class="tablet-blobs">
        <div class="tablet-blob-1-4">
          <h6>Surface</h6>
          <p>{{ phaseCurrent.surface }} Km²</p>
          <h6>Emprise</h6>
          <tag-list :elements="phaseCurrent.emprises" />
        </div>
        <div class="tablet-blob-3-4">
          <h6>Communes</h6>
          <div
            v-for="(departements, region) in phaseCurrent.communes"
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
          <h6>{{ title['titulaires'].length > 1 ? 'Titulaires' : 'Titulaire' }}</h6>
          <company
            v-for="titulaire in title.titulaires"
            :key="titulaire['id']"
            :company="titulaire"
            class="mb" />
        </div>

        <div class="tablet-blob-1-2">
          <h6>Administrations</h6>
          <company
            v-for="referent in title['administrations']"
            :key="referent['id']"
            :company="referent"
            class="mb" />
        </div>
      </div>

      <div
        v-if="title['démarches en cours']"
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
              v-for="d in title['démarches en cours']"
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
        v-if="title['démarches']"
        :event-types="title['démarches']" />

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
    title () {
      return this.$store.state.title.current
    },
    phaseCurrent () {
      return this.title['phases'][this.title['phases'].length - 1]
    },
    loaded () {
      return !!this.title
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
