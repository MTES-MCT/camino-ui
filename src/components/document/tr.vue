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
    <td>{{ document.description || '–' }}</td>
    <td class="flex text-right">
      <button
        v-if="document.modification"
        class="btn rnd-l-xs py-s px-m my--xs mr-line"
        @click="editPopupOpen"
      >
        <i class="icon-24 icon-pencil" />
      </button>
      <button
        v-if="document.suppression"
        class="btn py-s px-m my--xs"
        :class="{ 'rnd-r-xs': !document.url && !document.fichier }"
        @click="removePopupOpen"
      >
        <i class="icon-24 icon-trash" />
      </button>

      <button
        v-if="document.fichier"
        class="btn-border py-s px-m my--xs"
        :class="{ 'rnd-r-xs': !document.url, 'rnd-l-xs': !document.modification }"
        @click="download"
      >
        <i class="icon-24 icon-download" />
      </button>
      <a
        v-if="document.url"
        class="btn-border py-s px-m my--xs rnd-r-xs"
        :class="{ 'rnd-l-xs': !document.modification && !document.fichier }"
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
import DocumentEditPopup from './edit-popup.vue'
import DocumentRemovePopup from './remove-popup.vue'

export default {
  components: {
    Tag
  },

  props: {
    document: { type: Object, default: () => {} },
    elementId: { type: String, default: '' },
    context: { type: Object, required: true },
    title: { type: String, default: '' },
    repertoire: { type: String, required: true }
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
          document,
          context: this.context,
          repertoire: this.repertoire
        }
      })
    },

    removePopupOpen() {
      this.$store.commit('popupOpen', {
        component: DocumentRemovePopup,
        props: {
          document: this.document,
          context: this.context
        }
      })
    }
  }
}
</script>
