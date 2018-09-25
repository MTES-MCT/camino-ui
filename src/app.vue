<template>
  <page>
    <template slot="header">
      <page-header />
    </template>

    <ribbon value="beta" />

    <error 
      v-if="erreurs.length > 0" 
      :messages="erreurs"
    />
    <router-view v-else />
    <component
      :is="popupComponent" 
      v-if="popupVisible"
      @popup-close="popupClose"
    />
    
    <template slot="footer">
      <page-footer />
    </template>
  </page>
</template>

<script>
import Page from './components/ui/page.vue'
import Error from './components/ui/error.vue'
import Ribbon from './components/ui/ribbon.vue'
import PageHeader from './components/page-header.vue'
import PageFooter from './components/page-footer.vue'
import PopupAvertissement from './components/camino/popup-warning.vue'

export default {
  name: 'App',

  components: {
    Page,
    Error,
    Ribbon,
    PageHeader,
    PageFooter
  },

  data () {
    return {
      popupVisible: false,
      popupConfig: null,
      popupComponent: PopupAvertissement
    }
  },

  computed: {
    erreurs () {
      return this.$store.state.erreurs
    }
  },

  mounted () {
    if (this.$cookies.get('camino')) {
      console.log('cookie: ', this.$cookies.get('camino'))
    } else {
      this.popupOpen()
    }
    localStorage.setItem('token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwicm9sZSI6ImFkbWluIn0.Lz4SVrc7UJWCwTQ3gCnYQ98-_QFg7kG4LZsR4tyJecU')
  },

  methods: {
    popupOpen () {
      this.popupVisible = true
    },
    popupClose () {
      this.popupVisible = false
    }
  }
}
</script>
