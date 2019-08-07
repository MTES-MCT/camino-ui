<template>
  <Table
    :elements="titresElements"
    :columns="colonnes"
  />
</template>

<script>
import Vue from 'vue'
import Table from '../ui/table.vue'
import PillList from '../ui/pill-list.vue'
import Pill from '../ui/pill.vue'
import Dot from '../ui/dot.vue'

export default {
  name: 'Titres',

  components: {
    Table
  },

  props: {
    titres: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      pagesRanges: [10, 50, 200, 500],
      colonnes: [
        {
          type: 'domain',
          name: 'Domaine'
        },
        {
          type: 'name',
          name: 'Nom'
        },
        {
          type: 'owner',
          name: 'Titulaires'
        },
        {
          type: 'type',
          name: 'Type'
        },
        {
          type: 'status',
          name: 'Statut'
        },
        {
          type: 'substances',
          name: 'Substances'
        }
      ]
    }
  },

  computed: {
    activteCol() {
      return this.titres.some(
        t => t.activitesAbsentes || t.activitesEnConstruction
      )
    },

    titresElements() {
      return this.titres.map(titre => {
        const columns = {
          domaine: {
            component: Pill,
            props: {
              color: `bg-titre-domaine-${titre.domaine.id}`
            },
            class: 'mono'
          },
          nom: titre.nom,
          titulaires: titre.type.nom,
          type: titre.type.nom,
          statuts: {
            component: {
              components: { Dot },
              props: {
                dotColor: { type: String, default: 'bg-text' }
              },
              template: `<div>
<Dot :color="dotColor" />
<span class="cap-first h5 mb-0">
  {{ titre.statut.nom }}
</span>
</div>`
            },
            props: { dotColor: `bg-${titre.statut.couleur}` }
          },
          substances: {
            component: PillList,
            props: {
              elements: titre.substances.map(s => s.nom)
            },
            class: 'mb--xs'
          }
        }

        if (this.activteCol) {
          columns.actvivites = {
            component: Vue.component('ActivitesPill', {
              components: { Pill },
              props: {
                activitesAbsentes: { type: Number, default: 0 },
                activitesEnConstruction: { type: Number, default: 0 }
              },
              template: `<ul class="list-inline mb--xs">
  <li
    v-if="activitesAbsentes"
    class="mr-xs"
  >
    <Pill
      :color="'bg-error'"
    >
      {{ activitesAbsentes }}
    </Pill>
  </li>
  <li
    v-if="activitesEnConstruction"
    class="mr-xs"
  >
    <Pill
      :color="'bg-warning'"
    >
      {{ activitesEnConstruction }}
    </Pill>
  </li>
</ul>`
            })
          }
        }

        return {
          id: titre.id,
          link: { name: 'titre', params: { id: titre.id } },
          columns
        }
      })
    },

    titresPages() {
      return this.titres.reduce((res, cur, i) => {
        const page = Math.ceil((i + 1) / this.pagesRange)

        res[page] = res[page] || []
        res[page].push(cur)
        return res
      }, [])
    },

    pageActive() {
      return this.$store.state.user.preferences.titres.pageActive
    },

    pagesRange() {
      return this.$store.state.user.preferences.titres.pagesRange
    }
  },

  watch: {
    titres: function(to, from) {
      if (from.length && from.length !== to.length) {
        this.pageActiveUrlSet(1)
      }
    },

    $route: function(to, from) {
      if (to.query.page && to.query.page !== from.query.page) {
        this.pageActiveSet(Number(to.query.page))
      }

      if (to.query.pages && to.query.pages !== from.query.pages) {
        this.pagesRangeSet(Number(to.query.pages))
      }

      if (!to.query.pages && !to.query.page) {
        this.init()
      }
    }
  },

  created() {
    this.init()
  },

  destroyed() {
    const query = Object.assign({}, this.$route.query)
    delete query.pages
    delete query.page

    this.$router.replace({ query })
  },

  methods: {
    init() {
      const pageActive =
        this.$route.query.page && Number(this.$route.query.page)
      const pagesRange =
        this.$route.query.pages && Number(this.$route.query.pages)

      if (pageActive && pageActive !== this.pageActive) {
        this.pageActiveSet(pageActive)
      }

      if (!pageActive) {
        this.pageActiveUrlSet(this.pageActive)
      }

      if (pagesRange && pagesRange !== this.pagesRange) {
        this.pagesRangeSet(pagesRange)
      }

      if (!pagesRange) {
        this.pagesRangeUrlSet(this.pagesRange)
      }
    },

    pageActiveSet(pageActive) {
      this.$store.dispatch('user/preferenceSet', {
        section: 'titres.pageActive',
        value: pageActive
      })
    },

    pageActiveUrlSet(pageActive) {
      this.urlParamSet('page', pageActive)
    },

    pagesRangeSet(pagesRange) {
      this.$store.dispatch('user/preferenceSet', {
        section: 'titres.pagesRange',
        value: pagesRange
      })
    },

    pagesRangeChange(pagesRange) {
      this.pagesRangeUrlSet(pagesRange)
      this.pageActiveUrlSet(1)
    },

    pagesRangeUrlSet(pagesRange) {
      this.urlParamSet('pages', pagesRange)
    },

    titreHasActivitesFind(titreActivites) {
      return titreActivites.filter(
        e => e.statut.couleur === 'error' || e.statut.couleur === 'warning'
      ).length
    }
  }
}
</script>
