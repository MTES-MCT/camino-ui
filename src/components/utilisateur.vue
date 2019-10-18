<template>
  <Card v-if="!loaded">
    <Loader />
  </Card>
  <Card v-else>
    <h6>Utilisateur</h6>
    <h1>
      {{
        utilisateur
          ? `${utilisateur.prenom || "–"} ${utilisateur.nom || "–"}`
          : "–"
      }}
    </h1>
    <Accordion
      class="mb"
      :sub="true"
    >
      <template slot="title">
        <span class="cap-first">
          Profil
        </span>
      </template>

      <template
        v-if="permissionsCheck(['super', 'admin']) || user.id === utilisateur.id"
        slot="buttons"
      >
        <button
          class="btn-alt py-s px-m"
          @click="passwordPopupOpen"
        >
          <i class="icon-24 icon-key" />
        </button>

        <button
          class="btn-alt py-s px-m"
          @click="removePopupOpen"
        >
          <i class="icon-24 icon-trash" />
        </button>

        <button
          class="btn-alt py-s px-m"
          @click="editPopupOpen"
        >
          <i class="icon-24 icon-pencil" />
        </button>
      </template>

      <template slot="sub">
        <div class="tablet-blobs">
          <div class="tablet-blob-1-4">
            <h6 class="mt-xs">
              Prénom
            </h6>
          </div>
          <div class="tablet-blob-3-4">
            <p>{{ utilisateur.prenom || "–" }}</p>
          </div>
        </div>
        <div class="tablet-blobs">
          <div class="tablet-blob-1-4">
            <h6 class="mt-xs">
              Nom
            </h6>
          </div>
          <div class="tablet-blob-3-4">
            <p>{{ utilisateur.nom || "–" }}</p>
          </div>
        </div>

        <div class="tablet-blobs">
          <div class="tablet-blob-1-4">
            <h6 class="mt-xs">
              Email
            </h6>
          </div>
          <div class="tablet-blob-3-4">
            <p>{{ utilisateur.email || "–" }}</p>
          </div>
        </div>

        <div class="tablet-blobs">
          <div class="tablet-blob-1-4">
            <h6 class="mt-xs">
              Téléphone fixe
            </h6>
          </div>
          <div class="tablet-blob-3-4">
            <p>{{ utilisateur.telephoneFixe || "–" }}</p>
          </div>
        </div>

        <div class="tablet-blobs">
          <div class="tablet-blob-1-4">
            <h6 class="mt-xs">
              Téléphone mobile
            </h6>
          </div>
          <div class="tablet-blob-3-4">
            <p>{{ utilisateur.telephoneMobile || "–" }}</p>
          </div>
        </div>

        <div
          v-if="permissionsCheck(['super', 'admin'])"
          class="tablet-blobs"
        >
          <div class="tablet-blob-1-4">
            <h6 class="mt-xs">
              Permissions
            </h6>
          </div>
          <div class="tablet-blob-3-4">
            <Pill
              v-if="utilisateur.permission"
              class="mb"
            >
              {{ utilisateur.permission.nom }}
            </Pill>
            <div
              v-else
              class="mb"
            >
              –
            </div>
          </div>
        </div>

        <div
          v-if="utilisateur.entreprises.length"
          class="tablet-blobs"
        >
          <div class="tablet-blob-1-4">
            <h6 class="mt-xs">
              Entreprise
            </h6>
          </div>

          <div class="tablet-blob-3-4">
            <p>
              {{ utilisateur.entreprises.map(({nom, legalSiren}) => `${nom} (${legalSiren})`).join(', ') }}
            </p>
          </div>
        </div>

        <div
          v-if="utilisateur.administrations.length"
          class="tablet-blobs"
        >
          <div class="tablet-blob-1-4">
            <h6 class="mt-xs">
              Administration
            </h6>
          </div>

          <div class="tablet-blob-3-4">
            <p>
              {{ utilisateur.administrations.map(({nom}) => `${nom})`).join(', ') }}
            </p>
          </div>
        </div>
      </template>
    </Accordion>
  </Card>
</template>

<script>
import Card from './ui/card.vue'
import Accordion from './ui/accordion.vue'
import Pill from './ui/pill.vue'
import Loader from './ui/loader.vue'
import UtilisateurEditPopup from './utilisateur/edit-popup.vue'
import UtilisateurRemovePopup from './utilisateur/remove-popup.vue'
import UtilisateurPasswordPopup from './utilisateur/password-popup.vue'

export default {
  components: {
    Accordion,
    Pill,
    Loader,
    Card
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
    $route: 'get',

    user: 'get'
  },

  created() {
    this.get()
  },

  beforeDestroy() {
    this.$store.commit('utilisateur/reset')
  },

  methods: {
    get() {
      this.$store.dispatch('utilisateur/get', this.$route.params.id)
    },
    editPopupOpen() {
      const utilisateur = JSON.parse(JSON.stringify(this.utilisateur))

      utilisateur.entreprisesIds = utilisateur.entreprises.map(({ id }) => id)

      delete utilisateur.entreprises

      utilisateur.administrationsIds = utilisateur.administrations.map(({ id }) => id)

      delete utilisateur.administrations

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
          utilisateur: JSON.parse(JSON.stringify(this.utilisateur))
        }
      })
    },
    passwordPopupOpen() {
      this.$store.commit('popupOpen', {
        component: UtilisateurPasswordPopup,
        props: {
          utilisateur: JSON.parse(JSON.stringify(this.utilisateur))
        }
      })
    }
  }
}
</script>
