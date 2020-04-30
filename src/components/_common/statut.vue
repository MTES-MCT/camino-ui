<template>
  <div>
    <span
      class="rnd py-xxs px-s cap-first mb-0 bold color-bg h5"
      :class="`bg-${color}`"
    >{{ nom }}</span>
  </div>
</template>

<script>
export default {
  props: {
    color: { type: String, default: 'neutral' },
    nom: { type: String, default: 'indéfini' }
  }
}
</script>
