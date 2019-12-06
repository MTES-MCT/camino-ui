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
import Table from '../_ui/table.vue'
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
      ]
    }
  },

  computed: {
    elements() {
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
  }
}
</script>
