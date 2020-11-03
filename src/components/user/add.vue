<template>
  <div class="mb-xxl">
    <h2>Création de compte</h2>

    <hr />

    <p>Renseignez au moins le mot de passe, le prénom et le nom.</p>

    <hr />

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Email</h6>
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
        <h6>Mot de passe</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          id="cmn-user-add-input-mot-de-passe"
          v-model="utilisateur.motDePasse"
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
        <h6>Prénom</h6>
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
        <h6>Nom</h6>
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
        <h6>Téléphone fixe</h6>
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
        <h6>Téléphone mobile</h6>
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
      <div class="tablet-blob-2-3" :class="{ disabled: !complete }">
        <button
          id="cmn-user-add-button-enregistrer"
          class="btn-flash rnd-xs p-s full-x"
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

  beforeDestroy() {
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
        this.save()
      }
    }
  }
}
</script>
