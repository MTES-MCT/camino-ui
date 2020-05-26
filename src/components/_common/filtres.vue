<template>
  <Filters
    v-if="loaded"
    ref="filters"
    :filters.sync="filters"
    title="Filtres"
    button="Valider"
    @filters:validate="validate"
    @filters:toggle="toggle"
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
import { idsClean } from './filtres'

export default {
  components: {
    Filters
  },

  props: {
    filtres: { type: Array, required: true },
    preferences: { type: Object, required: true },
    metas: { type: Object, required: true },
    loaded: { type: Boolean, required: true }
  },

  data() {
    return {
      opened: false
    }
  },

  computed: {
    filters() {
      return this.filtres.map(f => {
        const metaId = f.id.replace(/Ids/g, '')
        if (this.metas[metaId]) {
          f.elements = this.metas[metaId]
        }

        return f
      })
    }
  },

  watch: {
    // si les metas changent (connexion / deconnexion user)
    metas: {
      handler: function() {
        if (this.loaded) {
          this.validate()
        }
      },
      deep: true
    },

    loaded: function(to, from) {
      if (!from) {
        this.init()
      }
    }
  },

  created() {
    document.addEventListener('keyup', this.keyup)
    if (this.loaded) {
      this.init()
    }
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    elementsUpdate() {
      this.$emit('elements:update')
    },

    preferencesUpdate(params) {
      this.$emit('preferences:update', params)
    },

    toggle(opened) {
      this.opened = opened
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 13 && this.opened) {
        this.validate()
      }
    },

    init() {
      this.filtresInit(this.preferences)
      this.elementsUpdate()
    },

    validate() {
      // les champs textes sont mis à jour onBlur
      // pour les prendre en compte lorsqu'on valide en appuyant sur "entrée"
      // met le focus sur le bouton de validation (dans la méthode close())
      if (this.$refs.filters) {
        this.$refs.filters.close()
      }
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
          value = idsClean(JSON.parse(JSON.stringify(filtre.value)))
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
      this.elementsUpdate()
    },

    filtresInit(params) {
      Object.keys(params).forEach(id => {
        const filtre = this.filtres.find(filtre => filtre.id === id)

        let value

        if (
          (filtre.type === 'custom' ||
            filtre.type === 'select' ||
            filtre.type === 'checkboxes') &&
          params[id]
        ) {
          value = JSON.parse(JSON.stringify(params[id]))
        } else {
          value = params[id]
        }

        filtre.value = value
      })
    }
  }
}
</script>
