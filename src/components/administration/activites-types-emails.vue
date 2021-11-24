<template>
  <div v-if="administration.emailsLecture" class="mb-xxl">
    <h3>Emails à notifier lors du dépôt d’un type d’activité</h3>

    <div class="tablet-blob-3-4">
      <div class="h6">
        <ul class="list-prefix">
          <li>Les <strong>DREAL, DEAL et DGTM</strong> sont notifiées pour tous les dépôts d'activité.</li>
          <li>Les <strong>autres administrations</strong> (préfecture, DIRM, préfet maritime...) sont notifiées uniquement si la production annuelle est non nulle.</li>
        </ul>

        <p>Lors d’un dépôt d’une activité d’un type en particulier, quels sont les
        emails à notifier ?</p>
      </div>
    </div>

    <div class="line width-full" />

    <div class="width-full-p">
      <div class="overflow-scroll-x mb">
        <table>
          <tr>
            <th>Type d'activité</th>
            <th>Email</th>
            <th v-if="administration.emailsModification" width="1">Actions</th>
          </tr>
          <tr v-if="administration.emailsModification">
            <td>
              <select
                v-model="activiteTypeNew.activiteTypeId"
                class="py-xs px-s mr-s mt-xs"
              >
                <option
                  v-for="activiteType in activitesTypes"
                  :key="activiteType.id"
                  :value="activiteType.id"
                >
                  {{ activiteTypeLabelize(activiteType) }}
                </option>
              </select>
            </td>
            <td>
              <input
                v-model="activiteTypeNew.email"
                type="email"
                class="py-xs mt-xs"
                placeholder="Email"
                @keyup.enter="activiteTypeEmailUpdate"
              />
            </td>
            <td>
              <ButtonPlus
                class="py-s px-m"
                :disabled="!activiteTypeNewActive"
                @click="activiteTypeEmailUpdate"
              />
            </td>
          </tr>
          <tr
            v-for="activiteType in administration.activitesTypesEmails"
            :key="activiteType.id + activiteType.email"
          >
            <td>
              <span class="cap-first">
                {{ activiteTypeLabelize(activiteType) }}
              </span>
            </td>
            <td>
              {{ activiteType.email }}
            </td>
            <td v-if="administration.emailsModification">
              <button
                class="btn-border py-s px-m my--xs rnd-xs flex-right"
                @click="activiteTypeEmailDelete(activiteType)"
              >
                <i class="icon-24 icon-trash" />
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ButtonPlus from '../_ui/button-plus.vue'
import emailValidator from 'email-validator'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    ButtonPlus
  },

  props: {
    administration: { type: Object, required: true },
    activitesTypes: { type: Array, required: true, default: () => [] }
  },

  emits: ['emailUpdate', 'emailDelete'],

  data() {
    return {
      activiteTypeNew: {
        activiteTypeId: null,
        email: null
      }
    }
  },

  computed: {
    activiteTypeNewActive() {
      return (
        this.activiteTypeNew.activiteTypeId &&
        this.activiteTypeNew.email &&
        emailValidator.validate(this.activiteTypeNew.email)
      )
    }
  },

  methods: {
    async activiteTypeEmailUpdate() {
      if (!this.activiteTypeNewActive) return
      const { email, activiteTypeId } = this.activiteTypeNew
      this.$emit('emailUpdate', {
        administrationId: this.administration.id,
        activiteTypeId,
        email
      })
      this.activiteTypeNew.activiteTypeId = null
      this.activiteTypeNew.email = null
    },

    async activiteTypeEmailDelete(activiteType: {
      email: string
      activiteTypeId: string
    }) {
      const { email, id } = activiteType
      this.$emit('emailDelete', {
        administrationId: this.administration.id,
        activiteTypeId: id,
        email
      })
    },

    activiteTypeLabelize(activiteType) {
      return (
        activiteType.nom.charAt(0).toUpperCase() +
        activiteType.nom.slice(1) +
        ' (' +
        activiteType.id.toUpperCase() +
        ')'
      )
    }
  }
})
</script>
