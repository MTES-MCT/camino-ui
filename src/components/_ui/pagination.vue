<template>
  <ul v-if="total > 1" class="list-inline">
    <li class="mr-xs">
      <button
        :disabled="active === 1"
        class="btn-border rnd-xs px-m py-s"
        @click="pageChange(1)"
      >
        «
      </button>
    </li>
    <li class="mr-xs">
      <button
        :disabled="active === 1"
        class="btn-border rnd-xs px-m py-s"
        @click="pageChange(active - 1)"
      >
        ‹
      </button>
    </li>
    <li v-if="active > delta + 1" class="mr-xs">
      <div class="px-m py-s">
        …
      </div>
    </li>
    <li
      v-for="page in pages"
      :key="page"
      :class="{ active: active === page }"
      class="mr-xs"
    >
      <button class="btn-border rnd-xs px-m py-s" @click="pageChange(page)">
        {{ page }}
      </button>
    </li>
    <li v-if="active < total - delta" class="mr-xs">
      <div class="px-m py-s">
        …
      </div>
    </li>
    <li class="mr-xs">
      <button
        :disabled="active === total"
        class="btn-border rnd-xs px-m py-s"
        @click="pageChange(active + 1)"
      >
        ›
      </button>
    </li>
    <li class="mr-xs">
      <button
        :disabled="active === total"
        class="btn-border rnd-xs px-m py-s"
        @click="pageChange(total)"
      >
        »
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'UiPagination',

  props: {
    total: { type: Number, default: 2 },
    active: { type: Number, default: 1 },
    visibles: { type: Number, default: 1 }
  },

  computed: {
    delta() {
      return Math.round((this.visibles - 1) / 2)
    },
    pages() {
      let filter
      if (this.active <= this.delta) {
        filter = n => n <= this.delta * 2 + 1
      } else if (this.active >= this.total - this.delta) {
        filter = n => n >= this.total - this.delta * 2
      } else {
        filter = n =>
          n >= this.active - this.delta && n <= this.active + this.delta
      }
      return Array.from(Array(this.total).keys())
        .map(n => n + 1)
        .filter(filter)
    }
  },

  methods: {
    pageChange(page) {
      this.$emit('page:update', page)
    }
  }
}
</script>
