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
import Table from '../ui/table.vue'

export default {
  name: 'Entreprises',

  components: {
    Table
  },

  props: {
    entreprises: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      colonnes: [
        {
          id: 'nom',
          name: 'Nom'
        },
        {
          id: 'siren',
          name: 'Siren'
        }
      ]
    }
  },

  computed: {
    elements() {
      return this.entreprises.map(entreprise => {
        const columns = {
          nom: { value: entreprise.nom },
          siren: {
            value: entreprise.legalEtranger || entreprise.legalSiren || '–'
          }
        }

        return {
          id: entreprise.id,
          link: { name: 'entreprise', params: { id: entreprise.id } },
          columns
        }
      })
    },

    page() {
      return this.$store.state.user.preferences.entreprises.table.page
    },

    range() {
      return this.$store.state.user.preferences.entreprises.table.range
    },

    sort() {
      return this.$store.state.user.preferences.entreprises.table.sort
    }
  },

  mounted() {
    this.init()
  },

  created() {
    this.columnsIds = ['nom', 'siren']
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
        section: 'entreprises.table.page',
        value: page
      })
    },

    urlPageUpdate(page) {
      this.urlParamSet('page', page.toString())
      this.preferencesPageUpdate(page)
    },

    preferencesRangeUpdate(range) {
      this.$store.dispatch('user/preferenceSet', {
        section: 'entreprises.table.range',
        value: range
      })
    },

    urlRangeUpdate(range) {
      this.urlParamSet('range', range.toString())
      this.preferencesRangeUpdate(range)
    },

    preferencesSortUpdate(sort) {
      this.$store.dispatch('user/preferenceSet', {
        section: 'entreprises.table.sort',
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
