<template>
  <div>
    <div v-if="!isArm || userIsAdmin" class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5 class="mb-0">Durée (années / mois)</h5>
        <p v-if="dureeOptionalCheck" class="h6 italic mb-0">Optionnel</p>
      </div>

      <HeritageEdit
        v-model:prop="etape.heritageProps.duree"
        class="tablet-blob-2-3"
        prop-id="duree"
      >
        <template #write>
          <div class="blobs-mini">
            <div class="blob-mini-1-2">
              <inputNumber
                v-model="etape.duree.ans"
                :integer="true"
                placeholder="années"
                class="py-s mb-s"
              />
            </div>
            <div class="blob-mini-1-2">
              <inputNumber
                v-model="etape.duree.mois"
                :integer="true"
                placeholder="mois"
                class="p-s"
              />
            </div>
          </div>
          <div v-if="etape.duree.ans || etape.duree.mois" class="h6">
            <label>
              <input
                v-model="etape.incertitudes.duree"
                type="checkbox"
                class="mr-xs"
              />
              Incertain
            </label>
          </div>
        </template>
        <template #read>
          <div class="border p-s mb-s bold">
            <PropDuree :duree="etape.heritageProps.duree.etape.duree" />
          </div>
        </template>
      </HeritageEdit>

      <hr />
    </div>

    <div v-if="(!isArm && !isAxm) || userIsAdmin">
      <div v-if="canSeeAllDates" class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h5 class="mb-0">Date de début</h5>
          <p class="h6 italic mb-0">Optionnel</p>
        </div>
        <HeritageEdit
          v-model:prop="etape.heritageProps.dateDebut"
          class="tablet-blob-2-3"
          prop-id="dateDebut"
        >
          <template #write>
            <InputDate v-model="etape.dateDebut" class="mb-s" />
            <div v-if="etape.dateDebut" class="h6">
              <label>
                <input
                  v-model="etape.incertitudes.dateDebut"
                  type="checkbox"
                  class="mr-xs"
                />
                Incertain
              </label>
            </div>
          </template>
          <template #read>
            <div class="border p-s mb-s bold">
              {{ dateFormat(etape.heritageProps.dateDebut.etape.dateDebut) }}
            </div>
          </template>
        </HeritageEdit>
      </div>

      <div v-if="canSeeAllDates" class="tablet-blobs">
        <hr />
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h5 class="mb-0">Date d'échéance</h5>
          <p class="h6 italic mb-0">Optionnel</p>
        </div>
        <HeritageEdit
          v-model:prop="etape.heritageProps.dateFin"
          class="tablet-blob-2-3"
          prop-id="dateFin"
        >
          <template #write>
            <InputDate v-model="etape.dateFin" class="mb-s" />
            <div v-if="etape.dateFin" class="h6">
              <label>
                <input
                  v-model="etape.incertitudes.dateFin"
                  type="checkbox"
                  class="mr-xs"
                />
                Incertain
              </label>
            </div>
          </template>
          <template #read>
            <div class="border p-s mb-s bold">
              {{ dateFormat(etape.heritageProps.dateFin.etape.dateFin) }}
            </div>
          </template>
        </HeritageEdit>
      </div>
      <hr />

      <h3 class="mb-s">Titulaires</h3>
      <p class="h6 italic">Optionnel</p>
      <HeritageEdit
        v-model:prop="etape.heritageProps.titulaires"
        prop-id="titulaires"
        :is-array="true"
      >
        <template #write>
          <div
            v-for="(titulaire, n) in etape.titulaires"
            :key="`titluaire-${titulaire.id}`"
          >
            <div class="flex mb-s">
              <select v-model="titulaire.id" class="p-s mr-s">
                <option
                  v-for="entreprise in entreprises"
                  :key="`titulaire-${titulaire.id}-entreprise-${entreprise.id}`"
                  :value="entreprise.id"
                  :disabled="
                    etape.titulaires.find(t => t.id === entreprise.id) ||
                    etape.amodiataires?.find(a => a.id === entreprise.id)
                  "
                >
                  {{ `${entreprise.nom} (${entreprise.id})` }}
                </option>
              </select>
              <button class="btn py-s px-m rnd-xs" @click="titulaireRemove(n)">
                <i class="icon-24 icon-minus" />
              </button>
            </div>
            <div class="h6 mb">
              <label v-if="titulaire.id">
                <input
                  v-model="titulaire.operateur"
                  type="checkbox"
                  class="mr-xs"
                />
                Opérateur
              </label>
            </div>
          </div>

          <button
            v-if="!etape.titulaires.some(({ id }) => id === '')"
            class="btn small rnd-xs py-s px-m full-x flex mb-s"
            @click="titulaireAdd"
          >
            <span class="mt-xxs">Ajouter un titulaire</span
            ><i class="icon-24 icon-plus flex-right" />
          </button>
          <div v-if="titulairesLength" class="h6">
            <label>
              <input
                v-model="etape.incertitudes.titulaires"
                type="checkbox"
                class="mr-xs"
              />
              Incertain
            </label>
          </div>
        </template>
        <template #read>
          <ul class="list-prefix">
            <li
              v-for="t in etape.heritageProps.titulaires.etape.titulaires"
              :key="t.id"
            >
              {{ etablissementNameFind(t.etablissements, etape.date) || t.nom }}
              <Tag
                v-if="t.operateur"
                :mini="true"
                color="bg-info"
                class="ml-xs"
              >
                Opérateur
              </Tag>
            </li>
          </ul>
        </template>
      </HeritageEdit>

      <template v-if="canAddAmodiataires">
        <hr />

        <h3 class="mb-s">Amodiataires</h3>
        <p class="h6 italic">Optionnel</p>

        <HeritageEdit
          v-model:prop="etape.heritageProps.amodiataires"
          prop-id="amodiataires"
          :is-array="true"
        >
          <template #write>
            <AutocompleteGroup
              :model-elements="etape.amodiataires || []"
              :options="entreprises"
              :options-disabled="entreprisesDisabled"
              :incertitudes="etape.incertitudes.amodiataires"
              :operateur="true"
            />
          </template>
          <template #read>
            <ul class="list-prefix">
              <li
                v-for="t in etape.heritageProps.amodiataires.etape.amodiataires"
                :key="t.id"
              >
                {{
                  etablissementNameFind(t.etablissements, etape.date) || t.nom
                }}
                <Tag
                  v-if="t.operateur"
                  :mini="true"
                  color="bg-info"
                  class="ml-xs"
                >
                  Opérateur
                </Tag>
              </li>
            </ul>
          </template>
        </HeritageEdit>
      </template>

      <hr />
    </div>

    <h3 class="mb-s">Substances</h3>
    <HeritageEdit
      v-model:prop="etape.heritageProps.substances"
      prop-id="substances"
      :is-array="true"
    >
      <template #write>
        <div v-for="(substance, n) in etape.substances" :key="n">
          <div class="flex mb-s">
            <select v-model="etape.substances[n]" class="p-s mr-s">
              <option
                v-for="s in substances"
                :key="s.id"
                :value="{ id: s.id }"
                :disabled="etape.substances.find(({ id }) => id === s.id)"
              >
                {{ s.nom }}
              </option>
            </select>
            <button
              v-if="substancesLength && n + 1 < substancesLength"
              class="btn-border py-s px-m rnd-l-xs"
              @click="substanceMoveDown(n)"
            >
              <i class="icon-24 icon-move-down" />
            </button>
            <button
              v-if="substancesLength && n > 0 && etape.substances[n].id"
              :class="{
                'rnd-l-xs': !(substancesLength && n + 1 < substancesLength)
              }"
              class="btn-border py-s px-m"
              @click="substanceMoveUp(n)"
            >
              <i class="icon-24 icon-move-up" />
            </button>
            <button
              :class="{
                'rnd-l-xs': !etape.substances[n].id || substancesLength === 1
              }"
              class="btn py-s px-m rnd-r-xs"
              @click="substanceRemove(n)"
            >
              <i class="icon-24 icon-minus" />
            </button>
          </div>
        </div>

        <button
          v-if="!etape.substances.some(({ id }) => id === '')"
          class="btn small rnd-xs py-s px-m full-x flex mb-s"
          @click="substanceAdd"
        >
          <span class="mt-xxs">Ajouter une substance</span
          ><i class="icon-24 icon-plus flex-right" />
        </button>

        <div v-if="substancesLength" class="h6">
          <label>
            <input
              v-model="etape.incertitudes.substances"
              type="checkbox"
              class="mr-xs"
            />
            Incertain
          </label>
        </div>
      </template>

      <template #read>
        <TagList
          class="mb-s"
          :elements="
            etape.heritageProps.substances.etape.substances.map(s => s.nom)
          "
        />
      </template>
    </HeritageEdit>

    <hr />
  </div>
</template>

<script>
import { dateFormat } from '../../utils/index'
import Tag from '../_ui/tag.vue'
import TagList from '../_ui/tag-list.vue'
import InputDate from '../_ui/input-date.vue'
import InputNumber from '../_ui/input-number.vue'
import HeritageEdit from './heritage-edit.vue'
import PropDuree from './prop-duree.vue'
// import AmodiataireInputAutocomplete from './amodiataire-input-autocomplete.vue'
import AutocompleteGroup from './autocomplete-group.vue'

import { etablissementNameFind } from '@/utils/entreprise'

export default {
  components: {
    InputDate,
    InputNumber,
    HeritageEdit,
    Tag,
    TagList,
    PropDuree,
    AutocompleteGroup
  },

  props: {
    etape: { type: Object, default: () => ({}) },
    domaineId: { type: String, default: '' },
    titreTypeId: { type: String, required: true },
    userIsAdmin: { type: Boolean, required: true },
    userIsSuper: { type: Boolean, required: true },
    substances: { type: Array, required: true }
  },
  emits: ['complete-update'],

  data: () => ({
    amodiataireSelected: null
  }),

  computed: {
    entreprisesDisabled() {
      return this.entreprises.filter(entr => {
        return (
          this.etape.amodiataires.find(a => a.id === entr.id) ||
          this.etape.titulaires.find(t => t.id === entr.id)
        )
      })
    },

    isArm() {
      return this.domaineId === 'm' && this.titreTypeId === 'ar'
    },

    isAxm() {
      return this.domaineId === 'm' && this.titreTypeId === 'ax'
    },

    entreprises() {
      return this.$store.state.titreEtapeEdition.metas.entreprises
    },

    titulairesLength() {
      return this.etape.titulaires.filter(({ id }) => id).length
    },

    amodiatairesLength() {
      return this.etape.amodiataires?.filter(({ id }) => id).length || 0
    },

    substancesLength() {
      return this.etape.substances.filter(({ id }) => id).length
    },

    dureeOptionalCheck() {
      return (!this.isArm && !this.isAxm) || this.etape.type.id !== 'mfr'
    },

    canSeeAllDates() {
      if (this.userIsSuper) {
        return true
      }

      if (this.etape.type?.id === 'mfr' && (this.isArm || this.isAxm)) {
        return false
      }

      return true
    },

    canAddAmodiataires() {
      return !this.isArm && !this.isAxm
    },

    complete() {
      return (
        this.etape.type.id !== 'mfr' ||
        (this.substancesLength > 0 &&
          (this.dureeOptionalCheck ||
            this.etape.duree.ans ||
            this.etape.duree.mois))
      )
    }
  },

  watch: {
    complete: 'completeUpdate',
    etape: {
      handler: function (etape) {
        if (!etape.duree) {
          etape.incertitudes.duree = false
        }

        if (!etape.dateDebut) {
          etape.incertitudes.dateDebut = false
        }

        if (!etape.dateFin) {
          etape.incertitudes.dateFin = false
        }

        if (!etape.titulaires.length) {
          etape.incertitudes.titulaires = false
        }

        if (!etape.amodiataires?.length) {
          etape.incertitudes.amodiataires = false
        }

        if (!etape.substances.length) {
          etape.incertitudes.substances = false
        }
      },
      deep: true
    }
  },

  created() {
    this.completeUpdate()
  },

  methods: {
    titulaireAdd() {
      this.etape.titulaires.push({ id: '' })
    },

    titulaireRemove(index) {
      this.etape.titulaires.splice(index, 1)
    },

    amodiataireRemove(index) {
      this.etape.amodiataires?.splice(index, 1)
    },

    substanceAdd() {
      this.etape.substances.push({ id: '' })
    },

    substanceRemove(index) {
      this.etape.substances.splice(index, 1)
    },

    substanceMoveDown(n) {
      const substance = this.etape.substances[n]
      this.etape.substances.splice(n, 1)
      this.etape.substances.splice(n + 1, 0, substance)
    },

    substanceMoveUp(n) {
      const substance = this.etape.substances[n]
      this.etape.substances.splice(n, 1)
      this.etape.substances.splice(n - 1, 0, substance)
    },

    etablissementNameFind() {
      return etablissementNameFind()
    },

    dateFormat(date) {
      return dateFormat(date)
    },

    completeUpdate() {
      this.$emit('complete-update', this.complete)
    },

    amodiataireAdd(amodiataireId) {
      if (amodiataireId) {
        this.etape.amodiataires.push({ id: amodiataireId })
        this.amodiataireSelected = null
      }
    }
  }
}
</script>
