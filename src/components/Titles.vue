<template>
  
  <loader v-if="!loaded" />
  <card v-else >
    <h2>Titres</h2>
    <table>
      <tr>
        <th>Nom</th>
        <th>Type</th>
        <th>Statut</th>
        <th>Substances</th>
        <th />
      </tr>
      <tr 
        v-for="titre in titres"
        :key="titre.id">
        <td class="bold">{{ titre.nom }}</td>
        <td>{{ titre.type }}</td>
        <td><title-status :status="titre.statut" />{{ titre.statut }}</td>
        <td>
          <tag-list
            v-if="titre.substances && titre.substances.principales"
            :elements="titre.substances.principales"
            class="mb--xs" />
        </td>
        <td>
          <router-link
            :to="{ name: 'titre', params: { id: titre.id }}"
            class="btn h5 px-s py-xs my--s">Details</router-link></td>
      </tr>
    </table>
  </card>
</template>

<script>
import Card from '@components/ui/Card.vue'
import Loader from '@components/ui/Loader.vue'
import TagList from '@components/ui/TagList.vue'
import TitleStatus from '@components/camino/TitleStatus.vue'

export default {
  name: 'Titres',

  components: {
    Loader,
    Card,
    TagList,
    TitleStatus
  },

  computed: {
    titres () {
      return this.$store.state.titres.list
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
      this.$store.dispatch('titres/get')
    }
  }

}
</script>
