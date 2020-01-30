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
          v-for="(entrepriseId, n) in utilisateur.entreprisesIds"
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
              v-model="utilisateur.entreprisesIds[n]"
              type="text"
              class="p-s mr-s"
            >
              <option
                v-for="entreprise in entreprises"
                :key="entreprise.id"
                :value="entreprise.id"
                :disabled="
                  utilisateur.entreprisesIds.find(id => id === entreprise.id)
                "
              >
                {{ entreprise.nom }}
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
          v-if="!utilisateur.entreprisesIds.includes('')"
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
          v-for="(administrationId, n) in utilisateur.administrationsIds"
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
              v-model="utilisateur.administrationsIds[n]"
              type="text"
              class="p-s mr-s"
            >
              <option
                v-for="administration in administrations"
                :key="administration.id"
                :value="administration.id"
                :disabled="
                  utilisateur.administrationsIds.find(
                    id => id === administration.id
                  )
                "
              >
                {{ `${administration.abreviation}` }}
              </option>
            </select>
            <div class="flex-right">
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
          v-if="!utilisateur.administrationsIds.includes('')"
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
      return this.utilisateur.entreprisesIds.filter(id => id).length
    },

    utilisateurAdministrationsLength() {
      return this.utilisateur.administrationsIds.filter(id => id).length
    },

    utilisateurIsEntreprise() {
      return ['entreprise'].includes(this.utilisateur.permissionId)
    },

    utilisateurIsAdministration() {
      return ['admin', 'editeur', 'lecteur'].includes(
        this.utilisateur.permissionId
      )
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
          utilisateur.administrationsIds = utilisateur.administrationsIds.filter(
            id => id
          )
        } else {
          utilisateur.administrationsIds = []
        }

        if (this.utilisateurIsEntreprise) {
          utilisateur.entreprisesIds = utilisateur.entreprisesIds.filter(
            id => id
          )
        } else {
          utilisateur.entreprisesIds = []
        }

        if (this.action === 'create') {
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
      this.utilisateur.entreprisesIds.push('')
    },

    entrepriseRemove(index) {
      this.utilisateur.entreprisesIds.splice(index, 1)
    },

    administrationAdd() {
      this.utilisateur.administrationsIds.push('')
    },

    administrationRemove(index) {
      this.utilisateur.administrationsIds.splice(index, 1)
    }
  }
}
</script>
