<template>
  <div class="mb-xxl">
    <h2>Initialisation du mot de passe</h2>

    <hr />
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Nouveau mot de passe</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-model="motDePasse1"
          type="password"
          class="p-s mb-s"
          placeholder="Mot de passe"
        />
        <p class="h5 mb-0">8 caractères minimum.</p>
      </div>
    </div>
    <hr />

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Nouveau mot de passe (vérification)</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-model="motDePasse2"
          type="password"
          class="p-s"
          placeholder="Mot de passe"
        />
      </div>
    </div>
    <hr />
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3" />
      <div class="tablet-blob-2-3">
        <button
          ref="save-button"
          class="btn-flash rnd-xs p-s full-x"
          :disabled="!complete"
          :class="{ disabled: !complete }"
          @click="save"
        >
          Enregistrer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CaminoUserPassordInit',

  data() {
    return {
      motDePasse1: '',
      motDePasse2: ''
    }
  },

  computed: {
    complete() {
      return this.motDePasse1 && this.motDePasse2
    }
  },

  created() {
    document.addEventListener('keyup', this.keyup)
  },

  beforeUnmount() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    save() {
      if (this.complete) {
        this.$store.dispatch('user/tokensSet', {
          accessToken: this.$route.query.token
        })
        this.$store.dispatch('user/passwordInit', {
          motDePasse1: this.motDePasse1,
          motDePasse2: this.motDePasse2
        })
      }
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 13) {
        if (this.complete) {
          this.$refs['save-button'].focus()
          this.save()
        }
      }
    }
  }
}
</script>
