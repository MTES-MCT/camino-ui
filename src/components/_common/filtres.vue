<template>
  <Filters
    v-if="loaded"
    class="flex-grow"
    button="Valider"
    :filters="filters"
    :opened="opened"
    title="Filtres"
    @validate="validate"
    @toggle="toggle"
  />
  <div
    v-else
    class="py-s px-m mb-s border rnd-s"
  >
    …
  </div>
</template>

<script>
import Filters from '../_ui/filters.vue'
import { valuesClean } from './filtres'

export default {
  components: { Filters },

  props: {
    filtres: { type: Array, required: true },
    preferences: { type: Object, required: true },
    metas: { type: Object, default: () => ({}) },
    loaded: { type: Boolean, required: true }
  },

  data() {
    return {
      opened: false
    }
  },

  computed: {
    filters() {
      return this.filtres.map(filtre => {
        if (filtre.elementsFormat) {
          filtre.elements = filtre.elementsFormat(filtre.id, this.metas)
        }

        return filtre
      })
    }
  },

  watch: {
    // si les metas changent (connexion / deconnexion user)
    metas: {
      handler: function () {
        if (this.loaded) {
          this.validate()
        }
      },
      deep: true
    },

    loaded: function (to, from) {
      if (!from) {
        this.init()
      }
    }
  },

  created() {
    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    preferencesUpdate(params) {
      this.$emit('preferences:update', params)
    },

    toggle() {
      this.opened = !this.opened

      this.init()
      this.$emit('toggle', this.opened)
    },

    close() {
      this.opened = false
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 13 && this.opened) {
        this.validate()
      }
    },

    validate() {
      // les champs textes sont mis à jour onBlur
      // pour les prendre en compte lorsqu'on valide en appuyant sur "entrée"
      // met le focus sur le bouton de validation (dans la méthode close())

      this.close()

      window.scrollTo({ top: 0, behavior: 'smooth' })

      // formate les valeurs des filtres
      const params = this.filtres.reduce((params, filtre) => {
        let value

        if (
          filtre.type === 'custom' ||
          filtre.type === 'select' ||
          filtre.type === 'checkboxes'
        ) {
          // on crée une copie pour éviter les modifications par référence
          value = valuesClean(JSON.parse(JSON.stringify(filtre.value)))
        } else {
          value = filtre.value
        }

        if (filtre.clean) {
          value = filtre.clean(value)
        }

        params[filtre.id] = value

        return params
      }, {})

      this.preferencesUpdate(params)
    },

    init() {
      Object.keys(this.preferences).forEach(id => {
        const preference = this.preferences[id]
        const filtre = this.filtres.find(filtre => filtre.id === id)

        if (!filtre) return

        if (
          (filtre.type === 'custom' ||
            filtre.type === 'select' ||
            filtre.type === 'checkboxes') &&
          preference
        ) {
          filtre.value = JSON.parse(JSON.stringify(preference))
        } else {
          filtre.value = preference
        }
      })
    }
  }
}
</script>
