<template>
  <AutoTable :columns="colonnes" :rows="lignes" class="width-full-p" />
</template>

<script>
import AutoTable from '../_ui/table-auto.vue'

import { titresColonnes, titresLignesBuild } from './table-utils.js'

export default {
  name: 'Titres',

  components: { AutoTable },

  props: {
    titres: { type: Array, required: true }
  },

  computed: {
    activitesCol() {
      const user = this.$store.state.user.element

      return user && user.sections.activites
    },

    colonnes() {
      return titresColonnes.filter(({ id }) =>
        this.activitesCol ? true : id !== 'activites'
      )
    },

    lignes() {
      return titresLignesBuild(this.titres, this.activitesCol)
    }
  }
}
</script>
