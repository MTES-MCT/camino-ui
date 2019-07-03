<template>
  <div>
    {{ entreprises.length }}
    <div class="overflow-scroll-x mb">
      <div class="table">
        <div class="tr">
          <div class="th">
            Nom
          </div>
          <div class="th">
            Siren
          </div>
        </div>
        <RouterLink
          v-for="entreprise in entreprisesPages[pageActive]"
          :key="entreprise.id"
          :to="{ name: 'entreprise', params: { id: entreprise.id } }"
          class="tr tr-link text-decoration-none"
        >
          <div class="td">
            {{ entreprise.nom || "–" }}
          </div>
          <div class="td">
            {{ entreprise.legalEtranger || entreprise.legalSiren || "–" }}
          </div>
        </RouterLink>
      </div>
    </div>
    <div class="desktop-blobs">
      <div class="desktop-blob-3-4">
        <Pagination
          :page-active="pageActive"
          :pages-total="entreprisesPages.length - 1"
          :pages-visible="5"
          @page-change="pageChange"
        />
      </div>
      <div class="desktop-blob-1-4">
        <PaginationRanges
          :ranges="pagesRanges"
          :range-active="pagesRange"
          @pages-range-change="pageRangeChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '../ui/pagination.vue'
import PaginationRanges from '../ui/pagination-ranges.vue'

export default {
  name: 'Entreprises',

  components: {
    Pagination,
    PaginationRanges
  },

  props: {
    entreprises: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      pageActive: 1,
      pagesRanges: [10, 50, 200, 500],
      pagesRange: 200
    }
  },

  computed: {
    entreprisesPages() {
      return this.entreprises.reduce((res, cur, i) => {
        const page = Math.ceil((i + 1) / this.pagesRange)

        res[page] = res[page] || []
        res[page].push(cur)
        return res
      }, [])
    }
  },

  created() {
    if (this.$route.query.pages) {
      this.pagesRange = Number(this.$route.query.pages)
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
      this.pagesRange = Number(pages)
      this.pageChange(1)
      const query = Object.assign({}, this.$route.query, { pages })
      this.$router.push({ query })
    }
  }
}
</script>
