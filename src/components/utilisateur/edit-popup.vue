<template>
  <Popup>
    <template slot="header">
      <div>
        <h2 class="mb-0">
          {{
            action === 'create' || action === 'email'
              ? "Création d'un compte utilisateur"
              : "Modification du compte utilisateur"
          }}
        </h2>
      </div>
    </template>
    <div v-if="action === 'create' || action === 'email'">
      <p>Renseignez au moins l'email, le mot de passe, le prénom et le nom.</p>
      <hr>
    </div>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Email</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-model="utilisateur.email"
          type="text"
          class="p-s"
          placeholder="Email"
        >
      </div>
    </div>

    <div v-if="action === 'create' || action === 'email'">
      <hr>
      <div class="tablet-blobs">
        <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Mot de passe</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <input
            v-model="utilisateur.motDePasse"
            type="password"
            class="p-s mb-s"
            placeholder="Mot de passe"
          >
          <p class="h5 mb-0">
            8 caractères minimum.
          </p>
        </div>
      </div>
    </div>

    <hr>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Prénom</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-model="utilisateur.prenom"
          type="text"
          class="p-s"
          placeholder="Prénom"
        >
      </div>
    </div>

    <hr>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Nom</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-model="utilisateur.nom"
          type="text"
          class="p-s"
          placeholder="Nom"
        >
      </div>
    </div>

    <hr>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Téléphone fixe</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-model="utilisateur.telephoneFixe"
          type="text"
          class="p-s"
          placeholder="0100000000"
        >
      </div>
    </div>

    <hr>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Téléphone mobile</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-model="utilisateur.telephoneMobile"
          type="text"
          class="p-s"
          placeholder="0100000000"
        >
      </div>
    </div>

    <div v-if="permissionsCheck(['super', 'admin'])">
      <hr>
      <div class="tablet-blobs">
        <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Permissions</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <ul class="list-inline mb-0">
            <li
              v-for="permission in permissionList"
              :key="permission.id"
              :class="{ active: utilisateur.permission.id === permission.id }"
            >
              <button
                class="btn-flash py-xs px-s pill cap-first h6 mr-xs"
                @click="permissionToggle(permission)"
              >
                {{ permission.nom }}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <hr>
      <div class="tablet-blobs">
        <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Lien</h6>
        </div>

        <div class="tablet-blob-2-3">
          <ul class="list-inline pt-s">
            <li class="mr">
              <label>
                <input
                  v-model="lien"
                  type="radio"
                  :value="'aucun'"
                  :checked="lien === 'aucun'"
                  @change="lienReset"
                >Aucun
              </label>
            </li>
            <li class="mr">
              <label>
                <input
                  v-model="lien"
                  type="radio"
                  :value="'entreprise'"
                  :checked="lien === 'entreprise'"
                  @change="lienReset"
                >Entreprise
              </label>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="lien === 'entreprise'">
        <hr>
        <div class="tablet-blobs">
          <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
            <h6>Entreprise</h6>
          </div>

          <div class="mb tablet-blob-2-3">
            <select
              v-model="utilisateur.entreprise"
              type="text"
              class="p-s mr"
            >
              <option
                v-for="entreprise in entreprises"
                :key="entreprise.id"
                :value="entreprise"
              >
                {{ entreprise.nom }}
                {{
                  entreprise.legalSiren ||
                    entreprise.legalEtranger ||
                    entreprise.id
                }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="action === 'email'"
      class="mb"
    >
      <hr>
      <input
        v-model="cgu"
        type="checkbox"
      >Vous avez lu et vous acceptez les
      <a
        href="/cgu"
        target="_blank"
        rel="noopener noreferrer"
      >
        conditions générales d'utilisation
      </a>.
    </div>

    <template slot="footer">
      <Messages :messages="messages" />
      <div class="tablet-blobs">
        <div class="mb tablet-mb-0 tablet-blob-1-3">
          <button
            class="btn-border rnd-xs p-s full-x"
            @click="cancel"
            @keyup.esc.native="cancel"
          >
            Annuler
          </button>
        </div>
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
    </template>
  </Popup>
</template>

<script>
import Popup from '../ui/popup.vue'
import Messages from '../ui/messages.vue'

export default {
  name: 'CaminoUtilisateurEditPopup',

  components: {
    Popup,
    Messages
  },

  props: {
    utilisateur: {
      type: Object,
      default: () => ({})
    },
    action: {
      type: String,
      default: 'edit',
      validator: val => ['edit', 'create', 'email'].includes(val)
    }
  },

  data() {
    return {
      lien: 'aucun',
      cgu: null
    }
  },

  computed: {
    messages() {
      return this.$store.state.popup.messages
    },
    permissionList() {
      return this.$store.state.utilisateurs.permissions
    },
    complete() {
      if (this.action === 'create') {
        return (
          this.utilisateur.nom &&
          this.utilisateur.prenom &&
          this.utilisateur.email &&
          this.utilisateur.motDePasse
        )
      }

      if (this.action === 'email') {
        return (
          this.utilisateur.nom &&
          this.utilisateur.prenom &&
          this.utilisateur.email &&
          this.utilisateur.motDePasse &&
          this.cgu
        )
      }

      return (
        this.utilisateur.nom &&
        this.utilisateur.prenom &&
        this.utilisateur.id &&
        this.utilisateur.email
      )
    },
    entreprises() {
      return this.$store.state.entreprises.list
    }
  },

  created() {
    document.addEventListener('keyup', this.keyup)

    if (this.utilisateur.entreprise) {
      this.utilisateur.entreprise = this.entreprises.find(
        e => e.id === this.utilisateur.entreprise.id
      )
      this.lien = 'entreprise'
    }
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    save() {
      if (this.complete) {
        if (this.action === 'email') {
          this.$store.dispatch('utilisateurs/add', this.utilisateur)
        } else if (this.action === 'create') {
          this.$store.dispatch('utilisateurs/add', this.utilisateur)
        } else {
          this.$store.dispatch('utilisateurs/update', this.utilisateur)
        }
      }
    },

    cancel() {
      this.errorsRemove()
      this.$store.commit('popupClose')
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 27) {
        this.cancel()
      } else if ((e.which || e.keyCode) === 13) {
        this.save()
      }
    },

    errorsRemove() {
      this.$store.commit('popupMessagesRemove')
    },

    permissionToggle(permission) {
      this.utilisateur.permission = permission
    },

    lienReset() {
      this.utilisateur.entreprise = this.lien === 'entreprise' ? {} : null
      this.utilisateur.administration =
        this.lien === 'administration' ? {} : null
    }
  }
}
</script>
