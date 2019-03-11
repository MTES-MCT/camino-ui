<template>
  <Popup>
    <template slot="header">
      <div>
        <h5>
          <span class="cap-first">
            {{ activite.type.nom }}
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
      v-for="section in sections"
      :key="section.id"
    >
      <h4 v-if="section.nom">
        {{ section.nom }}
      </h4>
      <div
        v-for="element in section.elements"
        :key="element.id"
      >
        <div class="tablet-blobs">
          <div
            v-if="element.nom"
            class="tablet-blob-1-3 tablet-pt-s pb-s"
          >
            <h6>{{ element.nom }}</h6>
          </div>
          <div
            class="mb"
            :class="{'tablet-blob-2-3': element.nom, 'tablet-blob-1': !element.nom }"
          >
            <div v-if="element.type === 'number'">
              <input
                v-if="editable"
                v-model.number="activite.contenu[section.id][element.id]"
                type="number"
                class="p-s mb-s"
                placeholder="…"
              >
              <p
                v-else
                :class="{'color-warning': !(activite.contenu[section.id][element.id] || activite.contenu[section.id][element.id] === 0) }"
                class="pt-xs"
              >
                {{ activite.contenu[section.id][element.id] || activite.contenu[section.id][element.id] === 0 ? numberFormat(activite.contenu[section.id][element.id]) : 'À compléter pour valider' }}
              </p>
            </div>


            <div
              v-else-if="element.type === 'checkbox'"
            >
              <div
                v-if="editable"
              >
                <label
                  v-for="valeur in element.valeurs"
                  :key="valeur.id"
                >
                  <input
                    v-model="activite.contenu[section.id][element.id][valeur.id]"
                    type="checkbox"
                  >{{ valeur.nom }}
                </label>
              </div>

              <p
                v-else
                :class="{'color-warning': !Object.keys(activite.contenu[section.id][element.id]).filter(val => activite.contenu[section.id][element.id][val]).length}"
              >
                {{ element.valeurs.filter(v => Object.keys(activite.contenu[section.id][element.id]).filter(id => activite.contenu[section.id][element.id][id]).find(id => id === v.id)).map(v => v.nom).join(', ') || 'À compléter pour valider' }}
              </p>
            </div>


            <textarea
              v-else-if="element.type === 'textarea'"
              v-model="activite.contenu[section.id][element.id]"
              class="p-s mb-s"
            />
            <!-- eslint-disable vue/no-v-html -->
            <p
              class="h5 mb-0"
              v-html="element.description"
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
      editable: true
    }
  },

  computed: {
    messages() {
      return this.$store.state.popup.messages
    },

    sections() {
      return this.activite.type.champs.sections.map(s => {
        s.elements = s.elements.reduce(
          (elements, e) =>
            !e.frequenceElementIds ||
            (e.frequenceElementIds &&
              e.frequenceElementIds.find(
                id => id === this.activite.periode.id
              ) > 0)
              ? [...elements, e]
              : elements,
          []
        )

        return s
      })
    },

    complete() {
      return this.sections.reduce(
        (res, s) =>
          s.elements.reduce((bool, e) => {
            const value = this.activite.contenu[s.id][e.id]
            if (typeof value === 'object' && value !== null) {
              return bool && Object.keys(value).length > 0
            } else {
              return bool && (value || value === 0)
            }
          }, res),
        true
      )
    }
  },

  created() {
    document.addEventListener('keyup', this.keyup)

    this.sections.forEach(s => {
      s.elements.forEach(e => {
        if (e.type === 'checkbox') {
          if (
            this.activite.contenu[s.id] &&
            this.activite.contenu[s.id][e.id]
          ) {
            this.activite.contenu[s.id][e.id] = this.activite.contenu[s.id][
              e.id
            ]
              .split(',')
              .reduce((r, k) => Object.assign(r, { [k]: true }), {})
          } else {
            this.activite.contenu[s.id] = this.activite.contenu[s.id] || {}
            this.activite.contenu[s.id][e.id] = {}
          }
        }
      })
    })
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
      this.activite.type.champs.sections.forEach(s => {
        s.elements.forEach(e => {
          if (e.type === 'checkbox') {
            this.activite.contenu[s.id][e.id] = Object.keys(
              this.activite.contenu[s.id][e.id]
            )
              .filter(id => this.activite.contenu[s.id][e.id][id])
              .join(',')
          }
        })
      })

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

    checkboxChange(v) {
      console.log(v)
    }
  }
}
</script>
