<template>
  <div
    class="border-b-s px-m pt-m"
  >
    <h4 v-if="section.nom">
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
        <p class="cap-first">
          {{ contenu && contenu[section.id] && (contenu[section.id][e.id] || contenu[section.id][e.id] === 0) ? e.type === 'checkboxes' ? contenu[section.id][e.id].map(c => e.valeurs[c]).join(', ') : contenu[section.id][e.id] : '–' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
