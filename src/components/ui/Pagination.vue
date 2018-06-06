<template>
  <ul class="list-inline">
    <li
      v-for="page in pages"
      :key="page"
      :class="{ active: pageActive === page }"
      class="mb-0">
      <button
        class="btn-border px-m py-s"
        @click="$emit('page-change', page)">
        {{ page }}
      </button>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'UiPagination',

  props: {
    titres: {
      type: Array,
      default: () => []
    },
    pagesLength: {
      type: Number,
      default: 2
    },
    pageActive: {
      type: Number,
      default: 1
    }
  },

  data () {
    return {
      delta: 2

    }
  },

  computed: {
    pages () {
      return Array.from(Array(this.pagesLength).keys()).map(n => n + 1)
    },

    ellipsis () {
      return this.pagesLength > this.delta * 2 + 3
    },

    pagesVisibles () {
      // if (this.ellipsis) {
      //   const prev = this.pageCurrent - this.delta

      //   const next = this.pageCurrent + this.delta

      // }
      // return this.pages.reduce((res, cur) => {

      // }, [])
      return this.pages
    }
  }
}
</script>
