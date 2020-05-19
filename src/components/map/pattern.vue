<template>
  <svg class="absolute z--100">
    <defs>
      <g
        v-for="typeId in typesIds"
        :key="typeId"
      >
        <pattern
          v-for="domaineId in domainesIdsDefault"
          :id="domaineId ? `pattern-${typeId}-${domaineId}` : `pattern-${typeId}`"
          :key="domaineId"
          patternUnits="userSpaceOnUse"
          width="8"
          height="8"
          :patternTransform="`rotate(${defs[typeId].rotation})`"
        >
          <path
            :d="defs[typeId].d"
            :class="domaineId ? `svg-stroke-domaine-${domaineId}` : `svg-stroke`"
            :stroke-width="defs[typeId].width"
            stroke-linecap="round"
          />
        </pattern>
      </g>
    </defs>
  </svg>
</template>

<script>
export default {
  props: {
    domainesIds: {
      type: Array,
      default: () => []
    },
    typesIds: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      defs: {
        ax: { d: 'M0,0 l8,0 M0,8 l8,0', width: 5, rotation: 0 },
        cx: { d: 'M0,0 l8,0 M0,8 l8,0', width: 5, rotation: 45 },
        pc: { d: 'M0,0 l8,0 M0,8 l8,0', width: 5, rotation: 90 },
        px: { d: 'M0,0 l8,0 M0,8 l8,0', width: 5, rotation: 135 },
        ap: { d: 'M-1,4 l2,0 M6,4 l2,0', width: 2, rotation: 45 },
        ar: { d: 'M1,4 l4,0 M3,2 l0,4', width: 2, rotation: 0 },
        pr: { d: 'M4,4 l0,0', width: 5, rotation: 45 }
      }
    }
  },

  computed: {
    domainesIdsDefault() {
      return [...this.domainesIds, '']
    }
  }
}
</script>
