<template>
  <div>
    <div class="overflow-scroll-x mb">
      <div class="table">
        <div class="tr">
          <div class="th" />
          <div
            v-for="col in columns"
            :key="col.name"
            class="th"
          >
            {{ col }}
          </div>
        </div>

        <RouterLink
          v-for="element in elementsPages[pageActive]"
          :key="element.id"
          :to="element.link"
          class="tr tr-link text-decoration-none"
        >
          <div
            v-for="col in columns"
            :key="col"
            class="td"
          >
            <component
              :is="element.columns[col].component"
              v-if="element.columns[col].component"
              v-bind="element.columns[col].props"
              :class="element.columns[col].class"
            />
            <span v-else>{{ element.columns[col] }}</span>
          </div>
        </RouterLink>
      </div>
    </div>
    <div class="desktop-blobs">
      <div class="desktop-blob-3-4">
        <Pagination
          :page-active="pageActive"
          :pages-total="elementsPages.length - 1"
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
import Accordion from './accordion.vue'
import Pagination from './pagination.vue'
import PaginationRanges from './pagination-ranges.vue'

export default {
  name: 'Titres',

  components: {
    Accordion,
    Pagination,
    PaginationRanges
  },

  props: {
    elements: {
      type: Array,
      default: () => []
    },

    columns: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      pagesRanges: [10, 50, 200, 500]
    }
  },

  computed: {
    elementsPages() {
      return this.elements.reduce((res, cur, i) => {
        const page = Math.ceil((i + 1) / this.pagesRange)

        res[page] = res[page] || []
        res[page].push(cur)

        return res
      }, [])
    },

    pageActive() {
      return this.$store.state.user.preferences.elements.pageActive
    },

    pagesRange() {
      return this.$store.state.user.preferences.elements.pagesRange
    }
  },

  methods: {
    pageActiveSet(pageActive) {
      this.$store.dispatch('user/preferenceSet', {
        section: 'elements.pageActive',
        value: pageActive
      })
    },

    pagesRangeSet(pagesRange) {
      this.$store.dispatch('user/preferenceSet', {
        section: 'elements.pagesRange',
        value: pagesRange
      })
    },

    pagesRangeChange(pagesRange) {
      this.pagesRangeUrlSet(pagesRange)
      this.pageActiveUrlSet(1)
    },

    pagesRangeUrlSet(pagesRange) {
      this.urlParamSet('pages', pagesRange)
    }
  }
}
</script>
