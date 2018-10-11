<template>
  <div class="bg-bg">
    <div class="container py">
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3">
          <ul class="list-sans">
            <li><a 
              href="#" 
              class="decoration-none"
            >Titres</a></li>
            <li><a href="" />Utilisateurs</li>
            <li><a href="" /></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>

export default {
  name: 'MainMenu',

  computed: {
    menu () {
      return this.$store.state.menu
    }
  },

  methods: {
  }
}
</script>
