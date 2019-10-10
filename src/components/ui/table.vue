<template>
  <div>
    <div class="overflow-scroll-x mb">
      <div class="table">
        <div class="tr">
          <div
            v-for="(col, index) in columns"
            :key="col.id"
            class="th nowrap"
            :class="col.class"
            @click="sort(index)"
          >
            <button
              class="btn-transparent full-x p-0"
            >
              {{ col.name || (sortColumn === index ? '' : '–') }}
              <i
                v-if="sortColumn === index"
                class="icon-24 right"
                :class="{
                  'icon-chevron-b': sortOrder > 0 ,
                  'icon-chevron-t': sortOrder < 0
                }"
              />
            </button>
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
            <span
              v-else-if="element.columns[col.id] && element.columns[col.id].value"
              :class="element.columns[col.id].class"
            >{{ element.columns[col.id].value }}</span>
          </div>
        </RouterLink>
      </div>
    </div>
    <div class="desktop-blobs">
      <div class="desktop-blob-3-4">
        <Pagination
          :page-active="page"
          :pages-total="elementsPages.length"
          :pages-visible="5"
          @update:page="pageUpdateEvent"
        />
      </div>
      <div class="desktop-blob-1-4">
        <Ranges
          v-if="elements.length > 10"
          :ranges="ranges"
          :range="range"
          @update:range="rangeUpdateEvent"
        />
        <Columns
          :columns="columns"
          class="hide"
          @update:columns="columnsUpdateEvent"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Accordion from './accordion.vue'
import Pagination from './pagination.vue'
import Ranges from './ranges.vue'
import Columns from './columns.vue'

export default {
  name: 'Titres',

  components: {
    Accordion,
    Pagination,
    Ranges,
    Columns
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
      page: 1,
      sortOrder: 1,
      sortColumn: 0
    }
  },

  computed: {
    elementsSorted() {
      const id = this.columns[this.sortColumn].id
      return this.elements.slice().sort((a, b) => {
        const aValue = a.columns[id].value.toString()
        const bValue = b.columns[id].value.toString()
        return aValue.localeCompare(bValue, 'fr') * this.sortOrder
      })
    },

    elementsPages() {
      return this.elementsSorted.reduce((res, cur, i) => {
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

    columnsUpdateEvent(columnIds) {
      console.log(columnIds)
    },

    pageUpdate(page) {
      this.page = page
    },

    rangeUpdate(range) {
      this.range = Number(range)
    },

    sort(colIndex) {
      if (this.sortColumn === colIndex) {
        this.sortOrder = -this.sortOrder
      } else {
        this.sortColumn = colIndex
      }
      this.pageUpdate(1)
      this.$emit('update:page', 1)
    }
  }
}
</script>
