<template>
  <Table
    ref="table"
    :elements="elements"
    :columns="colonnes"
    @page:update="$emit('page:update', $event)"
    @range:update="$emit('range:update', $event)"
  />
</template>

<script>
import Vue from 'vue'
import Table from '../ui/table.vue'
import Pill from '../ui/pill.vue'
import List from '../ui/list.vue'

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
      ]
    }
  },

  computed: {
    elements() {
      return this.utilisateurs.map(utilisateur => {
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
          lien:
            utilisateur.entreprises && utilisateur.entreprises.length
              ? {
                  component: List,
                  props: {
                    elements: utilisateur.entreprises.map(({ nom }) => nom),
                    mini: true
                  },
                  class: 'mb--xs',
                  value: utilisateur.entreprises
                    .map(({ nom }) => nom)
                    .join(', ')
                }
              : { value: '' }
        }

        return {
          id: utilisateur.id,
          link: { name: 'utilisateur', params: { id: utilisateur.id } },
          columns
        }
      })
    }
  }
}
</script>
