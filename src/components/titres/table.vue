<template>
  <TitresTable
    ref="table"
    :titres="titres"
    @page:update="urlPageUpdate"
    @range:update="urlRangeUpdate"
    @sort:update="urlSortUpdate"
  />
</template>

<script>
import TitresTable from '../camino/titres-table.vue'

export default {
  name: 'Titres',

  components: {
    TitresTable
  },

  props: {
    titres: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    page() {
      return this.$store.state.user.preferences.titres.table.page
    },

    range() {
      return this.$store.state.user.preferences.titres.table.range
    },

    sort() {
      return this.$store.state.user.preferences.titres.table.sort
    }
  },

  watch: {
    titres: function(to, from) {
      if (from.length && from.length !== to.length) {
        this.urlPageUpdate(1)
      }
    },

    $route: function(to, from) {
      if (to.query.page && to.query.page !== from.query.page) {
        this.preferencesPageUpdate(Number(to.query.page))
      }

      if (to.query.range && to.query.range !== from.query.range) {
        this.preferencesRangeUpdate(Number(to.query.range))
      }

      if (!to.query.range && !to.query.page) {
        this.init()
      }
    }
  },

  mounted() {
    this.init()
  },

  destroyed() {
    const query = Object.assign({}, this.$route.query)

    if (query.range || query.page) {
      if (query.range) {
        delete query.range
      }

      if (query.page) {
        delete query.page
      }

      this.$router.replace({ query })
    }
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
        this.$refs.table.sortUpdate(this.sort)
        this.urlSortUpdate(this.sort)
      } else if (sort !== this.sort) {
        this.$refs.table.sortUpdate(sort)
        this.preferencesSortUpdate(sort)
      }
    },

    preferencesPageUpdate(page) {
      this.$store.dispatch('user/preferenceSet', {
        section: 'titres.table.page',
        value: page
      })
    },

    urlPageUpdate(page) {
      this.urlParamSet('page', page.toString())
    },

    preferencesRangeUpdate(range) {
      this.$store.dispatch('user/preferenceSet', {
        section: 'titres.table.range',
        value: range
      })
    },

    urlRangeUpdate(range) {
      this.urlParamSet('range', range.toString())
    },

    preferencesSortUpdate(sort) {
      this.$store.dispatch('user/preferenceSet', {
        section: 'titres.table.sort',
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
