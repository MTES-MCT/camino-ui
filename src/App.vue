<template>
  <page>
    <template slot="header">
      <topbar />
    </template>

    <ribbon value="beta"/>
    <router-view />
    
    <template slot="footer">
      <div class="p">Footer</div>
    </template>

    <popup
      v-if="popupVisible" 
      :config="popupConfig"
      @popup-close="popupClose" />
  </page>
</template>

<script>
import Page from './components/ui/Page.vue'
import Popup from './components/ui/Popup.vue'
import Ribbon from './components/ui/Ribbon.vue'
import Topbar from './components/Topbar.vue'
import PopupDisclaimer from './components/camino/PopupDisclaimer.vue'

export default {
  name: 'App',

  components: {
    Page,
    Popup,
    Ribbon,
    Topbar
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
        component: PopupDisclaimer,
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
