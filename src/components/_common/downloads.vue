<template>
  <Dropdown class="full-x" :opened="opened" @toggle="toggle">
    <template #title>
      <span class="h6">Téléchargements</span>
    </template>
    <div>
      <Download
        v-for="format in formats"
        :key="format"
        :format="format"
        class="btn-alt small px-s py-s full-x border-b-s"
        :section="section"
        :query="$route.query"
        :params="params"
        @clicked="toggle"
      />
    </div>
  </Dropdown>
</template>

<script>
import Dropdown from '../_ui/dropdown.vue'
import Download from './download.vue'

export default {
  components: {
    Dropdown,
    Download
  },

  props: {
    formats: { type: Array, required: true },

    section: { type: String, required: true },

    params: { type: Object, default: () => ({}) }
  },

  data() {
    return {
      opened: false
    }
  },

  methods: {
    toggle() {
      this.opened = !this.opened
    }
  }
}
</script>
