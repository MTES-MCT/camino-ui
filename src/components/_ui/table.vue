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
              {{ col.name || (column === col.id ? '' : '–') }}
              <i
                v-if="column === col.id"
                class="icon-24 right"
                :class="{
                  'icon-chevron-b': order === 'asc',
                  'icon-chevron-t': order === 'desc'
                }"
              />
            </button>
          </div>
        </div>

        <RouterLink
          v-for="row in rows"
          :key="row.id"
          :to="row.link"
          class="tr tr-link text-decoration-none"
        >
          <div
            v-for="col in columns"
            :key="col.id"
            class="td"
            :class="col.class"
          >
            <component
              :is="row.columns[col.id].component"
              v-if="row.columns[col.id] && row.columns[col.id].component"
              v-bind="row.columns[col.id].props"
              :class="row.columns[col.id].class"
            />
            <span
              v-else-if="row.columns[col.id] && row.columns[col.id].value"
              :class="row.columns[col.id].class"
            >{{ row.columns[col.id].value }}</span>
          </div>
        </RouterLink>
      </div>
    </div>
    <div class="desktop-blobs">
      <div class="desktop-blob-3-4">
        <Pagination
          :page-active="page"
          :pages-total="pages"
          :pages-visible="5"
          @page:update="pageUpdate"
        />
      </div>
      <div class="desktop-blob-1-4">
        <Ranges
          v-if="rows.length > 10"
          :ranges="ranges"
          :range="range"
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
    rows: { type: Array, required: true },
    columns: { type: Array, required: true },
    range: { type: Number, default: 200 },
    page: { type: Number, default: 1 },
    pages: { type: Number, default: 1 },
    order: { type: String, default: 'asc' },
    column: { type: String, default: '' },
    ranges: { type: Array, default: () => [10, 50, 200, 500] }
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
      if (this.column === colId) {
        const order = this.order === 'asc' ? 'desc' : 'asc'
        this.update({ order, page: 1 })
      } else {
        this.update({ column: colId, page: 1 })
      }
    },

    columnInit() {
      if (this.rows.length && !this.columns.some(c => c.id === this.column)) {
        this.sort(this.columns[0].id)
      }
    }
  }
}
</script>
