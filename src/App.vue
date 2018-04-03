<template>
  <div class="page">
    <topbar />
    <main class="content container pt">
      <router-view />
    </main>
    <div class="footer">
      <div class="container p">footer</div>
    </div>
  </div>
</template>

<script>
import Topbar from './components/Topbar.vue'

export default {
  name: 'App',

  components: {
    Topbar
  }
}
</script>
