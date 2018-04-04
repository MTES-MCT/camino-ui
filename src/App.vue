<template>
  <page>
    <template slot="header">
      <topbar />
    </template>

    <router-view />
    
    <template slot="footer">
      <div class="p">Footer</div>
    </template>
    
    <popup
      v-if="popupVisible" 
      :config="popupConfig"
      @popup-open="popupOpen"
      @popup-close="popupClose" />
  </page>
</template>

<script>
import Page from './components/ui/Page.vue'
import Popup from './components/ui/Popup.vue'
import Topbar from './components/Topbar.vue'
import PopupDisclaimer from './components/camino/PopupDisclaimer.vue'

export default {
  name: 'App',

  components: {
    Page,
    Popup,
    Topbar
  },

  data () {
    return {
      popupVisible: true,
      popupConfig: {
        title: "title",
        component: PopupDisclaimer,
        close: true
      }
    }
  },

  methods: {
    popupOpen (config) {
      this.popupVisible = true
      this.popupConfig = config
    },
    popupClose () {
      console.log('popup close')
      this.popupVisible = false
    }
  }
}
</script>
