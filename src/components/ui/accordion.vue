<template>
  <div class="border rnd-xs flex flex-direction-column">
    <div
      v-if="$slots.buttons"
      class="flex full-x border-b-s accordion-header"
    >
      <div class="py-s px-m">
        <h6
          v-if="$slots.titleSection"
          class="cap-first"
        >
          <slot name="titleSection" />
        </h6>
        <h4 class="mb-0">
          <slot name="title" />
        </h4>
      </div>
      <div class="flex-right accordion-buttons flex flex-start">
        <slot name="buttons" />
        <button
          v-if="$slots.default"
          class="btn-alt py-s px-m"
          @click="opened = !opened"
        >
          <i
            class="icon-24"
            :class="{
              'icon-chevron-b': !opened,
              'icon-chevron-t': opened
            }"
          />
        </button>
      </div>
    </div>

    <button
      v-else-if="$slots.default && !$slots.buttons"
      :class="{ 'rnd-t-xs': opened || $slots.sub, 'rnd-xs': !opened && !$slots.sub }"
      class="btn-border py-s px-m flex full-x accordion-header"
      @click="opened = !opened"
    >
      <div>
        <h6
          v-if="$slots.titleSection"
          class="cap-first"
        >
          <slot name="titleSection" />
        </h6>
        <h4 class="mb-0">
          <slot name="title" />
        </h4>
      </div>
      <div class="flex-right">
        <i
          class="icon-24"
          :class="{ 'icon-chevron-b': !opened, 'icon-chevron-t': opened }"
        />
      </div>
    </button>

    <div
      v-else
      class="py-s px-m"
    >
      <h4 class="mb-0">
        <slot name="title" />
      </h4>
    </div>

    <div
      v-if="$slots.sub"
      class="px-m pt-m"
      :class="{'border-b-s': opened}"
    >
      <slot name="sub" />
    </div>

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

  data() {
    return {
      opened: false
    }
  },

  methods: {
    close() {
      this.opened = false
    }
  }
}
</script>
