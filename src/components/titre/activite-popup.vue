<template>
  <Popup>
    <template slot="header">
      <div>
        <h5>
          <span class="cap-first">
            {{ activite.type.nom }} complete: {{ complete }}
          </span>
        </h5>
        <h2 class="cap-first mb-0">
          <span v-if="activite.periode">{{ activite.periode.nom }}</span> {{ activite.annee }}
        </h2>
      </div>
    </template>


    <div
      v-if="editable"
      class="p-s bg-info color-bg mb"
    >
      Besoin d'aide pour remplir ce rapport ? Appelez le 06.61.26.42.89
    </div>

    <div
      v-for="s in activite.sections"
      :key="s.id"
    >
      <h4 v-if="s.nom">
        {{ s.nom }}
      </h4>
      <div
        v-for="e in s.elements"
        :key="e.id"
      >
        <div class="tablet-blobs">
          <div
            v-if="e.nom"
            class="tablet-blob-1-3 tablet-pt-s pb-s"
          >
            <h6>{{ e.nom }}</h6>
          </div>
          <div
            class="mb"
            :class="{'tablet-blob-2-3': e.nom, 'tablet-blob-1': !e.nom }"
          >
            <div v-if="e.type === 'number'">
              <input
                v-if="editable"
                v-model.number="activite.contenu[s.id][e.id]"
                type="number"
                class="p-s mb-s"
                placeholder="…"
              >
              <p
                v-else
                :class="{'color-warning': !activite.contenu[s.id] || !(activite.contenu[s.id][e.id] || activite.contenu[s.id][e.id] === 0) }"
                class="pt-xs"
              >
                {{ activite.contenu[s.id] && (activite.contenu[s.id][e.id] || activite.contenu[s.id][e.id] === 0) ? numberFormat(activite.contenu[s.id][e.id]) : 'À compléter pour valider' }}
              </p>
            </div>


            <div
              v-else-if="e.type === 'checkbox'"
            >
              <div
                v-if="editable"
              >
                <label
                  v-for="(nom, id) in e.valeurs"
                  :key="id"
                >
                  <input
                    v-model="checkboxesValues[s.id][e.id][id]"
                    type="checkbox"
                    @change="checkboxUpdate($event, s.id, e.id, id)"
                  >{{ nom }}
                </label>
              </div>

              <p
                v-else
                :class="{'color-warning': !(activite.contenu[s.id] && activite.contenu[s.id][e.id] && Object.keys(activite.contenu[s.id][e.id]).filter(val => activite.contenu[s.id][e.id][val]).length)}"
                class="cap-first"
              >
                {{ activite.contenu[s.id] && activite.contenu[s.id][e.id] && activite.contenu[s.id][e.id].split(',').map(id => e.valeurs[id]).join(', ') || 'À compléter pour valider' }}
              </p>
            </div>

            <div
              v-else-if="e.type === 'textarea'"
            >
              <textarea
                v-if="editable"
                v-model="activite.contenu[s.id][e.id]"
                class="p-s mb-s"
              />
              <p v-else-if="activite.contenu[s.id][e.id]">
                {{ activite.contenu[s.id][e.id] }}
              </p>
            </div>
            <!-- eslint-disable vue/no-v-html -->
            <p
              v-if="editable"
              class="h5 mb-0"
              v-html="e.description"
            />
          </div>
        </div>

        <hr>
      </div>
    </div>

    <div
      class="p-s bg-warning color-bg bold mb"
      :class="{ hide: !complete }"
    >
      Une fois validé ce formulaire ne sera plus modifiable.
    </div>

    <template slot="footer">
      <Messages :messages="messages" />

      <div
        v-if="editable"
        class="tablet-blobs"
      >
        <div class="mb tablet-mb-0 tablet-blob-1-3">
          <button
            class="btn-border rnd-xs p-s full-x"
            @click="cancel"
          >
            Annuler
          </button>
        </div>
        <div
          class="tablet-blob-2-3"
        >
          <button
            class="btn-flash rnd-xs p-s full-x"
            @click="preview"
          >
            Prévisualiser
          </button>
        </div>
      </div>
      <div
        v-else
        class="tablet-blobs"
      >
        <div class="mb tablet-blob-1-3 tablet-mb-0">
          <button
            class="btn-border rnd-xs p-s full-x"
            @click="edit"
          >
            Modifier
          </button>
        </div>
        <div
          class="mb tablet-blob-1-3 tablet-mb-0"
        >
          <button
            class="rnd-xs p-s full-x"
            :class="{ 'btn-flash': !complete, 'btn-border': complete }"
            @click="save(false)"
          >
            Enregistrer
          </button>
        </div>
        <div
          class="tablet-blob-1-3"
          :class="{ disabled: !complete }"
        >
          <button
            class="btn-flash rnd-xs p-s full-x"
            @click="complete && save(true)"
          >
            Valider
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
  name: 'CaminoTitreActivitesRapportEditPopup',

  components: {
    Popup,
    Messages
  },

  props: {
    activite: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      editable: true,
      checkboxesValues: []
    }
  },

  computed: {
    messages() {
      return this.$store.state.popup.messages
    },

    complete() {
      return this.activite.sections.reduce(
        (activiteComplete, s) =>
          s.elements.reduce((sectionComplete, e) => {
            const value =
              this.activite.contenu[s.id] && this.activite.contenu[s.id][e.id]

            console.log('complete', value, sectionComplete)
            return sectionComplete && !!(value || value === 0)
          }, activiteComplete),
        true
      )
    }
  },

  created() {
    document.addEventListener('keyup', this.keyup)

    this.checkboxesValues = this.activite.sections.reduce((sectionIds, s) => {
      const elementIds = s.elements.reduce(
        (elementIds, e) =>
          e.type === 'checkbox'
            ? Object.assign(elementIds, {
                [e.id]: Object.keys(e.valeurs).reduce((valeurIds, id) => {
                  const value = !!(
                    this.activite.contenu[s.id] &&
                    this.activite.contenu[s.id][e.id] &&
                    this.activite.contenu[s.id][e.id]
                      .split(',')
                      .find(vId => vId === id)
                  )
                  return Object.assign(valeurIds, { [id]: value })
                }, {})
              })
            : elementIds,
        {}
      )

      return Object.keys(elementIds).length
        ? Object.assign(sectionIds, { [s.id]: elementIds })
        : sectionIds
    }, {})
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    preview() {
      this.editable = false
    },

    edit() {
      this.editable = true
    },

    save(confirmation) {
      if (confirmation && this.complete) {
        this.activite.statut.id = 'dep'
      } else {
        this.activite.statut.id = 'enc'
      }

      this.$store.dispatch('titreActivites/update', this.activite)
    },

    cancel() {
      this.errorsRemove()
      this.$store.commit('popupClose')
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 27) {
        if (this.editable) {
          this.cancel()
        } else {
          this.edit()
        }
      } else if ((e.which || e.keyCode) === 13) {
        if (this.editable) {
          this.preview()
        } else {
          if (this.complete) {
            this.save(true)
          } else {
            this.save(false)
          }
        }
      }
    },

    errorsRemove() {
      this.$store.commit('popupMessagesRemove')
    },

    checkboxUpdate(event, sectionId, elementId, valeurId) {
      if (event.target.checked) {
        this.activite.contenu[sectionId] =
          this.activite.contenu[sectionId] || {}

        this.activite.contenu[sectionId][elementId] = this.activite.contenu[
          sectionId
        ][elementId]
          ? this.activite.contenu[sectionId][elementId]
              .split(',')
              .concat(valeurId)
              .join(',')
          : valeurId
      } else {
        this.activite.contenu[sectionId][elementId] = this.activite.contenu[
          sectionId
        ][elementId]
          .split(',')
          .filter(e => e !== valeurId)
          .join(',')

        if (!this.activite.contenu[sectionId][elementId]) {
          delete this.activite.contenu[sectionId][elementId]
        }
      }
    }
  }
}
</script>
