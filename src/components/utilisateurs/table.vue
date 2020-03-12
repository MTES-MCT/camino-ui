<template>
  <Table
    ref="table"
    :rows="lignes"
    :columns="colonnes"
    :range="preferences.intervalle"
    :page="preferences.page"
    :order="preferences.ordre"
    :column="preferences.colonne"
    @params:update="preferencesUpdate"
  />
</template>

<script>
import Vue from 'vue'
import Table from '../_ui/table-pagination.vue'
import Pill from '../_ui/pill.vue'
import List from '../_ui/list.vue'

export default {
  name: 'Utilisateurs',

  components: {
    Table
  },

  props: {
    utilisateurs: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      colonnes: [
        {
          id: 'nom',
          name: 'Nom',
          class: ['min-width-6']
        },
        {
          id: 'prenom',
          name: 'Prénom',
          class: ['min-width-6']
        },
        {
          id: 'email',
          name: 'Email'
        },
        {
          id: 'permissions',
          name: 'Permissions',
          class: ['min-width-6']
        },
        {
          id: 'lien',
          name: 'Lien',
          class: ['min-width-6']
        }
      ],
      preferences: {
        intervalle: 200,
        page: 1,
        ordre: 'asc',
        colonne: 'nom'
      }
    }
  },

  computed: {
    lignes() {
      return this.utilisateurs.map(utilisateur => {
        let elements

        if (utilisateur.administrations && utilisateur.administrations.length) {
          elements = utilisateur.administrations.map(({ nom }) => nom)
        } else if (utilisateur.entreprises && utilisateur.entreprises.length) {
          elements = utilisateur.entreprises.map(({ nom }) => nom)
        }

        const lien =
          elements && elements.length
            ? {
                component: List,
                props: {
                  elements,
                  mini: true
                },
                class: 'mb--xs',
                value: elements.join(', ')
              }
            : { value: '' }

        const columns = {
          prenom: { value: utilisateur.prenom || '–' },
          nom: { value: utilisateur.nom || '–' },
          email: { value: utilisateur.email || '–', class: ['h5'] },
          permissions: utilisateur.permission
            ? {
                component: Vue.component('UtilisateurPermission', {
                  components: {
                    Pill
                  },
                  render(h) {
                    return h('Pill', utilisateur.permission.nom)
                  }
                }),
                value: utilisateur.permission.nom
              }
            : '',
          lien
        }

        return {
          id: utilisateur.id,
          link: { name: 'utilisateur', params: { id: utilisateur.id } },
          columns
        }
      })
    }
  },

  methods: {
    preferencesUpdate(params) {
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

      Object.keys(params).forEach(id => {
        this.preferences[id] = params[id]
      })
    }
  }
}
</script>
