<template>
  <div>
    <div v-if="userIsAdmin" class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5>Date</h5>
      </div>
      <div class="tablet-blob-2-3">
        <InputDate
          v-model="etape.date"
          :class="{ 'mb-s': etape.date, mb: !etape.date }"
        />
        <div class="h6">
          <label v-if="etape.date">
            <input
              v-model="etape.incertitudes.date"
              type="checkbox"
              class="mr-xs"
            />
            Incertain
          </label>
        </div>
      </div>

      <hr />
    </div>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5>Type</h5>
      </div>
      <div class="mb tablet-blob-2-3">
        <select :value="etape.typeId" class="p-s" @change="typeUpdate($event)">
          <option
            v-for="eType in etapeTypes"
            :key="eType.id"
            :value="eType.id"
            :disabled="etape.typeId === eType.id"
          >
            {{ eType.nom }}
          </option>
        </select>
      </div>
    </div>

    <hr />

    <div v-if="etapesStatuts && !etapeIsDemandeEnConstruction">
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h5>Statut</h5>
        </div>
        <div class="mb tablet-blob-2-3">
          <select v-model="etape.statutId" class="p-s">
            <option
              v-for="etapeStatut in etapesStatuts"
              :key="etapeStatut.id"
              :value="etapeStatut.id"
              :disabled="etape.statutId === etapeStatut.id"
            >
              {{ etapeStatut.nom }}
            </option>
          </select>
        </div>
      </div>

      <hr />
    </div>
  </div>
</template>

<script>
import InputDate from '../_ui/input-date.vue'

export default {
  components: { InputDate },
  props: {
    userIsAdmin: { type: Boolean, required: true },
    etape: { type: Object, required: true },
    etapeType: { type: Object, default: () => ({}) },
    etapeTypes: { type: Array, required: true },
    etapeIsDemandeEnConstruction: { type: Boolean, default: false }
  },

  emits: ['type-update', 'complete-update'],

  computed: {
    etapesStatuts() {
      return this.etapeType && this.etapeType.etapesStatuts
    },

    complete() {
      if (this.userIsAdmin) {
        return this.etapeIsDemandeEnConstruction
          ? !!(this.etape?.typeId && this.etape.date)
          : !!(this.etape?.typeId && this.etape.date && this.etape.statutId)
      }

      return !!this.etape?.typeId
    }
  },

  watch: {
    etapesStatuts: function () {
      if (this.etapesStatuts?.length === 1) {
        this.etape.statutId = this.etapesStatuts[0].id
      } else {
        this.etape.statutId = null
      }
    },

    complete: 'completeUpdate'
  },

  created() {
    this.completeUpdate()
  },

  methods: {
    async typeUpdate(event) {
      const typeId = event.target.value
      this.$emit('type-update', typeId)
    },

    completeUpdate() {
      this.$emit('complete-update', this.complete)
    }
  }
}
</script>
