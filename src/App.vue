<template>
  <page>
    <template slot="header">
      <page-header />
    </template>

    <ribbon value="beta" />
    <router-view />
    <popup
      v-if="popupVisible" 
      :config="popupConfig"
      @popup-close="popupClose"
    />
    
    <template slot="footer">
      <page-footer />
    </template>
  </page>
</template>

<script>
import Page from './components/ui/page.vue'
import Popup from './components/ui/popup.vue'
import Ribbon from './components/ui/ribbon.vue'
import PageHeader from './components/page-header.vue'
import PageFooter from './components/page-footer.vue'
import PopupAvertissement from './components/camino/popup-warning.vue'

export default {
  name: 'App',

  components: {
    Page,
    Popup,
    Ribbon,
    PageHeader,
    PageFooter
  },

  data () {
    return {
      popupVisible: false,
      popupConfig: null
    }
  },

  mounted () {
    if (this.$cookies.get('camino')) {
      console.log('cookie: ', this.$cookies.get('camino'))
    } else {
      this.popupOpen({
        title: 'Bienvenue sur Camino',
        component: PopupAvertissement,
        close: false
      })
    }
  },

  methods: {
    popupOpen (config) {
      this.popupVisible = true
      this.popupConfig = config
    },
    popupClose () {
      this.popupVisible = false
    }
  }
}
</script>
