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
            <button class="btn-menu full-x p-0">
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
            <component :is="row.columns[col.id].component"
              v-if="row.columns[col.id] && row.columns[col.id].component && row.columns[col.id].slot"
              v-bind="row.columns[col.id].props"
              :class="row.columns[col.id].class"
            >{{ row.columns[col.id].value }}</component>
            <component :is="row.columns[col.id].component"
              v-else-if="row.columns[col.id] && row.columns[col.id].component"
              v-bind="row.columns[col.id].props"
              :class="row.columns[col.id].class"
            />
            <span
              v-else-if="row.columns[col.id] && row.columns[col.id].value"
              :class="row.columns[col.id].class"
              >{{ row.columns[col.id].value }}</span
            >
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiTable',

  props: {
    rows: { type: Array, required: true },
    columns: { type: Array, required: true },
    order: { type: String, default: 'asc' },
    column: { type: String, default: '' }
  },

  watch: {
    columns: 'columnInit'
  },

  methods: {
    update(params) {
      this.$emit('params-update', params)
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
