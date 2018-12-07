<template>
  <Page>
    <Component
      :is="menu.component"
      v-if="menu.component"
      slot="menu"
    />

    <PageHeader slot="header" />

    <Messages
      slot="messages"
      :messages="messages"
    />

    <Error
      v-if="error"
      :message="error"
    />

    <RouterView v-if="!error" />

    <Component
      :is="popup.component"
      slot="popup"
      v-bind="popup.props"
    />

    <PageFooter slot="footer" />
  </Page>
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
    this.$store.dispatch('user/init').then(r => {
      if (!this.$store.getters['user/preferencesConditions']) {
        this.warningPopupOpen()
      }

      this.$store.dispatch('init')
    })
  },

  methods: {
    warningPopupOpen () {
      this.$store.commit('popupOpen', {
        component: PopupAvertissement,
        closeBtn: false
      })
    }
  }
}
</script>
