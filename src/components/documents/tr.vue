<template>
  <tr class="h6">
    <td class="nowrap pt-m">
      <span class="bold">{{ document.type.nom }}</span>
      <span v-if="etiquette">
        <Tag
          v-if="document.publicLecture"
          :mini="true"
          color="bg-info"
          class="ml-xs"
        >
          Public
        </Tag>
        <Tag
          v-if="document.entreprisesLecture && !document.publicLecture"
          :mini="true"
          color="bg-info"
          class="ml-xs"
        >
          Entreprise
        </Tag>
      </span>
      <Tag
        v-if="manquant && manquantShow"
        color="bg-warning"
        class="ml-xs"
        :mini="true"
        >Fichier manquant</Tag
      >
    </td>
    <td class="nowrap pt-m">
      {{ dateFormat(document.date) }}
    </td>
    <td class="pt-m">{{ document.description || '–' }}</td>
    <td class="flex text-right">
      <button
        v-if="boutonModification"
        class="btn rnd-l-xs py-s px-m my--xs mr-px"
        @click="editPopupOpen"
      >
        <i class="icon-24 icon-pencil" />
      </button>
      <button
        v-if="boutonSuppression"
        class="btn py-s px-m my--xs"
        :class="{
          'rnd-r-xs': !document.url && !document.uri && !document.fichier
        }"
        @click="removePopupOpen"
      >
        <i class="icon-24 icon-trash" />
      </button>
      <button
        v-if="document.fichier || document.fichierNouveau"
        class="btn-border py-s px-m my--xs"
        :class="{
          'rnd-r-xs': !document.url && !document.uri,
          'rnd-l-xs':
            !boutonModification && !boutonSuppression && !boutonDissociation
        }"
        @click="download"
      >
        <i class="icon-24 icon-download" />
      </button>
      <a
        v-if="document.url"
        class="btn-border py-s px-m my--xs"
        :class="{
          'rnd-r-xs': !document.uri,
          'rnd-l-xs':
            !document.fichier &&
            !boutonModification &&
            !boutonSuppression &&
            !boutonDissociation
        }"
        :href="document.url"
        target="_blank"
        rel="noopener noreferrer"
        alt="Url"
      >
        <i class="icon-24 icon-link" />
      </a>
      <a
        v-if="document.uri"
        class="btn-border py-s px-m my--xs rnd-r-xs"
        :class="{
          'rnd-l-xs':
            !document.url &&
            !document.fichier &&
            !boutonModification &&
            !boutonSuppression &&
            !boutonDissociation
        }"
        :href="document.uri"
        target="_blank"
        rel="noopener noreferrer"
        alt="Uri"
      >
        <i class="icon-24 icon-link" />
      </a>
    </td>
  </tr>
</template>

<script>
import { cloneAndClean, dateFormat } from '../../utils/index'
import Tag from '../_ui/tag.vue'
import DocumentEditPopup from '../document/edit-popup.vue'
import DocumentRemovePopup from '../document/remove-popup.vue'

export default {
  components: {
    Tag
  },

  props: {
    document: { type: Object, required: true },
    repertoire: { type: String, required: true },
    title: { type: String, required: true },
    route: { type: Object, default: null },
    addAction: { type: Object, default: null },
    removeAction: { type: Object, default: null },
    parentId: { type: String, default: '' },
    parentTypeId: { type: String, default: '' },
    etiquette: { type: Boolean, default: false },
    boutonDissociation: { type: Boolean, default: false },
    boutonModification: { type: Boolean, default: false },
    boutonSuppression: { type: Boolean, default: false },
    manquantShow: { type: Boolean, default: false }
  },

  computed: {
    manquant() {
      return !(
        this.document.fichier ||
        this.document.fichierNouveau ||
        this.document.uri ||
        this.document.url
      )
    }
  },

  methods: {
    async download() {
      await this.$store.dispatch('downloadDocument', this.document)
    },

    editPopupOpen() {
      const document = cloneAndClean(this.document)
      if (this.parentId) {
        if (this.repertoire === 'demarches') {
          document.titreEtapeId = this.parentId
        } else if (this.repertoire === 'activites') {
          document.titreActiviteId = this.parentId
        } else if (this.repertoire === 'entreprises') {
          document.entrepriseId = this.parentId
        } else if (this.repertoire === 'travaux') {
          document.titreTravauxEtapeId = this.parentId
        }
      }

      document.typeId = document.type.id
      document.fichierNouveau = null

      delete document.type
      delete document.modification
      delete document.suppression

      this.$store.commit('popupOpen', {
        component: DocumentEditPopup,
        props: {
          title: this.title,
          route: this.route,
          action: this.addAction,
          document,
          repertoire: this.repertoire,
          parentTypeId: this.parentTypeId
        }
      })
    },

    removePopupOpen() {
      if (this.removeAction) {
        this.$store.dispatch(
          this.removeAction.name,
          { id: this.document.id },
          { root: true }
        )
      } else {
        this.$store.commit('popupOpen', {
          component: DocumentRemovePopup,
          props: {
            title: this.title,
            document: this.document,
            route: this.route
          }
        })
      }
    },

    dateFormat(date) {
      return dateFormat(date)
    }
  }
}
</script>
