<template>
  <div class="mb-xxl">
    <h2>Initialisation du mot de passe</h2>

    <hr>
    <div v-if="!done">
      <div class="tablet-blobs">
        <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Nouveau mot de passe</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <input
            v-model="motDePasse1"
            type="password"
            class="p-s bg-bg"
            placeholder="Mot de passe"
          >
        </div>
      </div>
      <hr>

      <div class="tablet-blobs">
        <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Nouveau mot de passe (vérification)</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <input
            v-model="motDePasse2"
            type="password"
            class="p-s bg-bg"
            placeholder="Mot de passe"
          >
        </div>
      </div>
      <hr>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3" />
        <div
          class="tablet-blob-2-3"
          :class="{ disabled: !complete }"
        >
          <button
            class="btn-flash rnd-xs p-s full-x"
            @click="save"
            @keyup.enter.native="save"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Vous pouvez maintenant vous connecter à votre compte.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CaminoPassordInit',

  data () {
    return {
      motDePasse1: '',
      motDePasse2: '',
      done: false
    }
  },

  computed: {
    complete () {
      return this.motDePasse1 && this.motDePasse2
    }
  },

  created () {
    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy () {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    save () {
      if (this.complete && !this.done) {
        this.$store.dispatch('user/tokenSet', this.$route.query.token)
        this.$store
          .dispatch('user/passwordInit', {
            motDePasse1: this.motDePasse1,
            motDePasse2: this.motDePasse2
          })
          .then(r => {
            if (r) {
              this.done = true
            }
          })
      }
    },

    keyup (e) {
      if ((e.which || e.keyCode) === 13) {
        this.save()
      }
    }
  }
}
</script>
