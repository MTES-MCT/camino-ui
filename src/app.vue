<template>
  <Page>
    <Component
      :is="menu.component"
      v-if="menu.component"
      slot="menu"
    />

    <PageHeader slot="header" />

    <Messages
      id="cmn-app-messages"
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
import Page from './components/_ui/page.vue'
import Messages from './components/_ui/messages.vue'
import PageHeader from './components/page-header.vue'
import PageFooter from './components/page-footer.vue'
import Error from './components/error.vue'

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
    user() {
      return this.$store.state.user.current
    },
    error() {
      return this.$store.state.error
    },
    messages() {
      return this.$store.state.messages
    },
    popup() {
      return this.$store.state.popup
    },
    menu() {
      return this.$store.state.menu
    }
  },

  watch: {
    user: 'get'
  },

  async created() {
    await this.init()
    this.viewTrack()
  },

  methods: {
    async init() {
      const ticket =
        this.$route.query.authentification === 'cerbere' &&
        this.$route.query.ticket

      if (ticket) {
        const query = { ...this.$route.query }

        delete query.ticket
        delete query.authentification
        delete query.TARGET

        this.$router.replace({ query })
        await this.$store.dispatch('user/cerbereLogin', { ticket })
      } else {
        await this.$store.dispatch('user/identify')
      }
      await this.get()
    },

    async get() {
      await this.$store.dispatch('user/metasGet')
    },

    viewTrack() {
      if (this.$matomo) {
        this.$matomo.customVariableVisitUser(this.user)
        this.$matomo.trackPageView()
      }
    }
  }
}
</script>
