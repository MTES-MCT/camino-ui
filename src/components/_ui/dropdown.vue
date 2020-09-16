<template>
  <div class="flex flex-direction-column dropdown">
    <div class="rnd-s border bg-bg full-x overflow-hidden">
      <button
        :class="{
          'rnd-t-s': opened || $slots.sub,
          'rnd-s': !opened && !$slots.sub,
          'border-b-s': opened || $slots.sub
        }"
        class="accordion-header flex btn-alt py-s px-m full-x"
        @click="openToggle"
      >
        <div>
          <slot name="title" />
        </div>
        <div class="flex flex-right flex-end">
          <i
            class="icon-24"
            :class="{ [iconOpenedClass]: !opened, [iconClosedClass]: opened }"
          />
        </div>
      </button>

      <div class="overflow-hidden">
        <Transition name="slide">
          <slot v-if="opened" />
        </Transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiSytemAccordion',

  props: {
    iconOpenedClass: {
      type: String,
      default: 'icon-chevron-b'
    },

    iconClosedClass: {
      type: String,
      default: 'icon-chevron-t'
    },

    opened: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    openToggle() {
      this.$emit('toggle', this.opened)
    }
  }
}
</script>
