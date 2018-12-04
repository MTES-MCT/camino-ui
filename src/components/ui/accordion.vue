<template>
  <div class="border rnd-xs flex flex-direction-column">
    <div 
      v-if="$slots.buttons" 
      class="flex full-x border-b-s accordion-header"
    >
      <h4 class="mb-0 py-s px-m">
        <slot name="title" />
      </h4>
      <div class="flex-right accordion-buttons">
        <slot name="buttons" />
        <button 
          v-if="$slots.default"
          class="btn-alt py-s px-m"
          @click="opened = !opened"
        >
          <i 
            class="icon-24"
            :class="{ 'icon-24-chevron-b': !opened, 'icon-24-chevron-t': opened }"
          />
        </button>
      </div>
    </div>

    <button
      v-else-if="$slots.default && !$slots.buttons"
      :class="{ 'rnd-xs-t': opened || sub, 'rnd-xs': !opened && !sub }"
      class="btn-border py-s px-m flex full-x accordion-header"
      @click="opened = !opened"
    >
      <h4 class="mb-0">
        <slot name="title" />
      </h4>
      <div class="flex-right">
        <i  
          class="icon-24"
          :class="{ 'icon-24-chevron-b': !opened, 'icon-24-chevron-t': opened }"
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
      v-if="sub"
      class="px-m pt-m"
    >
      <slot name="sub" />
    </div>
    
    <div class="px-m overflow-hidden">
      <Transition name="slide">
        <slot v-if="opened" />>
      </Transition>
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
