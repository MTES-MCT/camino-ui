<template>
  <div>
    <div v-if="level===0">
      <h2 class="mt-xs mb-s">
        {{ definition.nom }}
      </h2>
    </div>
    <div v-else>
      <h3 class="mt-xs ml-s mb-s">
        {{ definition.nom }}
        <Pill
          v-if="id==='dom'"
          :color="`bg-titre-domaine-${definition.id}`"
          class="mr-xs mono"
        >
          {{ definition.id }}
        </Pill>
        <div v-if="id==='tyt'">
          <svg
            width="24"
            height="24"
            class="mr-s mb--xs"
          >
            <rect
              width="24"
              height="24"
              :class="`svg-fill-pattern-${definition.id}`"
            />
          </svg>
        </div>
        <Statut
          v-if="id==='stt'"
          :color="definition.couleur"
          :nom="definition.nom"
          class="inline-block"
        />
      </h3>
    </div>
    <div class="ml-s mb-l">
      {{ definition.description }}
    </div>
    <div v-if="elements">
      <div
        v-if="level===0"
        class="ml-s line"
      />
      <Definitions
        v-for="element in elements"
        :id="id"
        :key="element.id"
        :definition.sync="element"
        :level="1"
      />
    </div>
    <div
      v-if="level===0"
      class="ml-s line-neutral"
    />
    <div
      v-else
      class="ml-s line"
    />
  </div>
</template>

<script>
import Definitions from './definitions.vue'
import Pill from './_ui/pill.vue'
import Statut from './_common/statut.vue'

export default {
  name: 'Definitions',

  components: { Definitions, Pill, Statut },

  props: {
    definition: { type: Object, default: () => ({}) },
    id: { type: String, default: () => '' },
    level: { type: Number, default: () => 0 }
  },

  computed: {
    elements() {
      return this.definition.elements
    }
  }
}
</script>
