<template>
  <Table
    ref="table"
    :elements="elements"
    :columns="colonnes"
    @page:update="urlPageUpdate"
    @range:update="urlRangeUpdate"
    @sort:update="urlSortUpdate"
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
    },

    page() {
      return this.$store.state.user.preferences.utilisateurs.table.page
    },

    range() {
      return this.$store.state.user.preferences.utilisateurs.table.range
    },

    sort() {
      return this.$store.state.user.preferences.utilisateurs.table.sort
    }
  },

  mounted() {
    this.init()
  },

  created() {
    this.columnsIds = ['nom', 'prenom', 'email', 'permissions', 'lien']
  },

  methods: {
    init() {
      const page = this.$route.query.page && Number(this.$route.query.page)
      const range = this.$route.query.range && Number(this.$route.query.range)
      const sort = this.$route.query.sort && this.$route.query.sort

      if (!page) {
        this.$refs.table.pageUpdate(this.page)
        this.urlPageUpdate(this.page)
      } else if (page !== this.page) {
        this.$refs.table.pageUpdate(page)
        this.preferencesPageUpdate(page)
      }

      if (!range) {
        this.$refs.table.rangeUpdate(this.range)
        this.urlRangeUpdate(this.range)
      } else if (range !== this.range) {
        this.$refs.table.rangeUpdate(range)
        this.preferencesRangeUpdate(range)
      }

      if (!sort) {
        this.$refs.table.sortUpdate(this.sort, this.columnsIds)
        this.urlSortUpdate(this.sort)
      } else if (sort !== this.sort) {
        this.$refs.table.sortUpdate(sort, this.columnsIds)
        this.preferencesSortUpdate(sort)
      }
    },

    preferencesPageUpdate(page) {
      this.$store.dispatch('user/preferenceSet', {
        section: 'utilisateurs.table.page',
        value: page
      })
    },

    urlPageUpdate(page) {
      this.urlParamSet('page', page.toString())
      this.preferencesPageUpdate(page)
    },

    preferencesRangeUpdate(range) {
      this.$store.dispatch('user/preferenceSet', {
        section: 'utilisateurs.table.range',
        value: range
      })
    },

    urlRangeUpdate(range) {
      this.urlParamSet('range', range.toString())
      this.preferencesRangeUpdate(range)
    },

    preferencesSortUpdate(sort) {
      this.$store.dispatch('user/preferenceSet', {
        section: 'utilisateurs.table.sort',
        value: sort
      })
    },

    urlSortUpdate(sort) {
      if (sort) {
        this.urlParamSet('sort', sort.toString())
        this.preferencesSortUpdate(sort)
      }
    }
  }
}
</script>
