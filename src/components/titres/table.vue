<template>
  <div>
    <div class="overflow-scroll-x mb">
      <table>
        <tr>
          <th />
          <th>Nom</th>
          <th>Type</th>
          <th>Statut</th>
          <th v-if="activitesCol">
            À traiter
          </th>
          <th>
            Titulaires
          </th>
          <th>Substances</th>
        </tr>

        <RouterLink
          v-for="titre in titresPages[pageActive]"
          :key="titre.id"
          :to="{ name: 'titre', params: { id: titre.id } }"
          tag="tr"
          class="tr-link"
        >
          <td>
            <Pill
              :color="`bg-title-domaine-${titre.domaine.id}`"
              class="mono"
            >
              {{ titre.domaine.id }}
            </Pill>
          </td>
          <td class="bold">
            {{ titre.nom }}
          </td>
          <td>
            <p class="cap-first h5 mb-0">
              {{ titre.type.nom }}
            </p>
          </td>
          <td>
            <Dot :color="`bg-${titre.statut.couleur}`" />
            <span class="cap-first h5 mb-0">
              {{ titre.statut.nom }}
            </span>
          </td>
          <td v-if="activitesCol">
            <Pill
              v-if="titreHasActivitesFind(titre.activites)"
              :color="'bg-error'"
              class="mb--xs"
            >
              {{ titreHasActivitesFind(titre.activites) }}
            </Pill>
          </td>
          <td
            v-if="titre.titulaires"
          >
            <p
              v-for="titulaire in titre.titulaires"
              :key="titulaire.id"
              class="h5 mb-0"
            >
              {{ titulaire.nom }}
            </p>
          </td>
          <td>
            <PillList
              v-if="titre.substances"
              :elements="titre.substances.map(s => s.nom)"
              class="mb--xs"
            />
          </td>
        </RouterLink>
      </table>
    </div>
    <div class="desktop-blobs">
      <div class="desktop-blob-3-4">
        <Pagination
          :page-active="pageActive"
          :pages-total="titresPages.length - 1"
          :pages-visible="5"
          @page-change="pageActiveUrlSet"
        />
      </div>
      <div class="desktop-blob-1-4">
        <PaginationRanges
          :ranges="pagesRanges"
          :range-active="pagesRange"
          @pages-range-change="pagesRangeChange"
        />
        <div class="hide">
          <Accordion class="mb">
            <template slot="title">
              Affichage
            </template>
            <ul class="list-sans px-m">
              <li
                v-for="colonne in colonnes"
                :key="colonne.type"
              >
                <label>
                  <input
                    type="checkbox"
                    class="mr-s"
                  > {{ colonne.name }}
                </label>
              </li>
            </ul>
          </Accordion>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PillList from '../ui/pill-list.vue'
import Pill from '../ui/pill.vue'
import Accordion from '../ui/accordion.vue'
import Dot from '../ui/dot.vue'
import Pagination from '../ui/pagination.vue'
import PaginationRanges from '../ui/pagination-ranges.vue'

export default {
  name: 'Titres',

  components: {
    PillList,
    Pill,
    Accordion,
    Dot,
    Pagination,
    PaginationRanges
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
    titresPages() {
      return this.titres.reduce((res, cur, i) => {
        const page = Math.ceil((i + 1) / this.pagesRange)

        res[page] = res[page] || []
        res[page].push(cur)
        return res
      }, [])
    },

    activitesCol() {
      return this.titres.find(t => this.titreHasActivitesFind(t.activites))
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
