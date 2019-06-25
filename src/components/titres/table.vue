<template>
  <div>
    <div class="overflow-scroll-x mb">
      <div class="table">
        <div class="tr">
          <div class="th" />
          <div class="th">
            Nom
          </div>
          <div class="th">
            Type
          </div>
          <div class="th">
            Statut
          </div>
          <div
            v-if="activitesCol"
            class="th"
          >
            À traiter
          </div>
          <div class="th">
            Titulaires
          </div>
          <div class="th">
            Substances
          </div>
        </div>

        <RouterLink
          v-for="titre in titresPages[pageActive]"
          :key="titre.id"
          :to="{ name: 'titre', params: { id: titre.id } }"
          class="tr tr-link text-decoration-none"
        >
          <div class="td">
            <Pill
              :color="`bg-titre-domaine-${titre.domaine.id}`"
              class="mono"
            >
              {{ titre.domaine.id }}
            </Pill>
          </div>
          <div class="td bold">
            {{ titre.nom }}
          </div>
          <div class="td">
            <p class="cap-first h5 mb-0">
              {{ titre.type.nom }}
            </p>
          </div>
          <div class="td">
            <Dot :color="`bg-${titre.statut.couleur}`" />
            <span class="cap-first h5 mb-0">
              {{ titre.statut.nom }}
            </span>
          </div>
          <div
            v-if="activitesCol"
            class="td"
          >
            <ul class="list-inline mb--xs">
              <li
                v-if="titre.activitesAbsentes"
                class="mr-xs"
              >
                <Pill
                  :color="'bg-error'"
                >
                  {{ titre.activitesAbsentes }}
                </Pill>
              </li>
              <li
                v-if="titre.activitesEnConstruction"
                class="mr-xs"
              >
                <Pill
                  :color="'bg-warning'"
                >
                  {{ titre.activitesEnConstruction }}
                </Pill>
              </li>
            </ul>
          </div>
          <div
            v-if="titre.titulaires"
            class="td"
          >
            <p
              v-for="titulaire in titre.titulaires"
              :key="titulaire.id"
              class="h5 mb-0"
            >
              {{ titulaire.nom }}
            </p>
          </div>
          <div class="td">
            <PillList
              v-if="titre.substances"
              :elements="titre.substances.map(s => s.nom)"
              class="mb--xs"
            />
          </div>
        </RouterLink>
      </div>
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
      return this.titres.some(
        t => t.activitesAbsentes || t.activitesEnConstruction
      )
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
