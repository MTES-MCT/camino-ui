<template>
  <TitresTable
    ref="table"
    :titres="titres"
    @page:update="urlUpdate('page', $event)"
    @intervalle:update="urlUpdate('range', $event)"
    @colonne:update="urlUpdate('column', $event)"
    @ordre:update="urlUpdate('order', $event)"
    @colonneIds:check="colonneIdCheck($event)"
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

    intervalle() {
      return this.$store.state.user.preferences.titres.table.range
    },

    colonne() {
      return this.$store.state.user.preferences.titres.table.column
    },

    ordre() {
      return this.$store.state.user.preferences.titres.table.order
    }
  },

  watch: {
    titres: function(to, from) {
      if (from.length && from.length !== to.length) {
        this.urlUpdate('page', 1)
      }
      this.init()
    },

    $route: function(to, from) {
      if (to.query.page && to.query.page !== from.query.page) {
        this.preferencesUpdate('page', Number(to.query.page))
      }

      if (
        to.query.intervalle &&
        to.query.intervalle !== from.query.intervalle
      ) {
        this.preferencesUpdate('range', Number(to.query.intervalle))
      }

      if (!to.query.intervalle && !to.query.page) {
        this.init()
      }
    }
  },

  created() {
    this.param = {
      page: 'page',
      range: 'intervalle',
      column: 'colonne',
      order: 'ordre'
    }
  },

  mounted() {
    this.init()
  },

  destroyed() {
    const query = Object.assign({}, this.$route.query)

    if (query.intervalle || query.page) {
      if (query.intervalle) {
        delete query.intervalle
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
      const range =
        this.$route.query.intervalle && Number(this.$route.query.intervalle)
      const column = this.$route.query.colonne && this.$route.query.colonne
      const order = this.$route.query.ordre

      this.paramUpdate('page', page, this.page)
      this.paramUpdate('range', range, this.intervalle)
      this.paramUpdate('column', column, this.colonne || 'nom')
      this.paramUpdate('order', order, this.ordre)
    },

    paramUpdate(id, value, thisValue) {
      if (!value) {
        this.$refs.table.paramUpdate(id, thisValue)
        this.urlUpdate(id, thisValue)
      } else if (value !== thisValue) {
        this.$refs.table.paramUpdate(id, value)
        this.preferencesUpdate(id, value)
      }
    },

    preferencesUpdate(id, value) {
      this.$store.dispatch('user/preferenceSet', {
        section: 'titres.table.' + id,
        value: value
      })
    },

    urlUpdate(id, value) {
      this.urlParamSet(this.param[id], value.toString())

      if (id !== 'page') {
        this.preferencesUpdate(id, value)
      }
    },

    colonneIdCheck(colonnesIds) {
      if (!colonnesIds.includes(this.colonne)) {
        this.urlUpdate('column', 'nom')
        this.paramUpdate('column', 'nom')
      }
    }
  }
}
</script>
