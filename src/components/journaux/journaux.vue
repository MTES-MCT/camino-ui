<template>
  <Liste
    nom="journaux"
    :colonnes="colonnes"
    :lignes="lignes"
    :elements="journaux"
    :filtres="filtres"
    :params="params"
    :total="total"
    :initialized="true"
    @params-update="paramsUpdate"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Liste from '../_common/liste.vue'
import { markRaw } from '@vue/reactivity'
import Differences from './differences.vue'

export default defineComponent({
  components: { Liste },
  props: {
    titreId: { type: String, default: undefined }
  },
  computed: {
    journaux() {
      return this.$store.state.journaux.elements
    },
    total() {
      return this.$store.state.journaux.total
    },
    params() {
      return this.$store.state.journaux.params
    },
    colonnes() {
      const colonnes = [
        { id: 'date', name: 'Date' },
        { id: 'titre', name: 'Titre' },
        { id: 'utilisateur', name: 'Utilisateur' },
        { id: 'operation', name: 'Action' },
        {
          id: 'differences',
          name: 'Modifications'
        }
      ]

      if (!this.titreId) {
        return colonnes
      }
      return colonnes.filter(({ id }) => id !== 'titre')
    },
    filtres() {
      return !this.titreId
        ? [
            {
              id: 'recherche',
              type: 'input',
              value: '',
              name: 'Recherche'
            }
          ]
        : []
    },
    lignes() {
      return this.journaux?.map(journal => {
        const date = new Date(Number.parseInt(journal.date))
        const columns = {
          date: {
            value: date.toLocaleString('fr-FR')
          },
          titre: {
            value: journal.titre?.nom
          },
          utilisateur: {
            value: journal.utilisateur
              ? `${journal.utilisateur.nom} ${journal.utilisateur.prenom}`
              : 'Système'
          },
          operation: {
            value: journal.operation
          },
          differences: {
            component: markRaw(Differences),
            props: {
              journal
            }
          }
        }

        return {
          id: journal.id,
          link: { name: 'etape', params: { id: journal.elementId } },
          columns
        }
      })
    }
  },

  async created() {
    this.paramsUpdate({
      section: 'filtres',
      params: { titreId: this.titreId }
    })
    await this.init()
  },

  unmounted() {
    this.$store.commit('journaux/reset')
  },

  methods: {
    async init() {
      await this.$store.dispatch('journaux/init')
    },
    async paramsUpdate(options: any) {
      await this.$store.dispatch(`journaux/paramsSet`, options)
    }
  }
})
</script>
