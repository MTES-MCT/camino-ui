<template>
  <ul 
    v-if="pagesTotal > 1" 
    class="list-inline"
  >
    <li class="mb-0 mr-xs">
      <button
        :disabled="pageActive === 1"
        class="btn-border rnd-xs px-m py-s"
        @click="pageChange(1)"
      >«
      </button>
    </li>
    <li class="mb-0 mr-xs">
      <button
        :disabled="pageActive === 1"
        class="btn-border rnd-xs px-m py-s"
        @click="pageChange(pageActive - 1)"
      >‹
      </button>
    </li>
    <li 
      v-if="pageActive > delta + 1" 
      class="mb-0 mr-xs"
    >
      <div class="px-m py-s">…</div>
    </li>
    <li
      v-for="page in pages"
      :key="page"
      :class="{ active: pageActive === page }"
      class="mb-0 mr-xs"
    >
      <button
        class="btn-border rnd-xs px-m py-s"
        @click="pageChange(page)"
      >{{ page }}
      </button>
    </li>
    <li 
      v-if="pageActive < pagesTotal - delta" 
      class="mb-0 mr-xs"
    ><div class="px-m py-s">…</div>
    </li>
    <li class="mb-0 mr-xs">
      <button
        :disabled="pageActive === pagesTotal"
        class="btn-border rnd-xs px-m py-s"
        @click="pageChange(pageActive + 1)"
      >› 
      </button>
    </li>
    <li class="mb-0 mr-xs">
      <button
        :disabled="pageActive === pagesTotal"
        class="btn-border rnd-xs px-m py-s"
        @click="pageChange(pagesTotal)"
      >»
      </button>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'UiPagination',

  props: {
    pagesTotal: {
      type: Number,
      default: 2
    },
    pageActive: {
      type: Number,
      default: 1
    },
    pagesVisible: {
      type: Number,
      default: 1
    }
  },

  computed: {
    delta () {
      return Math.round((this.pagesVisible - 1) / 2)
    },
    pages () {
      let filter
      if (this.pageActive <= this.delta) {
        filter = n => n <= (this.delta * 2 + 1)
      } else if (this.pageActive >= this.pagesTotal - this.delta) {
        filter = n => n >= this.pagesTotal - (this.delta * 2)
      } else {
        filter = n => n >= this.pageActive - this.delta && n <= this.pageActive + this.delta
      }
      return Array.from(Array(this.pagesTotal).keys()).map(n => n + 1).filter(filter)
    }
  },

  methods: {
    pageChange (page) {
      this.$emit('page-change', page)
    }
  }
}
</script>
