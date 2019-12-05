<template>
  <TitresTable
    ref="table"
    :titres="titres"
    @page:update="urlUpdate('page', $event)"
    @intervalle:update="urlUpdate('intervalle', $event)"
    @colonne:update="urlUpdate('colonne', $event)"
    @ordre:update="urlUpdate('ordre', $event)"
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
    preferences() {
      return this.$store.state.user.preferences.titres.table
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
        this.preferencesUpdate('intervalle', Number(to.query.intervalle))
      }

      if (!to.query.intervalle && !to.query.page) {
        this.init()
      }
    }
  },

  mounted() {
    this.init()
  },

  destroyed() {
    const query = Object.assign({}, this.$route.query)

    if (query.intervalle || query.page || query.ordre || query.colonne) {
      if (query.intervalle) {
        delete query.intervalle
      }

      if (query.page) {
        delete query.page
      }

      if (query.colonne) {
        delete query.colonne
      }

      if (query.ordre) {
        delete query.ordre
      }

      this.$router.replace({ query })
    }
  },

  methods: {
    init() {
      const update = (id, urlValue) => {
        if (!urlValue) {
          this.$refs.table.update(id, this.preferences[id])
          this.urlUpdate(id, this.preferences[id])
        } else if (urlValue !== this.preferences[id]) {
          this.$refs.table.update(id, urlValue)
          this.preferencesUpdate(id, urlValue)
        }
      }

      const page = this.$route.query.page && Number(this.$route.query.page)
      const intervalle =
        this.$route.query.intervalle && Number(this.$route.query.intervalle)
      const colonne = this.$route.query.colonne
      const ordre = this.$route.query.ordre

      update('page', page)
      update('intervalle', intervalle)
      update('colonne', colonne)
      update('ordre', ordre)
    },

    preferencesUpdate(id, value) {
      this.$store.dispatch('user/preferenceSet', {
        section: `titres.table.${id}`,
        value
      })
    },

    urlUpdate(id, value) {
      this.urlParamSet(id, value.toString())
    }
  }
}
</script>
