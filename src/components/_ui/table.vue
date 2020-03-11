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
              {{ col.name || (params.column === col.id ? '' : '–') }}
              <i
                v-if="params.column === col.id"
                class="icon-24 right"
                :class="{
                  'icon-chevron-b': params.order === 'asc',
                  'icon-chevron-t': params.order === 'desc'
                }"
              />
            </button>
          </div>
        </div>

        <RouterLink
          v-for="element in rowsPages[params.page - 1]"
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
          :page-active="params.page"
          :pages-total="rowsPages.length"
          :pages-visible="5"
          @page:update="pageUpdate"
        />
      </div>
      <div class="desktop-blob-1-4">
        <Ranges
          v-if="rows.length > 10"
          :ranges="ranges"
          :range="params.range"
          @range:update="rangeUpdate"
        />
        <Columns
          :columns="columns"
          class="hide"
          @columns:update="columnsUpdate"
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
  name: 'UiTable',

  components: {
    Accordion,
    Pagination,
    Ranges,
    Columns
  },

  props: {
    rows: {
      type: Array,
      default: () => []
    },

    columns: {
      type: Array,
      default: () => []
    },

    sorted: {
      type: Boolean,
      default: false
    },

    params: {
      type: Object,
      default: () => ({
        range: 200,
        page: 1,
        order: 'asc',
        column: this.columns[0].id
      })
    },

    ranges: {
      type: Array,
      default: () => [10, 50, 200, 500]
    }
  },

  computed: {
    rowsSorted() {
      return this.rows.slice().sort((a, b) => {
        const aValue = a.columns[this.params.column].value.toString()
        const bValue = b.columns[this.params.column].value.toString()

        return (
          aValue.localeCompare(bValue, 'fr') *
          (this.params.order === 'asc' ? 1 : -1)
        )
      })
    },

    rowsPages() {
      return this.rowsSorted.reduce((res, cur, i) => {
        const page = Math.ceil((i + 1) / this.params.range) - 1

        res[page] = res[page] || []
        res[page].push(cur)

        return res
      }, [])
    }
  },

  watch: {
    columns: 'columnInit'
  },

  methods: {
    pageUpdate(page) {
      this.update({ page })
    },

    rangeUpdate(range) {
      this.update({ range, page: 1 })
    },

    columnsUpdate(columnIds) {
      console.log(columnIds)
    },

    update(params) {
      this.$emit('params:update', params)
    },

    sort(colId) {
      if (this.params.column === colId) {
        const order = this.params.order === 'asc' ? 'desc' : 'asc'
        this.update({ order, page: 1 })
      } else {
        const column = colId
        this.update({ column, page: 1 })
      }
    },

    columnInit() {
      if (
        this.rows.length &&
        !this.columns.some(c => c.id === this.params.column)
      ) {
        this.sort(this.columns[0].id)
      }
    }
  }
}
</script>
