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
            @click="sort(col.id)"
          >
            <button class="btn-transparent full-x p-0">
              {{ col.name || (sortColumn === col.id ? '' : '–') }}
              <i
                v-if="sortColumn === col.id"
                class="icon-24 right"
                :class="{
                  'icon-chevron-b': sortOrder === 'asc',
                  'icon-chevron-t': sortOrder === 'desc'
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
              v-if="
                element.columns[col.id] && element.columns[col.id].component
              "
              v-bind="element.columns[col.id].props"
              :class="element.columns[col.id].class"
            />
            <span
              v-else-if="
                element.columns[col.id] && element.columns[col.id].value
              "
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
          @page:update="pageUpdateEvent"
        />
      </div>
      <div class="desktop-blob-1-4">
        <Ranges
          v-if="elements.length > 10"
          :ranges="ranges"
          :range="range"
          @range:update="rangeUpdateEvent"
        />
        <Columns
          :columns="columns"
          class="hide"
          @columns:update="columnsUpdateEvent"
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
      sortOrder: 'asc',
      sortColumn: this.columns[0].id
    }
  },

  computed: {
    elementsSorted() {
      const id = this.sortColumn
      return this.elements.slice().sort((a, b) => {
        const aValue = a.columns[id].value.toString()
        const bValue = b.columns[id].value.toString()
        return (
          aValue.localeCompare(bValue, 'fr') *
          (this.sortOrder === 'asc' ? 1 : -1)
        )
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
      this.paramUpdate('page', page)
      this.$emit('page:update', page)
    },

    rangeUpdateEvent(range) {
      this.paramUpdate('range', range)
      this.paramUpdate('page', 1)
      this.$emit('range:update', range)
      this.$emit('page:update', 1)
    },

    columnsUpdateEvent(columnIds) {
      console.log(columnIds)
    },

    paramUpdate(id, value) {
      if (id === 'page') {
        this.page = value
      }
      if (id === 'range') {
        this.range = Number(value)
      }
      if (id === 'column') {
        this.sortColumn = value
      }
      if (id === 'order') {
        this.sortOrder = value
      }
    },

    sort(colIndex) {
      if (this.sortColumn === colIndex) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortColumn = colIndex
      }
      this.$emit('column:update', this.sortColumn)
      this.$emit('order:update', this.sortOrder)
      this.pageUpdateEvent(1)
    }
  }
}
</script>
