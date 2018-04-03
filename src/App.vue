<template>
  <page>
    <template slot="header">
      <topbar />
    </template>

    <router-view />
    
    <template slot="footer">
      <div class="p">Footer</div>
    </template>
  </page>
</template>

<script>
import Page from './components/ui/Page.vue'
import Topbar from './components/Topbar.vue'

export default {
  name: 'App',

  components: {
    Page,
    Topbar
  }
}
</script>
