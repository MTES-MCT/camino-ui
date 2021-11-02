<template>
  <div class="mb-xxl">
    <h3>Emails à notifier lors du dépôt d’un type d’activité</h3>

    <div class="h6">
      <p class="mb-s">
        Lors d’un dépôt d’une activité d’un type en particulier, quels sont les
        emails à notifier ?
      </p>
    </div>

    <div class="line width-full" />

    <div class="width-full-p">
      <div class="overflow-scroll-x mb">
        <table>
          <tr>
            <th>Type d'activité</th>
            <th>Email</th>
            <th width="1">Actions</th>
          </tr>
          <tr>
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
                  {{ activiteType.id.toUpperCase() }} {{ activiteType.nom }}
                </option>
              </select>
            </td>
            <td>
              <input
                v-model="activiteTypeNew.email"
                type="email"
                class="py-xs mt-xs"
                placeholder="Email"
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
                {{ activiteType.nom }} ({{ activiteType.id.toUpperCase() }})
              </span>
            </td>
            <td>
              {{ activiteType.email }}
            </td>
            <td>
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
    administration: { type: Object, required: true }
  },

  data() {
    return {
      activiteTypeNew: {
        activiteTypeId: null,
        email: null
      }
    }
  },

  computed: {
    activitesTypes() {
      return this.$store.state.administration.metas.activitesTypes
    },

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
      await this.$store.dispatch('administration/activiteTypeEmailUpdate', {
        administrationId: this.administration.id,
        activiteTypeId,
        email
      })
    },

    async activiteTypeEmailDelete(activiteType: {
      email: string
      activiteTypeId: string
    }) {
      const { email, id } = activiteType
      await this.$store.dispatch('administration/activiteTypeEmailDelete', {
        administrationId: this.administration.id,
        activiteTypeId: id,
        email
      })
    }
  }
})
</script>
