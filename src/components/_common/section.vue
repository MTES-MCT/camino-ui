<template>
  <div
    class="border-b-s px-m pt-m"
  >
    <h4 v-if="section.nom && entete">
      {{ section.nom }}
    </h4>

    <div
      v-for="e in section.elements"
      :key="e.id"
      class="tablet-blobs"
    >
      <div
        v-if="e.nom"
        class="tablet-blob-1-3"
      >
        <h6>
          {{ e.nom }}
        </h6>
      </div>

      <div :class="{'tablet-blob-2-3': e.nom, 'tablet-blob-1': !e.nom}">
        <p>
          {{ contenu && (contenu[e.id] || contenu[e.id] === 0) ? e.type === 'checkboxes' ? contenu[e.id].map(c => e.valeurs[c]).join(', ') : contenu[e.id] : '–' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    entete: {
      type: Boolean,
      default: true
    },

    section: {
      type: Object,
      default: () => ({})
    },

    contenu: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
