<template>
  <Loader v-if="!loaded" />
  <Card v-else>
    <div class="flex">
      <h2 class="mt-s">
        Titres miniers
      </h2>
      <ul class="list-inline flex-right">
        <li
          v-for="view in views"
          :key="view.id"
          class="mr-0 pill-list"
          :class="{ active: viewId === view.id }"
        >
          <button
            class="btn-border px-m py-s"
            @click="viewSet(view.id)"
          >
            <i
              :class="`icon-24-${view.icon}`"
              class="icon-24"
            />
          </button>
        </li>
      </ul>
    </div>

    <TitresFilters />

    <Component
      :is="viewComponent"
      v-if="viewId"
      :titres="titres"
    />
  </Card>
</template>

<script>
import Card from './ui/card.vue'
import Loader from './ui/loader.vue'
import TitresTable from './titres/table.vue'
import TitresMap from './titres/map.vue'
import TitresFilters from './titres/filters.vue'

export default {
  name: 'Titres',

  components: {
    Loader,
    Card,
    TitresFilters
  },

  data () {
    return {
      filtersOpened: false,
      viewId: 'carte',
      views: [
        {
          id: 'liste',
          component: TitresTable,
          icon: 'list'
        },
        {
          id: 'carte',
          component: TitresMap,
          icon: 'globe'
        }
      ]
    }
  },

  computed: {
    titres () {
      return this.$store.state.titres.list
    },
    loaded () {
      return !!this.titres
    },
    viewComponent () {
      return this.views.find(c => c.id === this.viewId).component
    }
  },

  created () {
    this.get()
    if (
      this.$route.query.vue &&
      this.views.find(v => v.id === this.$route.query.vue)
    ) {
      this.viewSet(this.$route.query.vue)
    } else {
      this.viewSet(this.viewId)
    }
  },

  methods: {
    get () {
      this.$store.dispatch('titres/get')
    },
    viewSet (view) {
      this.viewId = view
      this.$router.push({ query: { vue: this.viewId } })
    }
  }
}
</script>
