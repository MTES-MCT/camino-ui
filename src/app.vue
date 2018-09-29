<template>
  <page>
    <template slot="header">
      <page-header />
    </template>

    <ribbon value="beta" />

    <messages 
      v-if="messages.length > 0" 
      :messages="messages"
    />
    <router-view v-if="!apiError" />
    <component
      :is="popup.component"
      v-if="popup.component"
      :close-btn="popup.closeBtn"
    />

    <template slot="footer">
      <page-footer />
    </template>
  </page>
</template>

<script>
import Page from './components/ui/page.vue'
import Messages from './components/ui/messages.vue'
import Ribbon from './components/ui/ribbon.vue'
import PageHeader from './components/page-header.vue'
import PageFooter from './components/page-footer.vue'
import PopupAvertissement from './components/camino/popup-warning.vue'

export default {
  name: 'App',

  components: {
    Page,
    Messages,
    Ribbon,
    PageHeader,
    PageFooter
  },

  computed: {
    apiError () {
      return this.$store.state.apiError
    },
    messages () {
      return this.$store.state.messages
    },
    popup () {
      return this.$store.state.popup
    }
  },

  mounted () {
    const date = new Date().getTime()
    const threedays = 1000 * 60 * 60
    if (!localStorage.getItem('conditions') || Number(localStorage.getItem('conditions')) + threedays < date) {
      this.popupOpen()
    }
    if (localStorage.getItem('token')) {
      this.$store.dispatch('utilisateur/identifier')
    }
  },

  methods: {
    popupOpen () {
      this.$store.commit('popupOpen', { component: PopupAvertissement, closeBtn: false })
    }
  }
}
</script>
