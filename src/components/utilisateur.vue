<template>
  <div>
    <loader v-if="!loaded" />
    <card v-else>
      <h1 class="mt-xs">{{ utilisateur.id }}</h1>

      <accordion 
        class="mb" 
        :sub="true"
      >
        <template slot="title">
          <span class="cap-first">Profil</span>
        </template>

        <template 
          v-if="utilisateur.id" 
          slot="buttons"
        >
          <button
            class="btn-alt py-s px-m"
            @click="editPopupOpen"
          >
            <i 
              class="icon-24 icon-24-edit"
            />
          </button>
        </template>

        <template slot="sub">
          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6 class="mt-xs">Nom</h6>
            </div>
            <div class="tablet-blob-3-4">
              <p>{{ utilisateur.nom || '–' }}</p>
            </div>
          </div>
          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6 class="mt-xs">Prénom</h6>
            </div>
            <div class="tablet-blob-3-4">
              <p>{{ utilisateur.prenom || '–' }}</p>
            </div>
          </div>
          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6 class="mt-xs">Email</h6>
            </div>
            <div class="tablet-blob-3-4">
              <p>{{ utilisateur.email || '–' }}</p>
            </div>
          </div>
          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6 class="mt-xs">Téléphone fixe</h6>
            </div>
            <div class="tablet-blob-3-4">
              <p>{{ utilisateur.telephoneFixe || '–' }}</p>
            </div>
          </div>
          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6 class="mt-xs">Téléphone mobile</h6>
            </div>
            <div class="tablet-blob-3-4">
              <p>{{ utilisateur.telephoneMobile || '–' }}</p>
            </div>
          </div>
          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h6 class="mt-xs">Permissions</h6>
            </div>
            <div class="tablet-blob-3-4">
              <pill-list :elements="utilisateur.permissions.map(p => p.nom)" />
            </div>
          </div>
        </template>
      </accordion>
    </card>
  </div>
</template>

<script>
import Card from './ui/card.vue'
import Accordion from './ui/accordion.vue'
import PillList from './ui/pill-list.vue'
import Loader from './ui/loader.vue'
import EditPopup from './utilisateur/edit-popup.vue'


export default {
  components: {
    Accordion,
    PillList,
    Loader,
    Card
  },

  computed: {
    utilisateur () {
      return this.$store.state.utilisateur.current
    },
    permissionList () {
      return this.$store.state.utilisateurs.permissions
    },
    loaded () {
      return !!this.utilisateur
    }
  },

  watch: {
    '$route': 'get'
  },

  created () {
    this.get()
  },

  beforeDestroy () {
    this.$store.commit('utilisateur/reset')
  },

  methods: {
    get () {
      this.$store.dispatch('utilisateur/get', { id: this.$route.params.id })
    },
    editPopupOpen () {
      this.$store.commit('popupOpen', { 
        component: EditPopup,
        props: {
          utilisateur: JSON.parse(JSON.stringify(this.utilisateur)),
          permissionList: JSON.parse(JSON.stringify(this.permissionList))
        }, 
        closeKey: true
      })
    },
    editPopupClose () {
      this.$store.commit('popupClose')
    },
  }
}
</script>
