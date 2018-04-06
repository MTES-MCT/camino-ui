<template>
  <div class="border">
    <button
      class="btn-border py-s px-m flex full-x"
      @click="opened = !opened">
      <h4 class="mb-0"><slot name="title"/></h4>
      <div class="flex-right">
        <i class="icon-24 icon-24-chevron-b" />
      </div>
    </button>
    <div
      :class="{ 'height-0': !opened, 'pt': opened }"
      class="px-m">
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  name: 'UiSytemAccordion',

  data () {
    return {
      opened: false
    }
  }

}
</script>
