<template>
  
  <loader v-if="!loaded" />
  <card v-else >
    <h2 class="mt-xs">Titres</h2>
    <div class="filters p-m bg-alt mb">
      <div class="flex">
        <h4 class="mt-s mb-0">Filtres</h4>
        <div class="flex-right">
          <btn-toggle
            :opened="filtersOpened"
            @click.native="filtersOpened = !filtersOpened" />
        </div>
      </div>
      
      <div
        :class="{ 'height-0': !filtersOpened}"
        class="tablet-blobs">
        <div class="tablet-blob-1-2 desktop-blob-1-3">
          <div class="mb">
            <h6>Localisation</h6>
            <input
              type="text"
              class="bg-bg">
          </div>
          <div class="mb">
            <h6>Titulaire</h6>
            <input
              type="text"
              class="bg-bg">
          </div>
          <div class="mb">
            <h6>Substances</h6>
            <input
              type="text"
              class="bg-bg">
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
    </div>
    <titles-table :titles="titres" />
  </card>
</template>

<script>
import Card from '@/components/ui/Card.vue'
import Loader from '@/components/ui/Loader.vue'
import Tag from '@/components/ui/Tag.vue'
import BtnToggle from '@/components/ui/BtnToggle.vue'
import TitleStatus from '@/components/camino/TitleStatus.vue'
import TitlesTable from '@/components/camino/TitlesTable.vue'

export default {
  name: 'Titres',

  components: {
    Loader,
    Card,
    Tag,
    BtnToggle,
    TitleStatus,
    TitlesTable
  },

  data () {
    return {
      filtersOpened: false
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
    }
  }

}
</script>
