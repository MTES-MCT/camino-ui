<template>
  <Filters
    v-if="initialized"
    v-model:filters="filters"
    class="flex-grow"
    button="Valider"
    :opened="opened"
    title="Filtres"
    @validate="validate"
    @toggle="toggle"
  />
  <div v-else class="py-s px-m mb-s border rnd-s">…</div>
</template>

<script>
import Filters from '../_ui/filters.vue'
import { valuesClean } from './filtres'

export default {
  components: { Filters },

  props: {
    filtres: { type: Array, required: true },
    params: { type: Object, required: true },
    metas: { type: Object, default: () => ({}) },
    initialized: { type: Boolean, required: true }
  },

  emits: ['toggle', 'params-update'],

  data() {
    return {
      opened: false,
      filters: []
    }
  },

  watch: {
    // si les metas changent (connexion / deconnexion user)
    metas: {
      handler: function (ne, ol) {
        if (this.initialized) {
          this.validate()
        }
      },
      deep: true
    },

    initialized: function (to, from) {
      if (!from) {
        this.init()
      }
    }
  },

  methods: {
    paramsUpdate(params) {
      this.$emit('params-update', params)
    },

    toggle() {
      this.opened = !this.opened

      this.init()
      this.$emit('toggle', this.opened)
    },

    close() {
      this.opened = false
    },

    validate() {
      // les champs textes sont mis à jour onBlur
      // pour les prendre en compte lorsqu'on valide en appuyant sur "entrée"
      // met le focus sur le bouton de validation (dans la méthode close())

      this.close()

      window.scrollTo({ top: 0, behavior: 'smooth' })

      // formate les valeurs des filtres
      const params = this.filters.reduce((params, filtre) => {
        let value

        if (
          filtre.type === 'custom' ||
          filtre.type === 'select' ||
          filtre.type === 'checkboxes' ||
          filtre.type === 'autocomplete'
        ) {
          value = valuesClean(filtre.value)
        } else {
          value = filtre.value
        }

        if (filtre.clean) {
          value = filtre.clean(value)
        }

        params[filtre.id] = value

        return params
      }, {})

      this.paramsUpdate(params)
    },

    init() {
      this.filters = this.filtres.map(filtre => {
        if (filtre.elementsFormat) {
          filtre.elements = filtre.elementsFormat(filtre.id, this.metas)
        }

        return filtre
      })

      Object.keys(this.params).forEach(id => {
        const preference = this.params[id]
        const filtre = this.filters.find(filtre => filtre.id === id)

        if (!filtre) return

        filtre.value = preference
      })
    }
  }
}
</script>
