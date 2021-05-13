<template>
  <Page :slot-popup="!!popup.component" :slot-loader="loading">
    <template v-if="false" #banner>
      <div class="banner">
        <div class="container py-m">
          <p class="mb-0">
            <span class="bold">8 avril 2021</span> : Aenean eu leo quam.
            Pellentesque ornare sem lacinia quam venenatis vestibulum.
          </p>
        </div>
      </div>
    </template>

    <template v-if="menu.component" #menu>
      <component :is="menu.component" />
    </template>

    <header class="header">
      <div class="container">
        <PageHeader :loaded="loaded" />
      </div>
    </header>

    <main class="main">
      <div class="container">
        <Error v-if="error" :message="error" />
        <RouterView v-else-if="loaded" />
      </div>
    </main>

    <footer class="footer">
      <div class="container">
        <PageFooter />
      </div>
    </footer>

    <template #messages>
      <Messages id="cmn-app-messages" :messages="messages" />
    </template>

    <template v-if="popup.component" #popup>
      <component :is="popup.component" v-bind="popup.props" />
    </template>

    <template v-if="loading || fileLoading.total" #loader>
      <div class="loaders fixed p">
        <div v-if="loading" class="loader" />
        <div v-if="fileLoading.total">
          <div class="relative loader-file">
            <div
              class="loader-file-bar"
              :style="{
                right: `${
                  100 - 100 * (fileLoading.loaded / fileLoading.total)
                }%`
              }"
            />
          </div>
        </div>
      </div>
    </template>
  </Page>
</template>

<script>
import Page from './components/_ui/page.vue'
import Messages from './components/_ui/messages.vue'
import PageHeader from './components/page/header.vue'
import PageFooter from './components/page/footer.vue'
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
      return this.$store.state.user.element
    },

    loaded() {
      return this.$store.state.user.loaded
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
    },

    loading() {
      return this.$store.state.loading.length > 0
    },

    fileLoading() {
      return this.$store.state.fileLoading
    }
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
