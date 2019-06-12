<template>
  <div>
    <div class="overflow-scroll-x mb">
      <div class="table">
        <div class="tr">
          <div class="th">
            Prenom
          </div>
          <div class="th">
            Nom
          </div>
          <div class="th">
            Email
          </div>
          <div class="th">
            Permissions
          </div>
          <div class="th">
            Lien
          </div>
        </div>
        <RouterLink
          v-for="utilisateur in utilisateursPages[pageActive]"
          :key="utilisateur.id"
          :to="{ name: 'utilisateur', params: { id: utilisateur.id } }"
          class="tr tr-link text-decoration-none"
        >
          <div class="td">
            {{ utilisateur.prenom || "–" }}
          </div>
          <div class="td">
            {{ utilisateur.nom || "–" }}
          </div>
          <div class="td">
            <span class="h5">
              {{ utilisateur.email }}
            </span>
          </div>
          <div class="td">
            <Pill v-if="utilisateur.permission">
              {{ utilisateur.permission.nom }}
            </Pill>
          </div>
          <div class="td">
            <span
              v-if="utilisateur.entreprises && utilisateur.entreprises.length"
              class="h5 word-break"
            >
              {{ utilisateur.entreprises.map(({nom}) => nom).join(', ') }}
            </span>
          </div>
        </RouterLink>
      </div>
    </div>
    <div class="desktop-blobs">
      <div class="desktop-blob-3-4">
        <Pagination
          :page-active="pageActive"
          :pages-total="utilisateursPages.length - 1"
          :pages-visible="5"
          @page-change="pageChange"
        />
      </div>
      <div class="desktop-blob-1-4">
        <PaginationRanges
          :ranges="pagesRanges"
          :range-active="pagesRangeActive"
          @pages-range-change="pageRangeChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pill from '../ui/pill.vue'
import Pagination from '../ui/pagination.vue'
import PaginationRanges from '../ui/pagination-ranges.vue'

export default {
  name: 'Utilisateurs',

  components: {
    Pill,
    Pagination,
    PaginationRanges
  },

  props: {
    utilisateurs: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      pageActive: 1,
      pagesRanges: [10, 50, 200, this.utilisateurs.length],
      pagesRangeActive: 10
    }
  },

  computed: {
    utilisateursPages() {
      return this.utilisateurs.reduce((res, cur, i) => {
        const page = Math.ceil((i + 1) / this.pagesRangeActive)

        res[page] = res[page] || []
        res[page].push(cur)
        return res
      }, [])
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
    }
  }
}
</script>
