<template>
  <div class="flex flex-direction-column rnd-s border bg-bg">
    <div
      v-if="$slots.buttons"
      class="accordion-header flex border"
      :class="{ 'rnd-t-s': opened || $slots.sub, 'rnd-s': !opened && !$slots.sub }"
    >
      <div class="py-s px-m">
        <slot name="title" />
      </div>

      <div
        class="accordion-buttons flex flex-end flex-right"
      >
        <slot name="buttons" />
        <button
          v-if="$slots.default"
          class="btn-alt py-s px-m"
          @click="toggle"
        >
          <i
            class="icon-24"
            :class="{
              [iconOpenedClass]: !opened,
              [iconClosedClass]: opened
            }"
          />
        </button>
        <div
          v-else
          class="py-s px-m"
        >
          <i class="icon-24" />
        </div>
      </div>
    </div>

    <button
      v-else-if="$slots.default && !$slots.buttons"
      :class="{ 'rnd-t-s': opened || $slots.sub, 'rnd-s': !opened && !$slots.sub }"
      class="accordion-header flex btn-border py-s px-m"
      @click="toggle"
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

    <div
      v-else
      class="py-s px-m"
    >
      <slot name="title" />
    </div>

    <slot
      v-if="$slots.sub"
      name="sub"
      :class="{'border-b-s': opened}"
    />


    <div class="overflow-hidden">
      <Transition name="slide">
        <slot v-if="opened" />
      </Transition>
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

    opened: { type: Boolean, default: false }
  },

  methods: {
    toggle() {
      this.$emit('toggle')
    }
  }
}
</script>
