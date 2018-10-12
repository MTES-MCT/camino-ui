<template>
  <div>
    <div class="overflow-scroll-x mb">
      <table>
        <tr>
          <th>Id</th>
          <th>Nom</th>
          <th>Prenom</th>
          <th>Email</th>
          <th>Permissions</th>
        </tr>
        <router-link
          v-for="utilisateur in utilisateursPages[pageActive]"
          :key="utilisateur.id"
          :to="{ name: 'utilisateur', params: { id: utilisateur.id }}"
          tag="tr"
          class="tr-link"
        >
          <td class="bold">{{ utilisateur.id }}</td>
          <td>{{ utilisateur.nom }}</td>
          <td>{{ utilisateur.prenom }}</td>
          <td>{{ utilisateur.email }}</td>
          <td>
            <pill-list 
              :elements="utilisateur.permissions.map(p => p.nom)" 
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
          :pages-total="utilisateursPages.length - 1"
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
      </div>
    </div>
  </div>
</template>

<script>
import PillList from '../ui/pill-list.vue'
import Pagination from '../ui/pagination.vue'
import PaginationRanges from '../ui/pagination-ranges.vue'

export default {
  name: 'Utilisateurs',

  components: {
    PillList,
    Pagination,
    PaginationRanges
  },

  props: {
    utilisateurs: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      pageActive: 1,
      pagesRanges: [10, 50, 200, this.utilisateurs.length],
      pagesRangeActive: 10
    }
  },

  computed: {
    utilisateursPages () {
      return this.utilisateurs.reduce((res, cur, i) => {
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
