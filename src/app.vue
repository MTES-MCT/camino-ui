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
import Page from './components/ui/page.vue'
import Messages from './components/ui/messages.vue'
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

  created() {
    this.init()
  },

  methods: {
    async init() {
      await this.$store.dispatch('user/identify')
      await this.get()
    },

    async get() {
      await this.$store.dispatch('metas/init')
    }
  }
}
</script>
