<template>
  <popup
    @popup-close="cancel"
  >
    <template slot="header">
      <div>
        <h5>Utilisateur</h5>
        <h2 class="mb-0">{{ creation ? 'Ajouter un utilisateur' : utilisateur.id }}</h2>
      </div>
    </template>

    <div v-if="creation">
      <div class="tablet-blobs">
        <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Id</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <input 
            v-model="utilisateur.id"
            type="text" 
            class="p-s"
            placeholder="Id"
          >
        </div>
      </div>
      <hr>
    </div>

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
            :class="{ active: utilisateur.permissions.find(p => p.id === permission.id) }"
          >
            <button 
              class="btn-flash py-xs px-s pill cap-first h6 mr-xs"
              @click="permissionToggle(permission)"
            >{{ permission.nom }}</button>
          </li>
        </ul>
      </div>
    </div>

    <messages :messages="messages" />

    <template slot="footer">
      <div class="tablet-blobs">
        <div class="mb tablet-mb-0 tablet-blob-1-3">
          <button
            class="btn-border rnd-xs p-s full-x"
            @click="cancel"
            @keyup.enter="cancel"
          >Annuler</button>
        </div>
        <div class="tablet-blob-2-3">
          <button
            class="btn-flash rnd-xs p-s full-x"
            @click="save"
            @keyup.enter="save"
          >Enregistrer</button>
        </div>
      </div>
    </template>
  </popup>
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
    permissionList: {
      type: Array,
      default: () => []
    },
    creation: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      id: ''
    }
  },

  computed: {
    messages () {
      return this.$store.state.utilisateur.popupMessages
    }
  },

  methods: {
    save() {
      if (this.creation) {
        this.$store.dispatch('utilisateurs/add', this.utilisateur)
      } else {
        this.$store.dispatch('utilisateur/update', this.utilisateur)
      }
      
    },

    cancel() {
      this.errorsRemove()
      this.$store.commit('popupClose')
    },

    errorsRemove () {
      this.$store.commit('utilisateur/popupMessagesRemove')
    },

    permissionToggle(permission) {
      const index = this.utilisateur.permissions.findIndex(p => {
        return p.id === permission.id
      })

      if (index === -1) {
        this.utilisateur.permissions.push(permission)
      } else {
        this.utilisateur.permissions.splice(index, 1)
      }
    }
  }
}
</script>
