<template>
  <div>
    <div class="overflow-scroll-x mb">
      <table>
        <tr>
          <th />
          <th>Nom</th>
          <th class="hide">Titulaires</th>
          <th>Type</th>
          <th>Statut</th>
          <th>Substances</th>
        </tr>
        <router-link
          v-for="titre in titresPages[pageActive]"
          :key="titre.id"
          :to="{ name: 'titre', params: { id: titre.id }}"
          tag="tr"
          class="tr-link"
        >
          <td>
            <pill
              :color="`bg-title-domain-${titre.domaine.id}`"
              class="mono"
            >{{ titre.domaine.id }}</pill>
          </td>
          <td class="bold">{{ titre.nom }}</td>
          <td 
            v-if="titre.titulaires" 
            class="hide"
          >
            <div
              v-for="titulaire in titre.titulaires"
              :key="titulaire.id"
            >
              {{ titulaire.nom }}
            </div>
          </td>
          <td>{{ titre.type.nom }}</td>
          <td><dot :color="`bg-${titre.statut.couleur}`" />{{ titre.statut.nom }}</td>
          <td>
            <pill-list
              v-if="titre.substancesPrincipales"
              :elements="titre.substancesPrincipales.map(s=>s.legal.nom)"
              class="mb--xs"
            />
          </td>
        </router-link>
      </table>
    </div>
    <div class="desktop-blobs">
      <div class="desktop-blob-3-4">
        <pagination
          :page-active="pageActive"
          :pages-total="titresPages.length - 1"
          :pages-visible="5"
          @page-change="pageChange"
        />
      </div>
      <div class="desktop-blob-1-4">
        <pagination-ranges 
          :ranges="pagesRanges" 
          :range-active="pagesRangeActive"
          @page-range-change="pageRangeChange"
        />
          
        <accordion class="mb hide">
          <template slot="title">Affichage</template>
          <ul class="list-sans">
            <li
              v-for="colonne in colonnes"
              :key="colonne.type"
            >
              <label>
                <input
                  type="checkbox"
                  class="mr-s"
                >
                {{ colonne.name }}
              </label>
            </li>
          </ul>
        </accordion>
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

  data () {
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
    titresPages () {
      return this.titres.reduce((res, cur, i) => {
        const page = Math.ceil((i + 1) / this.pagesRangeActive)

        res[page] = res[page] || []
        res[page].push(cur)
        return res
      }, [])
    }
  },

  created () {
    if (this.$route.query.pages) {
      this.pagesRangeActive = Number(this.$route.query.pages)
    }

    if (this.$route.query.page) {
      this.pageActive = Number(this.$route.query.page)
    }
  },

  methods: {
    pageChange (page) {
      this.pageActive = page
      const query = Object.assign({}, this.$route.query, { page })
      this.$router.push({ query })
    },
    pageRangeChange (pages) {
      this.pagesRangeActive = Number(pages)
      this.pageChange(1)
      const query = Object.assign({}, this.$route.query, { pages })
      this.$router.push({ query })
    }
  }
}
</script>
