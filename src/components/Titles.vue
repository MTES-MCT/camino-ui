<template>
  
  <loader v-if="!loaded" />
  <card v-else >
    <h2 class="mt-xs">Titres</h2>
    <div class="filters p-m bg-alt mb">
      <div class="flex">
        <h4 class="mt-s mb-0">Filtres</h4>
        <div class="flex-right">
          <btn-toggle
            :opened="opened"
            @click.native="opened = !opened" />
        </div>
      </div>
      
      <div
        :class="{ 'height-0': !opened}"
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
    <div class="overflow-scroll-x">
      <table>
        <tr>
          <th />
          <th>Nom</th>
          <th>Titulaires</th>
          <th>Type</th>
          <th>Statut</th>
          <th>Substances</th>
        </tr>
        <router-link
          v-for="titre in titres"
          :key="titre.id"
          :to="{ name: 'titre', params: { id: titre.id }}"
          tag="tr"
          class="tr-link">
          <td>
            <tag
              :color="`bg-title-domain-${titre.domaine.code.toLowerCase()}`"
              class="mono">{{ titre.domaine.code }}</tag>
          </td>
          <td class="bold">{{ titre.nom }}</td>
          <td>
            <div
              v-for="titulaire in titre.titulaires"
              :key="titulaire.id">
              {{ titulaire.nom }}
            </div>
          </td>
          <td>{{ titre.type }}</td>
          <td><title-status :status="titre.statut" />{{ titre.statut }}</td>
          <td>
            <tag-list
              v-if="titre.substances && titre.substances.principales"
              :elements="titre.substances.principales"
              class="mb--xs" />
          </td>
        </router-link>
      </table>
      <ul class="list-inline">
        <li class="active">
          <a
            href="#"
            class="btn px-s py-xs">
            1
          </a>
        </li>
        <li>
          <a
            href="#"
            class="btn px-s py-xs">
            2
          </a>
        </li>
        <li>
          <a
            href="#"
            class="btn px-s py-xs">
            3
          </a>
        </li>
      </ul>
    </div>
  </card>
</template>

<script>
import Card from '@components/ui/Card.vue'
import Loader from '@components/ui/Loader.vue'
import TagList from '@components/ui/TagList.vue'
import Tag from '@components/ui/Tag.vue'
import Dot from '@components/ui/Dot.vue'
import BtnToggle from '@components/ui/BtnToggle.vue'
import TitleStatus from '@components/camino/TitleStatus.vue'

export default {
  name: 'Titres',

  components: {
    Loader,
    Card,
    TagList,
    Tag,
    Dot,
    BtnToggle,
    TitleStatus
  },

  data () {
    return {
      opened: false
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
