<template>
  <Popup :messages="messages">
    <template slot="header">
      <div>
        <h2 class="mb-0">
          {{
            action === 'create'
              ? "Création d'un compte utilisateur"
              : 'Modification du compte utilisateur'
          }}
        </h2>
      </div>
    </template>

    <div v-if="action === 'create'">
      <p>Renseignez au moins l'email, le mot de passe, le prénom et le nom.</p>
      <hr>
    </div>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Email</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-if="permissionsCheck(['super', 'admin'])"
          v-model="utilisateur.email"
          type="email"
          class="p-s"
          placeholder="Email"
        >
        <div
          v-else
          class="py-s"
        >
          {{ utilisateur.email }}
        </div>
      </div>
    </div>

    <div v-if="action === 'create'">
      <hr>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
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
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
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
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
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
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
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
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
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

    <div v-if="utilisateur.permissionEditable">
      <hr>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Permissions</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <ul class="list-inline mb-0">
            <li
              v-for="permission in permissions"
              :key="permission.id"
              :class="{ active: utilisateur.permissionId === permission.id }"
            >
              <button
                :id="
                  `cmn-utilisateur-edit-popup-permission-button-${permission.id}`
                "
                class="btn-flash py-xs px-s pill cap-first h6 mr-xs"
                @click="permissionToggle(permission)"
              >
                {{ permission.nom }}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="utilisateurIsEntreprise">
        <hr>
        <h3 class="mb-s">
          Entreprises
        </h3>
        <div
          v-for="(entreprise, n) in utilisateur.entreprises"
          :key="n"
        >
          <div
            class="flex full-x"
            :class="{
              'mb-s': utilisateurEntreprisesLength,
              mb: !utilisateurEntreprisesLength
            }"
          >
            <select
              id="cmn-utilisateur-edit-popup-entreprise-select"
              v-model="utilisateur.entreprises[n]"
              type="text"
              class="p-s mr-s"
            >
              <option
                v-for="e in entreprises"
                :key="e.id"
                :value="{ id: e.id}"
                :disabled="
                  utilisateur.entreprises.find(({ id }) => id === e.id)
                "
              >
                {{ e.nom }}
              </option>
            </select>
            <div class="flex-right">
              <button
                class="btn-border py-s px-m rnd-xs"
                @click="entrepriseRemove(n)"
              >
                <i class="icon-24 icon-minus" />
              </button>
            </div>
          </div>
        </div>

        <button
          v-if="!utilisateur.entreprises.some(({ id }) => id === '')"
          id="cmn-utilisateur-edit-popup-entreprise-button-ajouter"
          class="btn-border rnd-xs py-s px-m full-x flex mb"
          @click="entrepriseAdd"
        >
          Ajouter une entreprise<i class="icon-24 icon-plus flex-right" />
        </button>
      </div>

      <div v-if="utilisateurIsAdministration">
        <hr>
        <h3 class="mb-s">
          Administrations
        </h3>
        <div
          v-for="(administration, n) in utilisateur.administrations"
          :key="n"
        >
          <div
            class="flex full-x"
            :class="{
              'mb-s': utilisateurAdministrationsLength,
              mb: !utilisateurAdministrationsLength
            }"
          >
            <select
              id="cmn-utilisateur-edit-popup-administration-select"
              v-model="utilisateur.administrations[n]"
              type="text"
              class="p-s"
              :class="{ 'mr-s': !administrationsDisabledIds.includes(administration.id) }"
              :disabled="administrationsDisabledIds.includes(administration.id)"
            >
              <option
                v-for="a in administrations"
                :key="a.id"
                :value="{ id : a.id }"
                :disabled="
                  utilisateur.administrations.find(({ id }) => id === a.id) || administrationsDisabledIds.includes(a.id)
                "
              >
                {{ `${a.abreviation}` }}
              </option>
            </select>
            <div
              v-if="!administrationsDisabledIds.includes(administration.id)"
              class="flex-right"
            >
              <button
                class="btn-border py-s px-m rnd-xs"
                @click="administrationRemove(n)"
              >
                <i class="icon-24 icon-minus" />
              </button>
            </div>
          </div>
        </div>

        <button
          v-if="!utilisateur.administrations.some(({ id }) => id === '')"
          id="cmn-utilisateur-edit-popup-administration-button-ajouter"
          class="btn-border rnd-xs py-s px-m full-x flex mb"
          @click="administrationAdd"
        >
          Ajouter une administration<i class="icon-24 icon-plus flex-right" />
        </button>
      </div>
    </div>

    <template slot="footer">
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 mb tablet-mb-0">
          <button
            v-if="!loading"
            class="btn-border rnd-xs p-s full-x"
            @click="cancel"
          >
            Annuler
          </button>
        </div>
        <div
          class="tablet-blob-2-3"
          :class="{ disabled: !complete }"
        >
          <button
            v-if="!loading"
            id="cmn-utilisateur-edit-popup-button-enregistrer"
            class="btn-flash rnd-xs p-s full-x"
            @click="save"
          >
            Enregistrer
          </button>
          <div
            v-else
            class="p-s full-x bold"
          >
            Enregistrement en cours…
          </div>
        </div>
      </div>
    </template>
  </Popup>
</template>

<script>
import Popup from '../_ui/popup.vue'

export default {
  name: 'CaminoUtilisateurEditPopup',

  components: {
    Popup
  },

  props: {
    utilisateur: {
      type: Object,
      default: () => ({})
    },

    action: {
      type: String,
      default: 'edit',
      validator: val => ['edit', 'create'].includes(val)
    }
  },

  data() {
    return {
      cgu: null
    }
  },

  computed: {
    loading() {
      return this.$store.state.popup.loading
    },

    messages() {
      return this.$store.state.popup.messages
    },

    permissions() {
      return this.$store.state.metas.utilisateur.permissions
    },

    entreprises() {
      return this.$store.state.metas.utilisateur.entreprises
    },

    administrations() {
      return this.$store.state.metas.utilisateur.administrations
    },

    complete() {
      return this.action === 'create'
        ? this.utilisateur.nom &&
            this.utilisateur.prenom &&
            this.utilisateur.email &&
            this.utilisateur.motDePasse
        : this.utilisateur.nom &&
            this.utilisateur.prenom &&
            this.utilisateur.id &&
            this.utilisateur.email
    },

    utilisateurEntreprisesLength() {
      return this.utilisateur.entreprises.filter(({ id }) => id).length
    },

    utilisateurAdministrationsLength() {
      return this.utilisateur.administrations.filter(({ id }) => id).length
    },

    utilisateurIsEntreprise() {
      return ['entreprise'].includes(this.utilisateur.permissionId)
    },

    utilisateurIsAdministration() {
      return ['admin', 'editeur', 'lecteur'].includes(
        this.utilisateur.permissionId
      )
    },

    administrationsDisabledIds() {
      return this.administrations.reduce((res, a) => {
        if (!a.membre && !this.permissionsCheck(['super'])) {
          res.push(a.id)
        }

        return res
      }, [])
    }
  },

  watch: {
    utilisateurIsEntreprise: 'get',
    utilisateurIsAdministration: 'get'
  },

  created() {
    this.get()
    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    async get() {
      await this.$store.dispatch('metas/utilisateurGet')
    },

    async save() {
      if (this.complete) {
        const utilisateur = JSON.parse(JSON.stringify(this.utilisateur))

        delete utilisateur.permissionEditable

        if (this.utilisateurIsAdministration) {
          utilisateur.administrations = utilisateur.administrations.filter(
            ({ id }) => id
          )
        } else {
          utilisateur.administrations = []
        }

        if (this.utilisateurIsEntreprise) {
          utilisateur.entreprises = utilisateur.entreprises.filter(
            ({ id }) => id
          )
        } else {
          utilisateur.entreprises = []
        }

        if (this.action === 'create') {
          if (!utilisateur.permissionId) {
            utilisateur.permissionId = 'defaut'
          }

          await this.$store.dispatch('utilisateur/add', utilisateur)
        } else {
          await this.$store.dispatch('utilisateur/update', utilisateur)
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
      this.utilisateur.permissionId = permission.id
    },

    entrepriseAdd() {
      this.utilisateur.entreprises.push({ id: '' })
    },

    entrepriseRemove(index) {
      this.utilisateur.entreprises.splice(index, 1)
    },

    administrationAdd() {
      this.utilisateur.administrations.push({ id: '' })
    },

    administrationRemove(index) {
      this.utilisateur.administrations.splice(index, 1)
    }
  }
}
</script>
