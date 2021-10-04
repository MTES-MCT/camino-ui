<template>
  <div class="mb-xxl">
    <h2>Création de compte</h2>

    <hr />

    <p>Renseignez au moins le mot de passe, le prénom et le nom.</p>

    <hr />

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5>Email</h5>
      </div>
      <div class="mb tablet-blob-2-3">
        <div class="py-s mb-xs">
          {{ utilisateur.email }}
        </div>
      </div>
    </div>

    <hr />

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5>Mot de passe</h5>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          id="cmn-user-add-input-mot-de-passe"
          v-model="utilisateur.motDePasse"
          type="password"
          class="p-s mb-s"
          placeholder="Mot de passe"
        />
        <p class="h6 mb-0">8 caractères minimum.</p>
      </div>
    </div>

    <hr />

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5>Prénom</h5>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          id="cmn-user-add-input-prenom"
          v-model="utilisateur.prenom"
          type="text"
          class="p-s"
          placeholder="Prénom"
        />
      </div>
    </div>

    <hr />
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5>Nom</h5>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          id="cmn-user-add-input-nom"
          v-model="utilisateur.nom"
          type="text"
          class="p-s"
          placeholder="Nom"
        />
      </div>
    </div>

    <hr />
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5>Téléphone fixe</h5>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-model="utilisateur.telephoneFixe"
          type="text"
          class="p-s"
          placeholder="01…"
        />
      </div>
    </div>

    <hr />
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5>Téléphone mobile</h5>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-model="utilisateur.telephoneMobile"
          type="text"
          class="p-s"
          placeholder="06…"
        />
      </div>
    </div>

    <hr />
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5>Newsletter</h5>
      </div>
      <div class="mb tablet-blob-2-3">
        <label class="tablet-pt-s">
          <input
            v-model="utilisateur.newsletter"
            type="checkbox"
            class="p-s mt-s mb-s mr-xs"
          />
          <span v-if="utilisateur.newsletter">Inscrit</span>
        </label>
      </div>
    </div>

    <hr />

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s" />
      <div class="mb tablet-blob-2-3">
        <input id="cmn-user-add-checkbox-cgu" v-model="cgu" type="checkbox" />
        Vous avez lu et vous acceptez les
        <a href="/cgu" target="_blank" rel="noopener noreferrer">
          conditions générales d'utilisation </a
        >.
      </div>
    </div>

    <hr />
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3" />
      <div class="tablet-blob-2-3">
        <button
          id="cmn-user-add-button-enregistrer"
          ref="save-button"
          :disabled="!complete"
          :class="{ disabled: !complete }"
          class="btn-primary rnd-xs p-s full-x"
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
  name: 'CaminoUserAdd',

  data() {
    return {
      utilisateur: { email: this.$route.query.email },
      cgu: false
    }
  },

  computed: {
    complete() {
      return (
        this.utilisateur.nom &&
        this.utilisateur.prenom &&
        this.utilisateur.email &&
        this.utilisateur.motDePasse &&
        this.cgu
      )
    }
  },

  created() {
    document.addEventListener('keyup', this.keyup)
  },

  beforeUnmount() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    async save() {
      if (this.complete) {
        if (!this.utilisateur.permissionId) {
          this.utilisateur.permissionId = 'defaut'
        }

        await this.$store.dispatch('user/tokensSet', {
          accessToken: this.$route.query.token
        })
        await this.$store.dispatch('user/add', this.utilisateur)
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
