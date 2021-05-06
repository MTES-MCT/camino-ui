<template>
  <Popup :messages="messages">
    <template #header>
      <h2>
        {{
          action === 'create'
            ? "Création d'un compte utilisateur"
            : 'Modification du compte utilisateur'
        }}
      </h2>
    </template>

    <div v-if="action === 'create'">
      <p>Renseignez au moins l'email, le mot de passe, le prénom et le nom.</p>
      <hr />
    </div>
    <div v-if="permissionsCheck(user, ['super', 'admin'])" class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Email</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-model="utilisateur.email"
          type="email"
          class="p-s"
          placeholder="Email"
        />
      </div>
    </div>

    <div v-if="action === 'create'">
      <hr />
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
          />
          <p class="h5 mb-0">8 caractères minimum.</p>
        </div>
      </div>
    </div>

    <hr />
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
          placeholder="0100000000"
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
          placeholder="0100000000"
        />
      </div>
    </div>

    <div v-if="utilisateur.permissionModification">
      <hr />
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Permissions</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <ul class="list-inline mb-0">
            <li
              v-for="permission in permissions"
              :key="permission.id"
              class="mb-xs"
            >
              <button
                :id="`cmn-utilisateur-edit-popup-permission-button-${permission.id}`"
                :class="{ active: utilisateur.permissionId === permission.id }"
                class="btn-flash small py-xs px-s pill cap-first mr-xs"
                @click="permissionToggle(permission)"
              >
                {{ permission.nom }}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="utilisateurIsEntreprise">
        <hr />
        <h3 class="mb-s">Entreprises</h3>
        <div v-for="(entreprise, n) in utilisateur.entreprises" :key="n">
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
                :value="{ id: e.id }"
                :disabled="
                  utilisateur.entreprises.find(({ id }) => id === e.id)
                "
              >
                {{ e.nom }}
              </option>
            </select>
            <div class="flex-right">
              <button class="btn py-s px-m rnd-xs" @click="entrepriseRemove(n)">
                <i class="icon-24 icon-minus" />
              </button>
            </div>
          </div>
        </div>

        <button
          v-if="!utilisateur.entreprises.some(({ id }) => id === '')"
          id="cmn-utilisateur-edit-popup-entreprise-button-ajouter"
          class="btn rnd-xs py-s px-m full-x flex mb h5"
          @click="entrepriseAdd"
        >
          <span class="mt-xxs">Ajouter une entreprise</span
          ><i class="icon-24 icon-plus flex-right" />
        </button>
      </div>

      <div v-if="utilisateurIsAdministration">
        <hr />
        <h3 class="mb-s">Administrations</h3>
        <div
          v-for="(administration, n) in utilisateur.administrations"
          :key="n"
        >
          <div
            v-if="administrationsDisabledIds.includes(administration.id)"
            class="p-s bg-alt mb-s"
          >
            {{ administrationNameFind(administration.id) }}
          </div>
          <div v-else class="flex full-x mb">
            <select
              id="cmn-utilisateur-edit-popup-administration-select"
              v-model="utilisateur.administrations[n]"
              class="p-s mr-s"
              :class="{
                '': !administrationsDisabledIds.includes(administration.id)
              }"
              :disabled="administrationsDisabledIds.includes(administration.id)"
            >
              <option
                v-for="a in administrationsFiltered"
                :key="a.id"
                :value="{ id: a.id }"
                :disabled="
                  utilisateur.administrations.find(({ id }) => id === a.id) ||
                  administrationsDisabledIds.includes(a.id)
                "
              >
                {{ `${a.abreviation}` }}
              </option>
            </select>
            <div class="flex-right">
              <button
                class="btn py-s px-m rnd-xs"
                @click="administrationRemove(n)"
              >
                <i class="icon-24 icon-minus" />
              </button>
            </div>
          </div>
        </div>

        <button
          v-if="
            !utilisateur.administrations.some(({ id }) => id === '') &&
            utilisateurAdministrationsLength < 1
          "
          id="cmn-utilisateur-edit-popup-administration-button-ajouter"
          class="btn rnd-xs py-s px-m full-x flex mb h5"
          @click="administrationAdd"
        >
          <span class="mt-xxs">Ajouter une administration</span
          ><i class="icon-24 icon-plus flex-right" />
        </button>
      </div>
    </div>

    <template #footer>
      <div v-if="!loading" class="tablet-blobs">
        <div class="tablet-blob-1-3 mb tablet-mb-0">
          <button class="btn-border rnd-xs p-s full-x" @click="cancel">
            Annuler
          </button>
        </div>
        <div class="tablet-blob-2-3">
          <button
            id="cmn-utilisateur-edit-popup-button-enregistrer"
            ref="save-button"
            :disabled="!complete"
            :class="{ disabled: !complete }"
            class="btn-flash rnd-xs p-s full-x"
            @click="save"
          >
            Enregistrer
          </button>
        </div>
      </div>
      <div v-else class="p-s full-x bold">Enregistrement en cours…</div>
    </template>
  </Popup>
</template>

<script>
import { permissionsCheck } from '@/utils'
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
      return this.$store.state.utilisateur.metas.permissions
    },

    entreprises() {
      return this.$store.state.utilisateur.metas.entreprises
    },

    administrations() {
      return this.$store.state.utilisateur.metas.administrations
    },

    user() {
      return this.$store.state.user.element
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
        if (!a.membre && !this.permissionsCheck(this.user, ['super'])) {
          res.push(a.id)
        }

        return res
      }, [])
    },

    administrationsFiltered() {
      const a = this.permissionsCheck(this.user, ['super'])
        ? this.administrations
        : this.administrations.filter(a => a.membre)

      return a
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

  beforeUnmount() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    async get() {
      await this.$store.dispatch('utilisateur/init')
    },

    async save() {
      if (this.complete) {
        const utilisateur = JSON.parse(JSON.stringify(this.utilisateur))

        delete utilisateur.permissionModification
        delete utilisateur.entreprisesCreation
        delete utilisateur.utilisateursCreation

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
        if (this.complete) {
          this.$refs['save-button'].focus()
          this.save()
        }
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
    },

    administrationNameFind(id) {
      const administration = this.administrations.find(a => a.id === id)

      return administration.abreviation
    },

    permissionsCheck(user, permissions) {
      return permissionsCheck(user, permissions)
    }
  }
}
</script>
