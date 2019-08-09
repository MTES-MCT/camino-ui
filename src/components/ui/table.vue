<template>
  <div>
    <div class="overflow-scroll-x mb">
      <div class="table">
        <div class="tr">
          <div
            v-for="col in columns"
            :key="col.id"
            class="th nowrap"
            :class="col.class"
          >
            {{ col.name }}
          </div>
        </div>

        <RouterLink
          v-for="element in elementsPages[page - 1]"
          :key="element.id"
          :to="element.link"
          class="tr tr-link text-decoration-none"
        >
          <div
            v-for="col in columns"
            :key="col.id"
            class="td"
            :class="col.class"
          >
            <component
              :is="element.columns[col.id].component"
              v-if="element.columns[col.id] && element.columns[col.id].component"
              v-bind="element.columns[col.id].props"
              :class="element.columns[col.id].class"
            />
            <span v-else>{{ element.columns[col.id] }}</span>
          </div>
        </RouterLink>
      </div>
    </div>
    <div class="desktop-blobs">
      <div class="desktop-blob-3-4">
        <Pagination
          :page-active="page"
          :pages-total="elementsPages.length - 1"
          :pages-visible="5"
          @update:page="pageUpdateEvent"
        />
      </div>
      <div class="desktop-blob-1-4">
        <PaginationRanges
          :ranges="ranges"
          :range="range"
          @update:range="rangeUpdateEvent"
        />
        <div class="hide">
          <Accordion class="mb">
            <template slot="title">
              Affichage
            </template>
            <ul class="list-sans px-m">
              <li
                v-for="colonne in columns"
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
      ranges: [10, 50, 200, 500],
      range: 200,
      page: 1
    }
  },

  computed: {
    elementsPages() {
      return this.elements.reduce((res, cur, i) => {
        const page = Math.ceil((i + 1) / this.range) - 1

        res[page] = res[page] || []
        res[page].push(cur)

        return res
      }, [])
    }
  },

  methods: {
    pageUpdateEvent(page) {
      this.pageUpdate(page)
      this.$emit('update:page', page)
    },

    rangeUpdateEvent(range) {
      this.rangeUpdate(range)
      this.pageUpdate(1)
      this.$emit('update:range', range)
      this.$emit('update:page', 1)
    },

    pageUpdate(page) {
      this.page = page
    },

    rangeUpdate(range) {
      this.range = Number(range)
    }
  }
}
</script>
