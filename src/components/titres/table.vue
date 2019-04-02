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
          @page-change="pageChange"
        />
      </div>
      <div class="desktop-blob-1-4">
        <PaginationRanges
          :ranges="pagesRanges"
          :range-active="pagesRangeActive"
          @page-range-change="pageRangeChange"
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
      pageActive: 1,
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
      ],
      pagesRanges: [10, 50, 200, this.titres.length],
      pagesRangeActive: 10
    }
  },

  computed: {
    titresPages() {
      return this.titres.reduce((res, cur, i) => {
        const page = Math.ceil((i + 1) / this.pagesRangeActive)

        res[page] = res[page] || []
        res[page].push(cur)
        return res
      }, [])
    },
    activitesCol() {
      return this.titres.find(t => this.titreHasActivitesFind(t.activites))
    }
  },

  created() {
    if (this.$route.query.pages) {
      this.pagesRangeActive = Number(this.$route.query.pages)
    }

    if (this.$route.query.page) {
      this.pageActive = Number(this.$route.query.page)
    }
  },

  methods: {
    pageChange(page) {
      this.pageActive = page
      const query = Object.assign({}, this.$route.query, { page })
      this.$router.push({ query })
    },
    pageRangeChange(pages) {
      this.pagesRangeActive = Number(pages)
      this.pageChange(1)
      const query = Object.assign({}, this.$route.query, { pages })
      this.$router.push({ query })
    },
    titreHasActivitesFind(titreActivites) {
      return titreActivites.filter(
        e => e.statut.couleur === 'error' || e.statut.couleur === 'warning'
      ).length
    }
  }
}
</script>
