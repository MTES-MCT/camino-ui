<template>
  <div>
    <Url
      :params="preferences"
      @params:update="preferencesUpdate"
    />
    <slot />
  </div>
</template>

<script>
import Url from '../_ui/url.vue'

export default {
  components: {
    Url
  },

  props: {
    section: {
      type: String,
      required: true
    }
  },

  computed: {
    preferences() {
      return this.$store.state.user.preferences[this.section].table
    }
  },

  methods: {
    preferencesUpdate(params) {
      this.$store.dispatch('user/preferencesSet', {
        section: `${this.section}.table`,
        params
      })
    }
  }
}
</script>
