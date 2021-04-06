<template>
  <tr class="h5">
    <td class="nowrap">
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
    </td>
    <td class="nowrap">
      {{ dateFormat(document.date) }}
    </td>
    <td>{{ document.description || '–' }}</td>
    <td class="flex text-right">
      <button
        v-if="boutonDissociation"
        class="btn rnd-l-xs py-s px-m my--xs mr-px"
        @click="unlinkPopupOpen"
      >
        <i class="icon-24 icon-unlink" />
      </button>
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
        v-if="document.fichier"
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
import JustificatifUnlinkPopup from '../justificatifs/unlink-popup.vue'

export default {
  components: {
    Tag
  },

  props: {
    title: { type: String, default: '' },
    document: { type: Object, default: () => {} },
    parentId: { type: String, required: true },
    parentTypeId: { type: String, default: '' },
    context: { type: Object, required: true },
    repertoire: { type: String, required: true },
    boutonSuppression: { type: Boolean, default: false },
    boutonModification: { type: Boolean, default: false },
    boutonDissociation: { type: Boolean, default: false },
    etiquette: { type: Boolean, default: true }
  },

  methods: {
    async download() {
      await this.$store.dispatch('download', `fichiers/${this.document.id}`)
    },

    editPopupOpen() {
      const document = cloneAndClean(this.document)
      if (this.repertoire === 'demarches') {
        document.titreEtapeId = this.parentId
      } else if (this.repertoire === 'activites') {
        document.titreActiviteId = this.parentId
      } else if (this.repertoire === 'entreprises') {
        document.entrepriseId = this.parentId
      } else if (this.repertoire === 'travaux') {
        document.titreTravauxEtapeId = this.parentId
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
          context: this.context,
          document,
          repertoire: this.repertoire,
          parentTypeId: this.parentTypeId
        }
      })
    },

    removePopupOpen() {
      this.$store.commit('popupOpen', {
        component: DocumentRemovePopup,
        props: {
          title: this.title,
          document: this.document,
          context: this.context
        }
      })
    },

    unlinkPopupOpen() {
      this.$store.commit('popupOpen', {
        component: JustificatifUnlinkPopup,
        props: {
          id: this.parentId,
          title: this.title,
          document: this.document,
          context: this.context
        }
      })
    },

    dateFormat(date) {
      return dateFormat(date)
    }
  }
}
</script>
