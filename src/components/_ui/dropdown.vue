<template>
  <div class="relative flex flex-direction-column dropdown">
    <div class="absolute border rnd-s bg-bg full-x overflow-hidden">
      <button
        :class="{
          'rnd-t-s': opened,
          'border-b-s': opened
        }"
        class="accordion-header flex btn-alt py-s px-s full-x"
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
        <div :class="{ 'overflow-hidden': !opened, opened: opened }">
          <Transition name="slide">
            <slot v-if="opened" />
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiSytemDropdown',

  props: {
    iconOpenedClass: { type: String, default: 'icon-chevron-b' },

    iconClosedClass: { type: String, default: 'icon-chevron-t' },

    opened: { type: Boolean, default: false }
  },

  emits: ['toggle'],

  methods: {
    openToggle() {
      this.$emit('toggle', this.opened)
    }
  }
}
</script>
