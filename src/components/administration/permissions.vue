<template>
  <div>
    <div class="mb-xxl">
      <h3>Administration gestionnaire ou associée</h3>

      <ul class="h6 italic list-prefix mb-s">
        <li>
          L'utilisateur d'une administration <b>gestionnaire</b> peut créer et
          modifier des titres, démarches et étapes.
        </li>
        <li>
          Une administration <b>associée</b> n'apparaît pas sur les pages des
          titres.
        </li>
      </ul>

      <p class="h6 italic">Par domaine / type de titre.</p>

      <div class="line width-full" />
      <div class="width-full-p">
        <div class="overflow-scroll-x mb">
          <table>
            <tr>
              <th>Domaine</th>
              <th>Type de titre</th>
              <th>Gestionnaire</th>
              <th>Associée</th>
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
                    {{ domaine.id.toUpperCase() }} {{ domaine.nom.to }}
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
                  class="btn px-s py-xs rnd-xs"
                  :disabled="!titreTypeNew.titreTypeTypeId"
                  @click="
                    titreTypeNew.gestionnaire = !titreTypeNew.gestionnaire
                  "
                >
                  <i
                    v-if="titreTypeNew.gestionnaire"
                    class="icon-24 icon-check"
                  />
                  <i v-else class="icon-24 icon-square" />
                </button>
              </td>
              <td>
                <button
                  class="btn px-s py-xs rnd-xs"
                  :disabled="!titreTypeNew.titreTypeTypeId"
                  @click="titreTypeNew.associee = !titreTypeNew.associee"
                >
                  <i v-if="titreTypeNew.associee" class="icon-24 icon-check" />
                  <i v-else class="icon-24 icon-square" />
                </button>
              </td>
              <td>
                <button
                  class="btn p-xs rnd-xs"
                  :disabled="!titreTypeNewActive"
                  @click="titreTypeNewUpdate"
                >
                  <i class="icon-24 icon-plus" />
                </button>
              </td>
            </tr>
            <tr
              v-for="titreType in administration.titresTypes"
              :key="titreType.id"
            >
              <td><CaminoDomaine :domaine-id="titreType.domaine.id" /></td>
              <td>
                <span class="h6 bold cap-first">{{ titreType.type.nom }}</span>
              </td>
              <td>
                <button
                  class="btn px-s py-xs rnd-xs"
                  @click="
                    titreTypeUpdate(
                      titreType.id,
                      titreType.gestionnaire,
                      titreType.associee,
                      'gestionnaire'
                    )
                  "
                >
                  <i v-if="titreType.gestionnaire" class="icon-24 icon-check" />
                  <i v-else class="icon-24 icon-square" />
                </button>
              </td>
              <td>
                <button
                  class="btn px-s py-xs rnd-xs"
                  @click="
                    titreTypeUpdate(
                      titreType.id,
                      titreType.gestionnaire,
                      titreType.associee,
                      'associee'
                    )
                  "
                >
                  <i v-if="titreType.associee" class="icon-24 icon-check" />
                  <i v-else class="icon-24 icon-square" />
                </button>
              </td>
              <td />
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div v-if="administration.type.id !== 'min'" class="mb-xxl">
      <h3>Restrictions de l'édition des titres, démarches et étapes</h3>

      <div class="h6 italic">
        <p class="mb-s">
          Par défaut, l'utilisateur d'une administration peut éditer :
        </p>
        <ul class="list-prefix mb-s">
          <li>
            les <b>titres</b>, <b>démarches</b> et <b>étapes</b> des titres dont
            l'administration est gestionnaire,
          </li>
          <li>
            les <b>démarches</b> et <b>étapes</b> des titres auxquels
            l'administration est liée par la région ou le département.
          </li>
        </ul>
        <p>
          Ce réglage permet de retreindre ces droits par domaine / type de titre
          / statut de titre.
        </p>
      </div>

      <div class="line width-full" />
      <div class="width-full-p">
        <div class="overflow-scroll-x mb">
          <table>
            <tr>
              <th>Domaine</th>
              <th>Type de titre</th>
              <th>Statut de titre</th>
              <th>Titres</th>
              <th>Démarches</th>
              <th>Étapes</th>
              <th />
            </tr>

            <tr>
              <td>
                <select
                  v-model="titreTypeTitreStatutNew.domaineId"
                  class="py-xs px-s mr-s"
                >
                  <option
                    v-for="domaine in domaines"
                    :key="domaine.id"
                    :value="domaine.id"
                  >
                    {{ domaine.id.toUpperCase() }} {{ domaine.nom.to }}
                  </option>
                </select>
              </td>
              <td>
                <select
                  v-model="titreTypeTitreStatutNew.titreTypeTypeId"
                  class="py-xs px-s mr-s"
                  :disabled="!titreTypeTitreStatutNew.domaineId"
                >
                  <option
                    v-for="titreType in titreTypeTitreStatutNewTypes"
                    :key="titreType.id"
                    :value="titreType.type.id"
                  >
                    {{ titreType.type.nom }}
                  </option>
                </select>
              </td>
              <td>
                <select
                  v-model="titreTypeTitreStatutNew.titreStatutId"
                  class="py-xs px-s mr-s"
                >
                  <option
                    v-for="titreStatut in titresStatuts"
                    :key="titreStatut.id"
                    :value="titreStatut.id"
                  >
                    {{ titreStatut.nom }}
                  </option>
                </select>
              </td>
              <td>
                <button
                  class="btn px-s py-xs rnd-xs"
                  :disabled="
                    !titreTypeTitreStatutNew.titreTypeTypeId ||
                      !titreTypeTitreStatutNew.titreStatutId
                  "
                  @click="
                    titreTypeTitreStatutNew.titresModificationInterdit = !titreTypeTitreStatutNew.titresModificationInterdit
                  "
                >
                  <i
                    v-if="titreTypeTitreStatutNew.titresModificationInterdit"
                    class="icon-24 icon-cross"
                  />
                  <i v-else class="icon-24 icon-square" />
                </button>
              </td>
              <td>
                <button
                  class="btn px-s py-xs rnd-xs"
                  :disabled="
                    !titreTypeTitreStatutNew.titreTypeTypeId ||
                      !titreTypeTitreStatutNew.titreStatutId
                  "
                  @click="
                    titreTypeTitreStatutNew.demarchesModificationInterdit = !titreTypeTitreStatutNew.demarchesModificationInterdit
                  "
                >
                  <i
                    v-if="titreTypeTitreStatutNew.demarchesModificationInterdit"
                    class="icon-24 icon-cross"
                  />
                  <i v-else class="icon-24 icon-square" />
                </button>
              </td>
              <td>
                <button
                  class="btn px-s py-xs rnd-xs"
                  :disabled="
                    !titreTypeTitreStatutNew.titreTypeTypeId ||
                      !titreTypeTitreStatutNew.titreStatutId
                  "
                  @click="
                    titreTypeTitreStatutNew.etapesModificationInterdit = !titreTypeTitreStatutNew.etapesModificationInterdit
                  "
                >
                  <i
                    v-if="titreTypeTitreStatutNew.etapesModificationInterdit"
                    class="icon-24 icon-cross"
                  />
                  <i v-else class="icon-24 icon-square" />
                </button>
              </td>
              <td>
                <button
                  class="btn p-xs rnd-xs"
                  :disabled="!titreTypeTitreStatutNewActive"
                  @click="titreTypeTitreStatutNewUpdate"
                >
                  <i class="icon-24 icon-plus" />
                </button>
              </td>
            </tr>

            <tr
              v-for="ttts in administration.titresTypesTitresStatuts"
              :key="`${ttts.titreType.id}-${ttts.titreStatut.id}`"
            >
              <td><CaminoDomaine :domaine-id="ttts.titreType.domaine.id" /></td>
              <td>
                <span class="h6 cap-first bold">{{
                  ttts.titreType.type.nom
                }}</span>
              </td>
              <td>
                <Statut
                  :color="ttts.titreStatut.couleur"
                  :nom="ttts.titreStatut.nom"
                />
              </td>
              <td>
                <button
                  class="btn px-s py-xs rnd-xs"
                  @click="
                    titreTypeTitreStatutUpdate(
                      ttts.titreType.id,
                      ttts.titreStatut.id,
                      ttts.titresModificationInterdit,
                      ttts.demarchesModificationInterdit,
                      ttts.etapesModificationInterdit,
                      'titres'
                    )
                  "
                >
                  <i
                    v-if="ttts.titresModificationInterdit"
                    class="icon-24 icon-cross"
                  />
                  <i v-else class="icon-24 icon-square" />
                </button>
              </td>
              <td>
                <button
                  class="btn px-s py-xs rnd-xs"
                  @click="
                    titreTypeTitreStatutUpdate(
                      ttts.titreType.id,
                      ttts.titreStatut.id,
                      ttts.titresModificationInterdit,
                      ttts.demarchesModificationInterdit,
                      ttts.etapesModificationInterdit,
                      'demarches'
                    )
                  "
                >
                  <i
                    v-if="ttts.demarchesModificationInterdit"
                    class="icon-24 icon-cross"
                  />
                  <i v-else class="icon-24 icon-square" />
                </button>
              </td>
              <td>
                <button
                  class="btn px-s py-xs rnd-xs"
                  @click="
                    titreTypeTitreStatutUpdate(
                      ttts.titreType.id,
                      ttts.titreStatut.id,
                      ttts.titresModificationInterdit,
                      ttts.demarchesModificationInterdit,
                      ttts.etapesModificationInterdit,
                      'etapes'
                    )
                  "
                >
                  <i
                    v-if="ttts.etapesModificationInterdit"
                    class="icon-24 icon-cross"
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

    <div v-if="administration.type.id !== 'min'" class="mb-xxl">
      <h3>Restrictions de la visibilité, édition et création des étapes</h3>

      <div class="h6 italic">
        <p class="mb-s">
          Par défaut, l'utilisateur d'une administration peut <b>voir</b>,
          <b>modifier</b> et <b>créer</b> les étapes :
        </p>
        <ul class="list-prefix mb-s">
          <li>
            des titres dont l'administration est gestionnaire,
          </li>
          <li>
            des titres auxquels l'administration est liée par la région ou le
            département.
          </li>
        </ul>
        <p>
          Ce réglage permet de retreindre ces droits par domaine / type de titre
          / type d'étape.
        </p>
      </div>

      <div class="line width-full" />
      <div class="width-full-p">
        <div class="overflow-scroll-x mb">
          <table>
            <tr>
              <th>Domaine</th>
              <th>Type de titre</th>
              <th>Type d'étape</th>
              <th>Visibilité</th>
              <th>Modification</th>
              <th>Création</th>
              <th />
            </tr>

            <tr>
              <td>
                <select
                  v-model="titreTypeEtapeTypeNew.domaineId"
                  class="py-xs px-s mr-s"
                >
                  <option
                    v-for="domaine in domaines"
                    :key="domaine.id"
                    :value="domaine.id"
                  >
                    {{ domaine.id.toUpperCase() }} {{ domaine.nom.to }}
                  </option>
                </select>
              </td>
              <td>
                <select
                  v-model="titreTypeEtapeTypeNew.titreTypeTypeId"
                  class="py-xs px-s mr-s"
                  :disabled="!titreTypeEtapeTypeNew.domaineId"
                >
                  <option
                    v-for="titreType in titreTypeEtapeTypeNewTypes"
                    :key="titreType.id"
                    :value="titreType.type.id"
                  >
                    {{ titreType.type.nom }}
                  </option>
                </select>
              </td>
              <td>
                <select
                  v-model="titreTypeEtapeTypeNew.etapeTypeId"
                  class="py-xs px-s mr-s"
                >
                  <option
                    v-for="etapeType in etapesTypes"
                    :key="etapeType.id"
                    :value="etapeType.id"
                  >
                    {{ etapeType.nom }}
                  </option>
                </select>
              </td>
              <td>
                <button
                  class="btn px-s py-xs rnd-xs"
                  :disabled="
                    !titreTypeEtapeTypeNew.titreTypeTypeId ||
                      !titreTypeEtapeTypeNew.etapeTypeId
                  "
                  @click="
                    titreTypeEtapeTypeNew.lectureInterdit = !titreTypeEtapeTypeNew.lectureInterdit
                  "
                >
                  <i
                    v-if="titreTypeEtapeTypeNew.lectureInterdit"
                    class="icon-24 icon-cross"
                  />
                  <i v-else class="icon-24 icon-square" />
                </button>
              </td>
              <td>
                <button
                  class="btn px-s py-xs rnd-xs"
                  :disabled="
                    !titreTypeEtapeTypeNew.titreTypeTypeId ||
                      !titreTypeEtapeTypeNew.etapeTypeId
                  "
                  @click="
                    titreTypeEtapeTypeNew.modificationInterdit = !titreTypeEtapeTypeNew.modificationInterdit
                  "
                >
                  <i
                    v-if="titreTypeEtapeTypeNew.modificationInterdit"
                    class="icon-24 icon-cross"
                  />
                  <i v-else class="icon-24 icon-square" />
                </button>
              </td>
              <td>
                <button
                  class="btn px-s py-xs rnd-xs"
                  :disabled="
                    !titreTypeEtapeTypeNew.titreTypeTypeId ||
                      !titreTypeEtapeTypeNew.etapeTypeId
                  "
                  @click="
                    titreTypeEtapeTypeNew.creationInterdit = !titreTypeEtapeTypeNew.creationInterdit
                  "
                >
                  <i
                    v-if="titreTypeEtapeTypeNew.creationInterdit"
                    class="icon-24 icon-cross"
                  />
                  <i v-else class="icon-24 icon-square" />
                </button>
              </td>
              <td>
                <button
                  class="btn p-xs rnd-xs"
                  :disabled="!titreTypeEtapeTypeNewActive"
                  @click="titreTypeEtapeTypeNewUpdate"
                >
                  <i class="icon-24 icon-plus" />
                </button>
              </td>
            </tr>

            <tr
              v-for="ttet in administration.titresTypesEtapesTypes"
              :key="`${ttet.titreType.id}-${ttet.etapeType.id}`"
            >
              <td><CaminoDomaine :domaine-id="ttet.titreType.domaine.id" /></td>
              <td>
                <span class="h6 cap-first bold">{{
                  ttet.titreType.type.nom
                }}</span>
              </td>
              <td>
                <span class="h6 cap-first bold">{{ ttet.etapeType.nom }}</span>
              </td>
              <td>
                <button
                  class="btn px-s py-xs rnd-xs"
                  @click="
                    titreTypeEtapeTypeUpdate(
                      ttet.titreType.id,
                      ttet.etapeType.id,
                      ttet.lectureInterdit,
                      ttet.modificationInterdit,
                      ttet.creationInterdit,
                      'lecture'
                    )
                  "
                >
                  <i v-if="ttet.lectureInterdit" class="icon-24 icon-cross" />
                  <i v-else class="icon-24 icon-square" />
                </button>
              </td>
              <td>
                <button
                  class="btn px-s py-xs rnd-xs"
                  @click="
                    titreTypeEtapeTypeUpdate(
                      ttet.titreType.id,
                      ttet.etapeType.id,
                      ttet.lectureInterdit,
                      ttet.modificationInterdit,
                      ttet.creationInterdit,
                      'modification'
                    )
                  "
                >
                  <i
                    v-if="ttet.modificationInterdit"
                    class="icon-24 icon-cross"
                  />
                  <i v-else class="icon-24 icon-square" />
                </button>
              </td>
              <td>
                <button
                  class="btn px-s py-xs rnd-xs"
                  @click="
                    titreTypeEtapeTypeUpdate(
                      ttet.titreType.id,
                      ttet.etapeType.id,
                      ttet.lectureInterdit,
                      ttet.modificationInterdit,
                      ttet.creationInterdit,
                      'creation'
                    )
                  "
                >
                  <i v-if="ttet.creationInterdit" class="icon-24 icon-cross" />
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
import Statut from '../_common/statut.vue'

export default {
  components: {
    CaminoDomaine,
    Statut
  },

  props: {
    administration: { type: Object, required: true }
  },

  data() {
    return {
      titreTypeNew: {
        domaineId: null,
        titreTypeTypeId: null,
        gestionnaire: false,
        associee: false
      },
      titreTypeTitreStatutNew: {
        domaineId: null,
        titreTypeTypeId: null,
        titreStatutId: null,
        titresModificationInterdit: false,
        demarchesModificationInterdit: false,
        etapesModificationInterdit: false
      },
      titreTypeEtapeTypeNew: {
        domaineId: null,
        titreTypeTypeId: null,
        etapeTypeId: null,
        lectureInterdit: false,
        modificationInterdit: false,
        creationInterdit: false
      }
    }
  },

  computed: {
    user() {
      return this.$store.state.user.current
    },

    domaines() {
      return this.$store.state.administration.metas.domaines
    },

    titresStatuts() {
      return this.$store.state.administration.metas.titresStatuts
    },

    etapesTypes() {
      return this.$store.state.administration.metas.etapesTypes
    },

    loaded() {
      return !!this.administration
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

    titreTypeTitreStatutNewTypes() {
      if (!this.titreTypeTitreStatutNew.domaineId) {
        return []
      }

      const domaine = this.domaines.find(
        d => d.id === this.titreTypeTitreStatutNew.domaineId
      )

      return domaine.titresTypes
    },

    titreTypeEtapeTypeNewTypes() {
      if (!this.titreTypeEtapeTypeNew.domaineId) {
        return []
      }

      const domaine = this.domaines.find(
        d => d.id === this.titreTypeEtapeTypeNew.domaineId
      )

      return domaine.titresTypes
    },

    titreTypeNewActive() {
      return (
        this.titreTypeNew.titreTypeTypeId &&
        this.titreTypeNew.domaineId &&
        (this.titreTypeNew.gestionnaire || this.titreTypeNew.associee)
      )
    },

    titreTypeTitreStatutNewActive() {
      return (
        this.titreTypeTitreStatutNew.domaineId &&
        this.titreTypeTitreStatutNew.titreTypeTypeId &&
        this.titreTypeTitreStatutNew.titreStatutId &&
        (this.titreTypeTitreStatutNew.titresModificationInterdit ||
          this.titreTypeTitreStatutNew.demarchesModificationInterdit ||
          this.titreTypeTitreStatutNew.etapesModificationInterdit)
      )
    },

    titreTypeEtapeTypeNewActive() {
      return (
        this.titreTypeEtapeTypeNew.domaineId &&
        this.titreTypeEtapeTypeNew.titreTypeTypeId &&
        this.titreTypeEtapeTypeNew.etapeTypeId &&
        (this.titreTypeEtapeTypeNew.lectureInterdit ||
          this.titreTypeEtapeTypeNew.modificationInterdit ||
          this.titreTypeEtapeTypeNew.creationInterdit)
      )
    }
  },

  created() {
    this.get()
  },

  methods: {
    async get() {
      await this.$store.dispatch('administration/permissionsMetasGet')
    },

    async titreTypeUpdate(titreTypeId, gestionnaire, associee, type) {
      if (type === 'gestionnaire') {
        gestionnaire = !gestionnaire
      } else if (type === 'associee') {
        associee = !associee
      }

      await this.$store.dispatch('administration/titreTypeUpdate', {
        administrationId: this.administration.id,
        titreTypeId,
        gestionnaire,
        associee
      })
    },

    async titreTypeTitreStatutUpdate(
      titreTypeId,
      titreStatutId,
      titresModificationInterdit,
      demarchesModificationInterdit,
      etapesModificationInterdit,
      type
    ) {
      if (type === 'titres') {
        titresModificationInterdit = !titresModificationInterdit
      } else if (type === 'demarches') {
        demarchesModificationInterdit = !demarchesModificationInterdit
      } else if (type === 'etapes') {
        etapesModificationInterdit = !etapesModificationInterdit
      }

      await this.$store.dispatch('administration/titreTypeTitreStatutUpdate', {
        administrationId: this.administration.id,
        titreTypeId,
        titreStatutId,
        titresModificationInterdit,
        demarchesModificationInterdit,
        etapesModificationInterdit
      })
    },

    async titreTypeEtapeTypeUpdate(
      titreTypeId,
      etapeTypeId,
      lectureInterdit,
      modificationInterdit,
      creationInterdit,
      type
    ) {
      if (type === 'lecture') {
        lectureInterdit = !lectureInterdit
      } else if (type === 'modification') {
        modificationInterdit = !modificationInterdit
      } else if (type === 'creation') {
        creationInterdit = !creationInterdit
      }

      await this.$store.dispatch('administration/titresTypeEtapeTypeUpdate', {
        administrationId: this.administration.id,
        titreTypeId,
        etapeTypeId,
        lectureInterdit,
        modificationInterdit,
        creationInterdit
      })
    },

    titreTypeNewUpdate() {
      if (this.titreTypeNewActive) {
        this.titreTypeUpdate(
          `${this.titreTypeNew.titreTypeTypeId}${this.titreTypeNew.domaineId}`,
          this.titreTypeNew.gestionnaire,
          this.titreTypeNew.associee
        )

        this.titreTypeNew = {
          domaineId: null,
          titreTypeTypeId: null,
          gestionnaire: false,
          associee: false
        }
      }
    },

    titreTypeTitreStatutNewUpdate() {
      if (this.titreTypeTitreStatutNewActive) {
        this.titreTypeTitreStatutUpdate(
          `${this.titreTypeTitreStatutNew.titreTypeTypeId}${this.titreTypeTitreStatutNew.domaineId}`,
          this.titreTypeTitreStatutNew.titreStatutId,
          this.titreTypeTitreStatutNew.titresModificationInterdit,
          this.titreTypeTitreStatutNew.demarchesModificationInterdit,
          this.titreTypeTitreStatutNew.etapesModificationInterdit
        )

        this.titreTypeTitreStatutNew = {
          domaineId: null,
          titreTypeTypeId: null,
          titreStatutId: null,
          titresModificationInterdit: false,
          demarchesModificationInterdit: false,
          etapesModificationInterdit: false
        }
      }
    },

    titreTypeEtapeTypeNewUpdate() {
      if (this.titreTypeEtapeTypeNewActive) {
        this.titreTypeEtapeTypeUpdate(
          `${this.titreTypeEtapeTypeNew.titreTypeTypeId}${this.titreTypeEtapeTypeNew.domaineId}`,
          this.titreTypeEtapeTypeNew.etapeTypeId,
          this.titreTypeEtapeTypeNew.lectureInterdit,
          this.titreTypeEtapeTypeNew.modificationInterdit,
          this.titreTypeEtapeTypeNew.creationInterdit
        )

        this.titreTypeEtapeTypeNew = {
          domaineId: null,
          titreTypeTypeId: null,
          etapeTypeId: null,
          lectureInterdit: false,
          modificationInterdit: false,
          creationInterdit: false
        }
      }
    }
  }
}
</script>

<style></style>template
