<template>
  <div>
    <div
      v-for="point in points"
      :key="point.id"
    >
      <h4>
        {{ point.nom }}
      </h4>
      <div>{{ point }}</div>
    </div>
  </div>
</template>

<script>
export default {
     props: {
    points: {
      type: Array,
      default: () => []
    }
  }
}
</script>
