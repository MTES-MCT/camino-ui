<template>
  
  <loader v-if="!loaded" />
  <card v-else >
    <h2 class="mt-xs">Titres</h2>
    <div class="overflow-scroll-x">
      <table>
        <tr>
          <th>Nom</th>
          <th>Titulaires</th>
          <th>Domaine</th>
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
          <td class="bold">{{ titre.nom }}</td>
          <td>
            <div
              v-for="titulaire in titre.titulaires"
              :key="titulaire.id">
              {{ titulaire.nom }}
            </div>
          </td>
          <td><tag :color="`bg-title-domain-${titre.domaine.code.toLowerCase()}`"><span class="mono">{{ titre.domaine.code }}</span></tag></td>
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

    </div>
  </card>
</template>

<script>
import Card from '@components/ui/Card.vue'
import Loader from '@components/ui/Loader.vue'
import TagList from '@components/ui/TagList.vue'
import Tag from '@components/ui/Tag.vue'
import TitleStatus from '@components/camino/TitleStatus.vue'

export default {
  name: 'Titres',

  components: {
    Loader,
    Card,
    TagList,
    Tag,
    TitleStatus
  },

  computed: {
    titres () {
      return this.$store.state.titles.list
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
