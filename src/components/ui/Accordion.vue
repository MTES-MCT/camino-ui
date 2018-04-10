<template>
  <div class="border flex flex-direction-column">
    <button
      :class="{ 'rnd-top': opened }"
      class="btn-border py-s px-m flex full-x"
      @click="opened = !opened">
      <h4 class="mb-0"><slot name="title"/></h4>
      <div class="flex-right">
        <i class="icon-24 icon-24-chevron-b" />
      </div>
    </button>
    <div
      :class="{ 'height-0': !sub, 'py-s': sub }"
      class="px-m">
      <slot name="sub" />
    </div>
    <div
      :class="{ 'height-0': !opened, 'pt-m': opened }"
      class="px-m">
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  name: 'UiSytemAccordion',

  props: {
    sub: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      opened: false
    }
  }

}
</script>
