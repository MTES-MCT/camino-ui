<template>
  <div v-if="!loaded">
    <Loader />
  </div>
  <div v-else>
    <h6>Utilisateur</h6>
    <h1>
      {{
        utilisateur
          ? `${utilisateur.prenom || '–'} ${utilisateur.nom || '–'}`
          : '–'
      }}
    </h1>

    <Accordion class="mb" :slot-sub="true" :slot-buttons="true">
      <template #title>
        <span class="cap-first"> Profil </span>
      </template>

      <template v-if="utilisateur.modification" #buttons>
        <button
          v-if="
            (user && user.id === utilisateur.id) ||
            permissionsCheck(user, 'super')
          "
          id="cmn-utilisateur-button-password-popup"
          class="btn-alt py-s px-m"
          title="changer de mot de passe"
          @click="passwordPopupOpen"
        >
          <i class="icon-24 icon-key" />
        </button>

        <button
          v-if="user && user.id === utilisateur.id"
          id="cmn-utilisateur-button-email-popup"
          class="btn-alt py-s px-m"
          title="changer d'email"
          @click="emailPopupOpen"
        >
          <i class="icon-24 icon-at" />
        </button>

        <button
          id="cmn-utilisateur-button-popup-supprimer"
          class="btn-alt py-s px-m"
          title="supprimer le compte utilisateur"
          @click="removePopupOpen"
        >
          <i class="icon-24 icon-trash" />
        </button>

        <button
          id="cmn-utilisateur-button-popup-editer"
          class="btn-alt py-s px-m"
          title="modifier le compte utilisateur"
          @click="editPopupOpen"
        >
          <i class="icon-24 icon-pencil" />
        </button>
      </template>

      <template #sub>
        <div class="px-m pt-m">
          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6>Prénom</h6>
            </div>
            <div class="tablet-blob-3-4">
              <p>{{ utilisateur.prenom || '–' }}</p>
            </div>
          </div>

          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6>Nom</h6>
            </div>
            <div class="tablet-blob-3-4">
              <p>{{ utilisateur.nom || '–' }}</p>
            </div>
          </div>

          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6>Email</h6>
            </div>
            <div class="tablet-blob-3-4">
              <p>{{ utilisateur.email || '–' }}</p>
            </div>
          </div>

          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6>Téléphone fixe</h6>
            </div>
            <div class="tablet-blob-3-4">
              <p>{{ utilisateur.telephoneFixe || '–' }}</p>
            </div>
          </div>

          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6>Téléphone mobile</h6>
            </div>
            <div class="tablet-blob-3-4">
              <p>{{ utilisateur.telephoneMobile || '–' }}</p>
            </div>
          </div>

          <div v-if="utilisateur.permissionModification" class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6>Permissions</h6>
            </div>
            <div class="tablet-blob-3-4">
              <Pill v-if="utilisateur.permission" class="mb">
                {{ utilisateur.permission.nom }}
              </Pill>
              <div v-else class="mb">–</div>
            </div>
          </div>

          <div v-if="utilisateur.entreprises.length" class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6>
                Entreprise{{ utilisateur.entreprises.length > 1 ? 's' : '' }}
              </h6>
            </div>

            <div class="tablet-blob-3-4">
              <ul class="list-inline">
                <li
                  v-for="e in utilisateur.entreprises"
                  :key="e.id"
                  class="mb-xs"
                >
                  <RouterLink
                    :to="{ name: 'entreprise', params: { id: e.id } }"
                    class="btn-border small py-s px-m rnd-xs mr-xs"
                    tag="button"
                  >
                    {{ e.legalSiren ? `${e.nom} (${e.legalSiren})` : e.nom }}
                  </RouterLink>
                </li>
              </ul>
            </div>
          </div>

          <div v-if="utilisateur.administrations.length" class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6>Administration</h6>
            </div>

            <div class="tablet-blob-3-4">
              <ul class="list-prefix">
                <li v-for="a in utilisateur.administrations" :key="a.id">
                  {{ `${a.nom}${a.service ? ` - ${a.service}` : ''}` }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </template>
    </Accordion>
  </div>
</template>

<script>
import { cloneAndClean, permissionsCheck } from '../utils/index'
import Accordion from './_ui/accordion.vue'
import Pill from './_ui/pill.vue'
import Loader from './_ui/loader.vue'
import UtilisateurEditPopup from './utilisateur/edit-popup.vue'
import UtilisateurRemovePopup from './utilisateur/remove-popup.vue'
import UtilisateurPasswordPopup from './utilisateur/password-popup.vue'
import UtilisateurEmailPopup from './utilisateur/email-popup.vue'

export default {
  components: {
    Accordion,
    Pill,
    Loader
  },

  computed: {
    utilisateur() {
      return this.$store.state.utilisateur.current
    },

    user() {
      return this.$store.state.user.current
    },

    loaded() {
      return !!this.utilisateur
    }
  },

  watch: {
    user: 'get',
    '$route.params.id': async function () {
      await this.get()
    }
  },

  async created() {
    await this.get()
  },

  beforeUnmount() {
    this.$store.commit('utilisateur/reset')
  },

  methods: {
    async get() {
      await this.$store.dispatch('utilisateur/get', this.$route.params.id)
    },

    editPopupOpen() {
      const utilisateur = cloneAndClean(this.utilisateur)

      utilisateur.entreprises = utilisateur.entreprises.map(({ id }) => ({
        id
      }))

      utilisateur.administrations = utilisateur.administrations.map(
        ({ id }) => ({ id })
      )

      utilisateur.permissionId = utilisateur.permission.id

      delete utilisateur.permission

      delete utilisateur.sections
      delete utilisateur.modification
      delete utilisateur.suppression

      this.$store.commit('popupOpen', {
        component: UtilisateurEditPopup,
        props: {
          utilisateur,
          action: 'edit'
        }
      })
    },

    removePopupOpen() {
      this.$store.commit('popupOpen', {
        component: UtilisateurRemovePopup,
        props: {
          utilisateur: cloneAndClean(this.utilisateur)
        }
      })
    },

    passwordPopupOpen() {
      this.$store.commit('popupOpen', {
        component: UtilisateurPasswordPopup,
        props: {
          utilisateur: cloneAndClean(this.utilisateur)
        }
      })
    },

    emailPopupOpen() {
      this.$store.commit('popupOpen', {
        component: UtilisateurEmailPopup
      })
    },

    permissionsCheck(user, permissions) {
      return permissionsCheck(user, permissions)
    }
  }
}
</script>
