<template>
  <div class="flex flex-direction-column overflow-hidden rnd-s border bg-bg">
    <div
      v-if="slotButtons"
      class="accordion-header flex"
      :class="{
        'rnd-t-s': opened || slotSub,
        'rnd-s': !opened && !slotSub,
        'border-b-s': opened || slotSub
      }"
    >
      <div class="py-s px-m">
        <slot name="title" />
      </div>

      <div class="overflow-hidden flex flex-end flex-right">
        <slot name="buttons" />
        <button v-if="slotDefault" class="btn-alt py-s px-m" @click="toggle">
          <i
            class="icon-24"
            :class="{
              [iconOpenedClass]: !opened,
              [iconClosedClass]: opened
            }"
          />
        </button>
        <div v-else class="py-s px-m">
          <i class="icon-24" />
        </div>
      </div>
    </div>

    <button
      v-else-if="slotDefault && !slotButtons"
      :class="{
        'rnd-t-s': opened || slotSub,
        'rnd-s': !opened && !slotSub,
        'border-b-s': opened || slotSub
      }"
      class="accordion-header flex btn-alt py-s px-m"
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

    <div v-else class="py-s px-m">
      <slot name="title" />
    </div>

    <slot v-if="slotSub" name="sub" :class="{ 'border-b-s': opened }" />

    <div v-if="slotDefault" class="overflow-hidden">
      <Transition name="slide">
        <div v-show="opened">
          <slot />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiSytemAccordion',

  props: {
    iconOpenedClass: { type: String, default: 'icon-chevron-b' },

    iconClosedClass: { type: String, default: 'icon-chevron-t' },

    opened: { type: Boolean, default: false },

    slotSub: { type: Boolean, default: false },

    slotButtons: { type: Boolean, default: false },

    slotDefault: { type: Boolean, default: false }
  },

  emits: ['toggle'],

  methods: {
    toggle() {
      this.$emit('toggle')
    }
  }
}
</script>
