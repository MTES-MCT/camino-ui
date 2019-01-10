<template>
  <Loader v-if="!loaded" />
  <Card v-else>
    <div class="flex">
      <h2 class="mt-s">
        Titres miniers
      </h2>
      <ul class="list-inline flex-right">
        <li
          v-for="v in views"
          :key="v.id"
          class="mr-0 pill-list"
          :class="{ active: viewId === v.id }"
        >
          <button
            class="btn-border px-m py-s"
            @click="viewSet(v.id)"
          >
            <i
              :class="`icon-24-${v.icon}`"
              class="icon-24"
            />
          </button>
        </li>
      </ul>
    </div>

    <TitresFilters />
    <p class="mb">
      Résultat : {{ titres.length }} titre{{ titres.length > 1 ? 's' : '' }} minier{{ titres.length > 1 ? 's' : '' }}
    </p>
    <Component
      :is="view.component"
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

  data() {
    return {
      filtersOpened: false,
      viewId: 'carte',
      views: [
        {
          id: 'liste',
          component: TitresTable,
          icon: 'list',
          params: []
        },
        {
          id: 'carte',
          component: TitresMap,
          icon: 'globe',
          params: ['centre', 'zoom']
        }
      ]
    }
  },

  computed: {
    titres() {
      return this.$store.state.titres.list
    },

    loaded() {
      return !!this.titres
    },

    view() {
      return this.views.find(c => c.id === this.viewId)
    }
  },

  created() {
    if (!this.titres) {
      this.get()
    }

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
    get() {
      this.$store.dispatch('titres/get')
    },

    viewSet(viewId) {
      this.viewId = viewId

      const pick = (obj, keys) =>
        Object.keys(obj)
          .filter(key => keys.includes(key))
          .reduce((res, key) => {
            res[key] = obj[key]
            return res
          }, {})

      const query = Object.assign(
        {},
        pick(this.$route.query, this.view.params),
        { vue: this.viewId }
      )

      this.$router.push({ query })
    }
  }
}
</script>
