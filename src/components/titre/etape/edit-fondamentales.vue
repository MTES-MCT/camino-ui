<template>
  <div>
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5 class="mb-0">Durée (années / mois)</h5>
        <p class="h6 italic mb-0">Optionnel</p>
      </div>

      <EditHeritage
        v-model:prop="etape.heritageProps.duree"
        class="tablet-blob-2-3"
        prop-id="duree"
      >
        <template #write>
          <div class="tablet-blobs">
            <div class="tablet-blob-1-2">
              <inputNumber
                v-model="etape.duree.ans"
                :integer="true"
                placeholder="années"
                class="py-s mb-s"
              />
            </div>
            <div class="tablet-blob-1-2">
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
              <input v-model="etape.incertitudes.duree" type="checkbox" />
              Incertain
            </label>
          </div>
        </template>
        <template #read>
          <div class="border p-s mb-s bold">
            <PropDuree :duree="etape.heritageProps.duree.etape.duree" />
          </div>
        </template>
      </EditHeritage>
    </div>

    <hr />

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5 class="mb-0">Date de début</h5>
        <p class="h6 italic mb-0">Optionnel</p>
      </div>
      <EditHeritage
        v-model:prop="etape.heritageProps.dateDebut"
        class="tablet-blob-2-3"
        prop-id="dateDebut"
      >
        <template #write>
          <InputDate v-model="etape.dateDebut" class="mb-s" />
          <div v-if="etape.dateDebut" class="h6">
            <label>
              <input v-model="etape.incertitudes.dateDebut" type="checkbox" />
              Incertain
            </label>
          </div>
        </template>
        <template #read>
          <div class="border p-s mb-s bold">
            {{ etape.heritageProps.dateDebut.etape.dateDebut }}
          </div>
        </template>
      </EditHeritage>
    </div>

    <hr />

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5 class="mb-0">Date d'échéance</h5>
        <p class="h6 italic mb-0">Optionnel</p>
      </div>
      <EditHeritage
        v-model:prop="etape.heritageProps.dateFin"
        class="tablet-blob-2-3"
        prop-id="dateFin"
      >
        <template #write>
          <InputDate v-model="etape.dateFin" class="mb-s" />
          <div v-if="etape.dateFin" class="h6">
            <label>
              <input v-model="etape.incertitudes.dateFin" type="checkbox" />
              Incertain
            </label>
          </div>
        </template>
        <template #read>
          <div class="border p-s mb-s bold">
            {{ etape.heritageProps.dateFin.etape.dateFin }}
          </div>
        </template>
      </EditHeritage>
    </div>

    <hr />
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5 class="mb-0">Surface (Km²)</h5>
        <p class="h6 italic mb-0">Optionnel</p>
      </div>
      <EditHeritage
        v-model:prop="etape.heritageProps.surface"
        class="tablet-blob-2-3"
        prop-id="surface"
      >
        <template #write>
          <inputNumber
            v-model="etape.surface"
            min="0"
            placeholder="0"
            class="mb-s"
          />
          <div v-if="etape.surface" class="h6">
            <label>
              <input v-model="etape.incertitudes.surface" type="checkbox" />
              Incertain
            </label>
          </div>
        </template>
        <template #read>
          <div class="border p-s mb-s bold">
            {{ etape.heritageProps.surface.etape.surface }}
          </div>
        </template>
      </EditHeritage>
    </div>

    <hr />

    <h3 class="mb-s">Titulaires</h3>
    <p class="h6 italic">Optionnel</p>
    <EditHeritage
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
                  etape.amodiataires.find(a => a.id === entreprise.id)
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
              <input v-model="titulaire.operateur" type="checkbox" /> Opérateur
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
            <input v-model="etape.incertitudes.titulaires" type="checkbox" />
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
            <Tag v-if="t.operateur" :mini="true" color="bg-info"
              >Opérateur
            </Tag>
          </li>
        </ul>
      </template>
    </EditHeritage>
    <hr />

    <h3 class="mb-s">Amodiataires</h3>
    <p class="h6 italic">Optionnel</p>

    <EditHeritage
      v-model:prop="etape.heritageProps.amodiataires"
      prop-id="amodiataires"
      :is-array="true"
    >
      <template #write>
        <div
          v-for="(amodiataire, n) in etape.amodiataires"
          :key="`amodiataire-${amodiataire.id}`"
        >
          <div class="flex mb-s">
            <select v-model="amodiataire.id" class="p-s mr-s">
              <option
                v-for="entreprise in entreprises"
                :key="`amodiataire-${amodiataire.id}-entreprise-${entreprise.id}`"
                :value="entreprise.id"
                :disabled="
                  etape.amodiataires.find(a => a.id === entreprise.id) ||
                  etape.titulaires.find(t => t.id === entreprise.id)
                "
              >
                {{ entreprise.nom }} ({{ entreprise.id }})
              </option>
            </select>
            <button class="btn py-s px-m rnd-xs" @click="amodiataireRemove(n)">
              <i class="icon-24 icon-minus" />
            </button>
          </div>
          <div v-if="amodiataire.id" class="h6 mb">
            <label>
              <input v-model="amodiataire.operateur" type="checkbox" />
              Opérateur
            </label>
          </div>
        </div>

        <button
          v-if="!etape.amodiataires.some(({ id }) => id === '')"
          class="btn small rnd-xs py-s px-m full-x flex mb-s"
          @click="amodiataireAdd"
        >
          <span class="mt-xxs">Ajouter un amodiataire</span
          ><i class="icon-24 icon-plus flex-right" />
        </button>

        <div v-if="amodiatairesLength" class="h6">
          <label>
            <input v-model="etape.incertitudes.amodiataires" type="checkbox" />
            Incertain
          </label>
        </div>
      </template>
      <template #read>
        <ul class="list-prefix">
          <li
            v-for="t in etape.heritageProps.amodiataires.etape.amodiataires"
            :key="t.id"
          >
            {{ etablissementNameFind(t.etablissements, etape.date) || t.nom }}
            <Tag v-if="t.operateur" :mini="true" color="bg-info"
              >Opérateur
            </Tag>
          </li>
        </ul>
      </template>
    </EditHeritage>

    <hr />

    <h3 class="mb-s">Substances</h3>
    <p class="h6 italic">Optionnel</p>
    <EditHeritage
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
            <input v-model="etape.incertitudes.substances" type="checkbox" />
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
    </EditHeritage>

    <hr />
  </div>
</template>

<script>
import Tag from '../../_ui/tag.vue'
import TagList from '../../_ui/tag-list.vue'
import InputDate from '../../_ui/input-date.vue'
import InputNumber from '../../_ui/input-number.vue'
import EditHeritage from './edit-heritage.vue'
import PropDuree from './prop-duree.vue'

import { etablissementNameFind } from '../../../utils/entreprise'

export default {
  components: { InputDate, InputNumber, EditHeritage, Tag, TagList, PropDuree },

  props: {
    etape: { type: Object, default: () => ({}) },
    domaineId: { type: String, default: '' }
  },

  computed: {
    entreprises() {
      return this.$store.state.titreEtape.metas.entreprises
    },

    substances() {
      return this.$store.state.titreEtape.metas.substances.filter(su =>
        su.legales.find(sl => sl.domaine.id === this.domaineId)
      )
    },

    titulairesLength() {
      return this.etape.titulaires.filter(({ id }) => id).length
    },

    amodiatairesLength() {
      return this.etape.amodiataires.filter(({ id }) => id).length
    },

    substancesLength() {
      return this.etape.substances.filter(({ id }) => id).length
    }
  },

  watch: {
    etape: {
      handler: function (etape) {
        if (!etape.duree) {
          etape.incertitudes.duree = false
        }

        if (!etape.surface) {
          etape.incertitudes.surface = false
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

        if (!etape.amodiataires.length) {
          etape.incertitudes.amodiataires = false
        }

        if (!etape.substances.length) {
          etape.incertitudes.substances = false
        }
      },
      deep: true
    }
  },

  methods: {
    titulaireAdd() {
      this.etape.titulaires.push({ id: '' })
    },

    titulaireRemove(index) {
      this.etape.titulaires.splice(index, 1)
    },
    amodiataireAdd() {
      this.etape.amodiataires.push({ id: '' })
    },

    amodiataireRemove(index) {
      this.etape.amodiataires.splice(index, 1)
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
    }
  }
}
</script>
