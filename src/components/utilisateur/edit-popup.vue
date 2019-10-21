<template>
  <Popup>
    <template slot="header">
      <div>
        <h2 class="mb-0">
          {{
            action === 'create'
              ? "Création d'un compte utilisateur"
              : "Modification du compte utilisateur"
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
          v-model="utilisateur.email"
          type="email"
          class="p-s"
          placeholder="Email"
        >
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

    <div v-if="permissionsCheck(['super', 'admin'])">
      <hr>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
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
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
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
            <li class="mr">
              <label>
                <input
                  v-model="lien"
                  type="radio"
                  :value="'administration'"
                  :checked="lien === 'administration'"
                  @change="lienReset"
                >Administration
              </label>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="lien === 'entreprise'">
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
            :class="{'mb-s': entreprisesLength, 'mb': !entreprisesLength}"
          >
            <select
              v-model="utilisateur.entreprisesIds[n]"
              type="text"
              class="p-s mr-s"
            >
              <option
                v-for="entreprise in entreprises"
                :key="entreprise.id"
                :value="entreprise.id"
                :disabled="utilisateur.entreprisesIds.find(id => id === entreprise.id)"
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
          class="btn-border rnd-xs py-s px-m full-x flex"

          :class="{'mb-s': entreprisesLength, 'mb': !entreprisesLength}"
          @click="entrepriseAdd"
        >
          Ajouter une entreprise<i class="icon-24 icon-plus flex-right" />
        </button>
      </div>

      <div v-if="lien === 'administration'">
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
            :class="{'mb-s': administrationsLength, 'mb': !administrationsLength}"
          >
            <select
              v-model="utilisateur.administrationsIds[n]"
              type="text"
              class="p-s mr-s"
            >
              <option
                v-for="administration in administrations"
                :key="administration.id"
                :value="administration.id"
                :disabled="utilisateur.administrationsIds.find(id => id === administration.id)"
              >
                {{ administration.nom }} {{ administration.service }}
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
          class="btn-border rnd-xs py-s px-m full-x flex"

          :class="{'mb-s': administrationsLength, 'mb': !administrationsLength}"
          @click="administrationAdd"
        >
          Ajouter une administration<i class="icon-24 icon-plus flex-right" />
        </button>
      </div>
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
      validator: val => ['edit', 'create'].includes(val)
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

      return (
        this.utilisateur.nom &&
        this.utilisateur.prenom &&
        this.utilisateur.id &&
        this.utilisateur.email
      )
    },

    entreprises() {
      return this.$store.state.entreprises.list
    },
    entreprisesLength() {
      return this.utilisateur.entreprisesIds.filter(id => id).length
    },

    administrations() {
      return this.$store.state.administrations.list
    },
    administrationsLength() {
      return this.utilisateur.administrationsIds.filter(id => id).length
    }
  },

  created() {
    document.addEventListener('keyup', this.keyup)

    if (this.administrationsLength) {
      this.lien = 'administration'
    } else if (this.entreprisesLength) {
      this.lien = 'entreprise'
    }
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    save() {
      if (this.complete) {
        const utilisateur = JSON.parse(JSON.stringify(this.utilisateur))

        if (utilisateur.permission) {
          utilisateur.permissionId = utilisateur.permission.id

          delete utilisateur.permission
        }

        utilisateur.entreprisesIds = utilisateur.entreprisesIds.filter(id => id)

        utilisateur.administrationsIds = utilisateur.administrationsIds.filter(id => id)

        if (this.action === 'create') {
          this.$store.dispatch('utilisateurs/add', utilisateur)
        } else {
          this.$store.dispatch('utilisateurs/update', utilisateur)
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
      this.utilisateur.entreprisesIds = []
      this.utilisateur.administrationsIds = []
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
