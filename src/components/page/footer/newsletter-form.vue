<template>
  <div>
    <h5>Newsletter</h5>

    <div class="blobs-mini mb">
      <div class="blob-mini-1-2">
        <input
          v-model="email"
          type="text"
          placeholder="Email"
          class="p-s rnd-l-xs small"
        />
      </div>
      <div class="blob-mini-1-2">
        <button class="btn rnd-r-xs p-s full-x small" @click="subscribe">
          S'inscrire
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: ''
    }
  },

  methods: {
    async subscribe() {
      await this.$store.dispatch('user/newsletterSubscribe', this.email)
    }
  }
}
</script>
