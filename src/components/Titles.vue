<template>
  
  <loader v-if="!loaded" />
  <card v-else >

    <div class="flex">
      <h2 class="mt-s">Titres</h2>
      <ul class="list-inline flex-right">
        <li>
          <button
            class="btn-border px-m py-s"
            @click="viewSet('carte')">Carte</button>
        </li>
        <li>
          <button
            class="btn-border px-m py-s"
            @click="viewSet('liste')">Liste</button>
        </li>
      </ul>
    </div>

    <accordion class="mb">
      <template slot="title">Filtres</template>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-2 desktop-blob-1-3">
          <div class="mb">
            <h6>Localisation</h6>
            <input
              type="text">
          </div>
          <div class="mb">
            <h6>Titulaire</h6>
            <input
              type="text">
          </div>
          <div class="mb">
            <h6>Substances</h6>
            <input
              type="text">
          </div>
        </div>
        <div class="tablet-blob-1-2 desktop-blob-1-3">
          <h6>Domaine</h6>
          <ul class="list-sans">
            <li
              v-for="(domaine, domaineCode) in filtres.domaines"
              :key="domaineCode">
              <label>
                <input
                  type="checkbox"
                  class="mr-s">
                <tag
                  :color="`bg-title-domain-${domaineCode.toLowerCase()}`"
                  class="mr-xs mono">{{ domaineCode }}</tag>
                {{ domaine }}
              </label>
            </li>
          </ul>
        </div>
        <div class="tablet-blob-1-2 desktop-blob-1-3">
          <div class="mb">
            <h6>Type</h6>
            <ul class="list-sans">
              <li
                v-for="(type, typeCode) in filtres.types"
                :key="typeCode">
                <label>
                  <input
                    type="checkbox"
                    class="mr-s">
                  {{ type }}
                </label>
              </li>
            </ul>
          </div>
          <div class="mb">
            <h6>Statuts</h6>
            <ul class="list-sans">
              <li
                v-for="(statut, statutCode) in filtres.statuts"
                :key="statutCode">
                <label>
                  <input
                    type="checkbox"
                    class="mr-s">
                  <title-status :status="statut" />
                  {{ statut }}
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </accordion>
    <component
      :titles="titres"
      :is="viewCurrent" />
  </card>
</template>

<script>
import Card from '@/components/ui/Card.vue'
import Loader from '@/components/ui/Loader.vue'
import Tag from '@/components/ui/Tag.vue'
import Accordion from '@/components/ui/Accordion.vue'
import TitleStatus from '@/components/camino/TitleStatus.vue'
import TitlesTable from '@/components/camino/TitlesTable.vue'
import TitlesMap from '@/components/camino/TitlesMap.vue'

export default {
  name: 'Titres',

  components: {
    Loader,
    Card,
    Tag,
    Accordion,
    TitleStatus
  },

  data () {
    return {
      filtersOpened: false,
      viewCurrent: TitlesMap
    }
  },

  computed: {
    titres () {
      return this.$store.state.titles.list
    },
    filtres () {
      return this.$store.state.lib.titre.filtres
    },
    loaded () {
      return !!this.titres
    }
  },

  watch: {
    '$route': 'get'
  },

  created () {
    this.get()
  },

  methods: {
    get () {
      this.$store.dispatch('titles/get')
    },
    viewSet (viewNew) {
      if (viewNew === 'carte') {
        this.viewCurrent = TitlesMap
      } else {
        this.viewCurrent = TitlesTable
      }
    }
  }

}
</script>
