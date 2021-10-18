<template>
  <div>
    <div class="mb-xxl">
      <h3>Création de demandes de titres</h3>

      <div class="h6">
        <p>Droit de faire des demande de titres par domaine / type de titre.</p>
      </div>

      <div class="line width-full" />
      <div class="width-full-p">
        <div class="overflow-scroll-x mb">
          <table>
            <tr>
              <th>Domaine</th>
              <th>Type de titre</th>
              <th>Création de titres</th>
              <th />
            </tr>
            <tr>
              <td>
                <select
                  v-model="titreTypeNew.domaineId"
                  class="py-xs px-s mr-s"
                >
                  <option
                    v-for="domaine in domaines"
                    :key="domaine.id"
                    :value="domaine.id"
                  >
                    {{ domaine.id.toUpperCase() }} {{ domaine.nom }}
                  </option>
                </select>
              </td>
              <td>
                <select
                  v-model="titreTypeNew.titreTypeTypeId"
                  class="py-xs px-s mr-s"
                  :disabled="!titreTypeNew.domaineId"
                >
                  <option
                    v-for="titreType in titreTypeNewTypes"
                    :key="titreType.id"
                    :value="titreType.type.id"
                  >
                    {{ titreType.type.nom }}
                  </option>
                </select>
              </td>
              <td>
                <button
                  class="btn p-xs rnd-xs"
                  :disabled="!titreTypeNew.titreTypeTypeId"
                  @click="
                    titreTypeNew.titresCreation = !titreTypeNew.titresCreation
                  "
                >
                  <i
                    v-if="titreTypeNew.titresCreation"
                    class="icon-24 icon-check"
                  />
                  <i v-else class="icon-24 icon-square" />
                </button>
              </td>
              <td>
                <ButtonPlus
                  :disabled="!titreTypeNewActive"
                  @click="titreTypeNewUpdate"
                />
              </td>
            </tr>
            <tr v-for="titreType in entreprise.titresTypes" :key="titreType.id">
              <td>
                <CaminoDomaine
                  :domaine-id="titreType.domaine.id"
                  class="mt-s"
                />
              </td>
              <td>
                <span class="small bold cap-first mt-s">{{
                  titreType.type.nom
                }}</span>
              </td>
              <td>
                <button
                  class="btn p-xs rnd-xs"
                  @click="
                    titreTypeUpdate(
                      titreType.id,
                      titreType.titresCreation,
                      true
                    )
                  "
                >
                  <i
                    v-if="titreType.titresCreation"
                    class="icon-24 icon-check"
                  />
                  <i v-else class="icon-24 icon-square" />
                </button>
              </td>
              <td />
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CaminoDomaine from '../_common/domaine.vue'
import ButtonPlus from '../../components/_ui/button-plus.vue'

export default {
  components: {
    CaminoDomaine,
    ButtonPlus
  },

  props: {
    entreprise: { type: Object, required: true }
  },

  data() {
    return {
      titreTypeNew: {
        domaineId: null,
        titreTypeTypeId: null,
        titresCreation: false
      }
    }
  },

  computed: {
    user() {
      return this.$store.state.user.element
    },

    domaines() {
      return this.$store.state.entreprise.metas.domaines
    },

    loaded() {
      return !!this.entreprise
    },

    titreTypeNewTypes() {
      if (!this.titreTypeNew.domaineId) {
        return []
      }

      const domaine = this.domaines.find(
        d => d.id === this.titreTypeNew.domaineId
      )

      return domaine.titresTypes
    },

    titreTypeNewActive() {
      return (
        this.titreTypeNew.titreTypeTypeId &&
        this.titreTypeNew.domaineId &&
        this.titreTypeNew.titresCreation
      )
    }
  },

  created() {
    this.get()
  },

  methods: {
    async get() {
      await this.$store.dispatch('entreprise/permissionsInit')
    },

    async titreTypeUpdate(titreTypeId, titresCreation, changed) {
      if (changed) {
        titresCreation = !titresCreation
      }

      await this.$store.dispatch('entreprise/titreTypeUpdate', {
        entrepriseId: this.entreprise.id,
        titreTypeId,
        titresCreation
      })
    },

    titreTypeNewUpdate() {
      if (this.titreTypeNewActive) {
        this.titreTypeUpdate(
          `${this.titreTypeNew.titreTypeTypeId}${this.titreTypeNew.domaineId}`,
          this.titreTypeNew.titresCreation
        )

        this.titreTypeNew = {
          domaineId: null,
          titreTypeTypeId: null,
          titresCreation: false
        }
      }
    }
  }
}
</script>
