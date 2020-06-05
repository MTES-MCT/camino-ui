<template>
  <g>
    <pattern
      v-for="domaineId in domainesIdsDefault"
      :id="domaineId ? `pattern-${typeId}-${domaineId}` : `pattern-${typeId}`"
      :key="domaineId"
      pattern-units="userSpaceOnUse"
      width="8"
      height="8"
      :pattern-transform="`rotate(${defs[typeId].rotation})`"
    >
      <path
        :d="defs[typeId].d"
        :class="domaineId ? `svg-stroke-domaine-${domaineId}` : `svg-stroke`"
        :stroke-width="defs[typeId].width"
        stroke-linecap="round"
      />
    </pattern>
  </g>
</template>

<script>
export default {
  props: {
    domaineIdsDefault: { type: Array, required: true }
  }
}
</script>
