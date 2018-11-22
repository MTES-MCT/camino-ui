<template>
  <page>
    <component
      :is="menu.component"
      v-if="menu.component"
      slot="menu"
    />

    <page-header slot="header" />

    <messages 
      slot="messages" 
      :messages="messages"
    />

    <error 
      v-if="error" 
      :message="error"
    />
    
    <router-view v-if="!error" />
    
    <component
      :is="popup.component"
      slot="popup"
      v-bind="popup.props"
    />
    
    <page-footer slot="footer" />
  </page>
</template>

<script>
import Page from './components/ui/page.vue'
import Messages from './components/ui/messages.vue'
import PageHeader from './components/page-header.vue'
import PageFooter from './components/page-footer.vue'
import Error from './components/error.vue'
import PopupAvertissement from './components/content/warning-popup.vue'

export default {
  name: 'App',

  components: {
    Page,
    Messages,
    PageHeader,
    PageFooter,
    Error
  },

  computed: {
    error () {
      return this.$store.state.error
    },
    messages () {
      return this.$store.state.messages
    },
    popup () {
      return this.$store.state.popup
    },
    menu () {
      return this.$store.state.menu
    }
  },

  mounted () {
    const date = new Date().getTime()
    const threedays = 1000 * 60 * 60

    if (!localStorage.getItem('conditions') || Number(localStorage.getItem('conditions')) + threedays < date) {
      this.warningPopupOpen()
    }

    if (localStorage.getItem('token')) {
      this.$store.dispatch('user/identifier')
    } else {
      this.$store.commit('user/tokenRemove')
    }

    this.$store.dispatch('init')
  },

  methods: {
    warningPopupOpen () {
      this.$store.commit('popupOpen', { component: PopupAvertissement, closeBtn: false })
    }
  }
}
</script>
