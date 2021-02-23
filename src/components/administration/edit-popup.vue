<template>
  <Popup :messages="messages">
    <template #header>
      <div>
        <h2 class="mb-0">
          {{ creation ? "Ajout d'une " : "Modification de l'" }}administration
        </h2>
      </div>
    </template>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Nom</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input v-model="administration.nom" type="text" class="p-s" />
      </div>
    </div>

    <hr />

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Type</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <select v-model="administration.typeId" class="p-s">
          <option
            v-for="type in types"
            :key="type.id"
            :value="type.id"
            :disabled="administration.typeId === type.id"
          >
            {{ type.nom }}
          </option>
        </select>
      </div>
    </div>

    <hr />

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Abréviation</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input v-model="administration.abreviation" type="text" class="p-s" />
      </div>
    </div>

    <hr />

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6 class="mb-xs">Service</h6>
        <p class="h6 italic mb-0">Optionnel</p>
      </div>
      <div class="mb tablet-blob-2-3">
        <input v-model="administration.service" type="text" class="p-s" />
      </div>
    </div>

    <hr />

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6 class="mb-xs">Téléphone</h6>
        <p class="h6 italic mb-0">Optionnel</p>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-model="administration.telephone"
          type="text"
          class="p-s"
          placeholder="0100000000"
        />
      </div>
    </div>

    <hr />
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6 class="mb-xs">Adresse électronique</h6>
        <p class="h6 italic mb-0">Optionnel</p>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-model="administration.email"
          type="text"
          class="p-s"
          placeholder="email@domain.tld"
        />
      </div>
    </div>

    <hr />
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6 class="mb-xs">Site internet</h6>
        <p class="h6 italic mb-0">Optionnel</p>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-model="administration.url"
          type="text"
          class="p-s"
          placeholder="http://…"
        />
      </div>
    </div>

    <hr />

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6 class="mb-xs">Adresse 1</h6>
        <p class="h6 italic mb-0">Optionnel</p>
      </div>
      <div class="mb tablet-blob-2-3">
        <input v-model="administration.adresse1" type="text" class="p-s" />
      </div>
    </div>

    <hr />

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6 class="mb-xs">Adresse 2</h6>
        <p class="h6 italic mb-0">Optionnel</p>
      </div>
      <div class="mb tablet-blob-2-3">
        <input v-model="administration.adresse2" type="text" class="p-s" />
      </div>
    </div>

    <hr />

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6 class="mb-xs">Code Postal</h6>
        <p class="h6 italic mb-0">Optionnel</p>
      </div>
      <div class="mb tablet-blob-2-3">
        <input v-model="administration.codePostal" type="text" class="p-s" />
      </div>
    </div>

    <hr />

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6 class="mb-xs">Commune</h6>
        <p class="h6 italic mb-0">Optionnel</p>
      </div>
      <div class="mb tablet-blob-2-3">
        <input v-model="administration.commune" type="text" class="p-s" />
      </div>
    </div>

    <hr />

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6 class="mb-xs">Cedex</h6>
        <p class="h6 italic mb-0">Optionnel</p>
      </div>
      <div class="mb tablet-blob-2-3">
        <input v-model="administration.cedex" type="text" class="p-s" />
      </div>
    </div>

    <hr />

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6 class="mb-xs">Lien</h6>
        <p class="h6 italic mb-0">Optionnel</p>
      </div>
      <div class="mb tablet-blob-2-3">
        <label v-for="lien in liens" :key="lien.id">
          <input
            v-model="lienCurrent"
            :name="lien.id"
            :value="lien.id"
            type="radio"
            class="p-s"
          />
          {{ lien.nom }}
        </label>

        <p class="h6 italic mb-0">
          Donne le droit de création et d'édition des démarches et étapes sur
          les titres liés à ce territoire.
        </p>
      </div>
    </div>

    <hr />

    <div v-if="lienCurrent === 'departement'" class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6 class="mb-xs">Département</h6>
        <p class="h6 italic mb-0">Optionnel</p>
      </div>
      <div class="mb tablet-blob-2-3">
        <select v-model="administration.departementId" class="p-s">
          <option
            v-for="departement in departements"
            :key="departement.id"
            :value="departement.id"
            :disabled="administration.departementId === departement.id"
            >{{ departement.nom }}</option
          >
        </select>
      </div>
    </div>

    <div v-if="lienCurrent === 'region'" class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6 class="mb-xs">Région</h6>
        <p class="h6 italic mb-0">Optionnel</p>
      </div>
      <div class="mb tablet-blob-2-3">
        <select v-model="administration.regionId" class="p-s">
          <option
            v-for="region in regions"
            :key="region.id"
            :value="region.id"
            :disabled="administration.regionId === region.id"
          >
            {{ region.nom }}
          </option>
        </select>
      </div>
    </div>

    <template #footer>
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
        <div class="tablet-blob-2-3">
          <button
            v-if="!loading"
            class="btn-flash rnd-xs p-s full-x"
            @click="save"
          >
            Enregistrer
          </button>
          <div v-else class="p-s full-x bold">Enregistrement en cours…</div>
        </div>
      </div>
    </template>
  </Popup>
</template>

<script>
import Popup from '../_ui/popup.vue'

export default {
  name: 'CaminoAdministrationEditPopup',

  components: {
    Popup
  },

  props: {
    administration: { type: Object, default: () => ({}) },
    creation: { type: Boolean, default: false }
  },

  data() {
    return {
      liens: [
        { id: 'aucun', nom: 'Aucun' },
        { id: 'departement', nom: 'Département' },
        { id: 'region', nom: 'Région' }
      ],
      lienCurrent: 'aucun'
    }
  },

  computed: {
    loading() {
      return this.$store.state.popup.loading
    },

    messages() {
      return this.$store.state.popup.messages
    },

    departements() {
      return this.$store.state.administration.metas.departements
    },

    regions() {
      return this.$store.state.administration.metas.regions
    },

    types() {
      return this.$store.state.administration.metas.types
    }
  },

  created() {
    if (this.administration.regionId) {
      this.lienCurrent = 'region'
    } else if (this.administration.departementId) {
      this.lienCurrent = 'departement'
    }

    this.get()
    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    async get() {
      await this.$store.dispatch('administration/metasGet')
    },

    async save() {
      const administration = JSON.parse(JSON.stringify(this.administration))

      if (this.lienCurrent === 'region') {
        administration.departementId = null
      } else if (this.lienCurrent === 'departement') {
        administration.regionId = null
      } else {
        administration.departementId = null
        administration.regionId = null
      }

      await this.$store.dispatch('administration/update', administration)
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
    }
  }
}
</script>
