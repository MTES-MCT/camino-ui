<template>
  <div class="mb-xxl">
    <h3>Emails à notifier lors du dépôt d’un type d’activité</h3>

    <div class="h6">
      <p class="mb-s">
        Lors d’un dépôt d’une activité d’un type en particulier, quels sont les emails à notifier ?
      </p>
    </div>

    <div class="line width-full" />

    <div class="width-full-p">
      <div class="overflow-scroll-x mb">
        <table>
          <tr>
            <th>Type d'activité</th>
            <th>Email</th>
            <th />
          </tr>
          <tr>
            <td>
              <select
                v-model="activiteTypeNew.activiteTypeId"
                class="py-xs px-s mr-s"
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
              <input type="text" v-model="activiteTypeNew.email"/>
            </td>
            <td>
              <ButtonPlus
                :disabled="!activiteTypeNewActive"
                @click="activiteTypeNewUpdate"
              />
            </td>
          </tr>
          <tr
            v-for="activiteType in administration.activitesTypesEmails"
            :key="activiteType.id + activiteType.email"
          >
            <td>
              <span class="cap-first"
                >{{ activiteType.nom }} ({{ activiteType.id.toUpperCase() }})
              </span>
            </td>
            <td>
              {{ activiteType.email }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import ButtonPlus from '../_ui/button-plus.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    ButtonPlus
  },

  data() {
    return {
      activiteTypeNew: {
        activiteTypeId: null,
        email: null
      }
    }
  },

  props: {
    administration: { type: Object, required: true }
  },

  computed: {
    activitesTypes() {
      return this.$store.state.administration.metas.activitesTypes
    }
  }
})
</script>
