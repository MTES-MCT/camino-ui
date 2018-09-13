<template>
  <page>
    <template slot="header">
      <page-header />
    </template>

    <ribbon value="beta" />
    <router-view />
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
      popupConfig: null,
      popupComponent: PopupAvertissement
    }
  },

  mounted () {
    if (this.$cookies.get('camino')) {
      console.log('cookie: ', this.$cookies.get('camino'))
    } else {
      this.popupOpen()
    }
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
