<template>
  <tr class="h5">
    <td class="nowrap">
      <span class="bold">{{ document.type.nom }}</span>
      <Tag
        v-if="document.public"
        :mini="true"
        color="bg-info"
        class="ml-xs"
      >
        Public
      </Tag>
    </td>
    <td class="nowrap">
      {{ document.date | dateFormat }}
    </td>
    <td>{{ document.description || '–' }}</td>
    <td class="flex text-right">
      <button
        v-if="boutonDissociation"
        class="btn rnd-l-xs py-s px-m my--xs mr-line"
        @click="unlinkPopupOpen"
      >
        <i class="icon-24 icon-pencil" />
      </button>
      <button
        v-if="boutonModification"
        class="btn rnd-l-xs py-s px-m my--xs mr-line"
        @click="editPopupOpen"
      >
        <i class="icon-24 icon-pencil" />
      </button>
      <button
        v-if="boutonSuppression"
        class="btn py-s px-m my--xs"
        :class="{ 'rnd-r-xs': !document.url && !document.fichier }"
        @click="removePopupOpen"
      >
        <i class="icon-24 icon-trash" />
      </button>

      <button
        v-if="document.fichier"
        class="btn-border py-s px-m my--xs"
        :class="{ 'rnd-r-xs': !document.url, 'rnd-l-xs': !boutonModification && !boutonSuppression && !boutonDissociation }"
        @click="download"
      >
        <i class="icon-24 icon-download" />
      </button>
      <a
        v-if="document.url"
        class="btn-border py-s px-m my--xs rnd-r-xs"
        :class="{ 'rnd-l-xs': !document.fichier && !boutonModification && !boutonSuppression && !boutonDissociation }"
        :href="document.url"
        target="_blank"
        rel="noopener noreferrer"
        alt="Url"
      >
        <i class="icon-24 icon-link" />
      </a>
    </td>
  </tr>
</template>

<script>
import { jsonTypenameOmit } from '../../utils/index'
import Tag from '../_ui/tag.vue'
import DocumentEditPopup from '../document/edit-popup.vue'
import DocumentRemovePopup from '../document/remove-popup.vue'
import JustificatifUnlinkPopup from '../justificatifs/unlink-popup.vue'

export default {
  components: {
    Tag
  },

  props: {
    document: { type: Object, default: () => {} },
    elementId: { type: String, default: '' },
    context: { type: Object, required: true },
    title: { type: String, default: '' },
    repertoire: { type: String, required: true },
    boutonSuppression: { type: Boolean, default: true },
    boutonModification: { type: Boolean, default: true },
    boutonDissociation: { type: Boolean, default: false }
  },

  methods: {
    async download() {
      await this.$store.dispatch('download', `fichiers/${this.document.id}`)
    },

    editPopupOpen() {
      const document = jsonTypenameOmit(this.document)
      if (this.repertoire === 'etapes') {
        document.titreEtapeId = this.elementId
      } else if (this.repertoire === 'entreprises') {
        document.entrepriseId = this.elementId
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
          repertoire: this.repertoire
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
          id: this.elementId,
          title: this.title,
          document: this.document,
          context: this.context
        }
      })
    }
  }
}
</script>
