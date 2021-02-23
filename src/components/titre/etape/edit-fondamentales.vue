<template>
  <div>
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6 class="mb-xs">Durée (années / mois)</h6>
        <p class="h6 italic mb-0">Optionnel</p>
      </div>

      <EditHeritage
        class="tablet-blob-2-3"
        :prop.sync="etape.heritageProps.duree"
      >
        <template #write>
          <div class="tablet-blobs">
            <div class="tablet-blob-1-2">
              <inputNumber
                v-model.number="etape.duree.ans"
                :integer="true"
                placeholder="années"
                class="p-s mb-s"
              />
            </div>
            <div class="tablet-blob-1-2">
              <inputNumber
                v-model.number="etape.duree.mois"
                :integer="true"
                placeholder="mois"
                class="p-s"
              />
            </div>
          </div>
          <label v-if="etape.duree.ans || etape.duree.mois" class="h5">
            <input v-model="etape.incertitudes.duree" type="checkbox" /> donnée
            incertaine
          </label>
        </template>
        <template #read>
          <div
            v-if="
              etape.heritageProps.duree.etape &&
                etape.heritageProps.duree.etape.duree
            "
            class="p-s mb-s border"
          >
            <PropDuree :duree="etape.heritageProps.duree.etape.duree" />
          </div>
          <div v-else class="p-s mb-s border">–</div>
        </template>
      </EditHeritage>
    </div>

    <hr />

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6 class="mb-xs">Date de début</h6>
        <p class="h6 italic mb-0">Optionnel</p>
      </div>
      <EditHeritage
        class="tablet-blob-2-3"
        :prop.sync="etape.heritageProps.dateDebut"
      >
        <template #write>
          <InputDate v-model="etape.dateDebut" class="mb-s" />
          <label v-if="etape.dateDebut" class="h5">
            <input v-model="etape.incertitudes.dateDebut" type="checkbox" />
            Donnée incertaine
          </label>
        </template>
        <template #read>
          <div
            v-if="
              etape.heritageProps.dateDebut.etape &&
                etape.heritageProps.dateDebut.etape.dateDebut
            "
            class="p-s mb-s border"
          >
            {{ etape.heritageProps.dateDebut.etape.dateDebut }}
          </div>
          <div v-else class="p-s mb-s border">–</div>
        </template>
      </EditHeritage>
    </div>

    <hr />

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6 class="mb-xs">Date d'échéance</h6>
        <p class="h6 italic mb-0">Optionnel</p>
      </div>
      <EditHeritage
        class="tablet-blob-2-3"
        :prop.sync="etape.heritageProps.dateFin"
      >
        <template #write>
          <InputDate v-model="etape.dateFin" class="mb-s" />
          <label v-if="etape.dateFin" class="h5">
            <input v-model="etape.incertitudes.dateFin" type="checkbox" />
            Donnée incertaine
          </label>
        </template>
        <template #read>
          <div
            v-if="
              etape.heritageProps.dateFin.etape &&
                etape.heritageProps.dateFin.etape.dateFin
            "
            class="p-s mb-s border"
          >
            {{ etape.heritageProps.dateFin.etape.dateFin }}
          </div>
          <div v-else class="p-s mb-s border">–</div>
        </template>
      </EditHeritage>
    </div>

    <hr />
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6 class="mb-xs">Surface (Km²)</h6>
        <p class="h6 italic mb-0">Optionnel</p>
      </div>
      <EditHeritage
        class="tablet-blob-2-3"
        :prop.sync="etape.heritageProps.surface"
      >
        <template #write>
          <inputNumber
            v-model.number="etape.surface"
            min="0"
            placeholder="0"
            class="mb-s"
          />
          <label v-if="etape.surface" class="h5">
            <input v-model="etape.incertitudes.surface" type="checkbox" />
            Donnée incertaine
          </label>
        </template>
        <template #read>
          <div
            v-if="
              etape.heritageProps.surface.etape &&
                etape.heritageProps.surface.etape.surface
            "
            class="p-s mb-s border"
          >
            {{ etape.heritageProps.surface.etape.surface }}
          </div>
          <div v-else class="p-s mb-s border">–</div>
        </template>
      </EditHeritage>
    </div>

    <hr />

    <h3 class="mb-s">Titulaires</h3>
    <p class="h6 italic mb-s">Optionnel</p>
    <EditHeritage :prop.sync="etape.heritageProps.titulaires">
      <template #write>
        <div
          v-for="(titulaire, n) in etape.titulaires"
          :key="`titluaire-${titulaire.id}`"
        >
          <div class="flex mb-s">
            <select v-model="etape.titulaires[n]" class="p-s mr-s">
              <option
                v-for="entreprise in entreprises"
                :key="`titulaire-${titulaire.id}-entreprise-${entreprise.id}`"
                :value="{ id: entreprise.id }"
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
        </div>

        <button
          v-if="!etape.titulaires.some(({ id }) => id === '')"
          class="btn rnd-xs py-s px-m full-x flex h5 mb-s"
          @click="titulaireAdd"
        >
          <span class="mt-xxs">Ajouter un titulaire</span
          ><i class="icon-24 icon-plus flex-right" />
        </button>

        <label v-if="titulairesLength" class="h5">
          <input v-model="etape.incertitudes.titulaires" type="checkbox" />
          Donnée incertaine
        </label>
      </template>
      <template #read>
        <ul
          v-if="
            etape.heritageProps.titulaires.etape &&
              etape.heritageProps.titulaires.etape.titulaires &&
              etape.heritageProps.titulaires.etape.titulaires.length
          "
          class="list-prefix"
        >
          <li
            v-for="t in etape.heritageProps.titulaires.etape.titulaires"
            :key="t.id"
          >
            {{ etablissementNameFind(t.etablissements, etape.date) || t.nom }}
          </li>
        </ul>
        <p v-else class="h5 italic mb-s">Aucun titulaire</p>
      </template>
    </EditHeritage>
    <hr />

    <h3 class="mb-s">Amodiataires</h3>
    <p class="h6 italic mb-s">Optionnel</p>

    <EditHeritage :prop.sync="etape.heritageProps.amodiataires">
      <template #write>
        <div
          v-for="(amodiataire, n) in etape.amodiataires"
          :key="`amodiataire-${amodiataire.id}`"
        >
          <div class="flex mb-s">
            <select v-model="etape.amodiataires[n]" class="p-s mr-s">
              <option
                v-for="entreprise in entreprises"
                :key="
                  `amodiataire-${amodiataire.id}-entreprise-${entreprise.id}`
                "
                :value="{ id: entreprise.id }"
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
        </div>

        <button
          v-if="!etape.amodiataires.some(({ id }) => id === '')"
          class="btn rnd-xs py-s px-m full-x flex h5 mb-s"
          @click="amodiataireAdd"
        >
          <span class="mt-xxs">Ajouter un amodiataire</span
          ><i class="icon-24 icon-plus flex-right" />
        </button>

        <label v-if="amodiatairesLength" class="h5">
          <input v-model="etape.incertitudes.amodiataires" type="checkbox" />
          Donnée incertaine
        </label>
      </template>
      <template #read>
        <ul
          v-if="
            etape.heritageProps.amodiataires.etape &&
              etape.heritageProps.amodiataires.etape.amodiataires &&
              etape.heritageProps.amodiataires.etape.amodiataires.length
          "
          class="list-prefix"
        >
          <li
            v-for="t in etape.heritageProps.amodiataires.etape.amodiataires"
            :key="t.id"
          >
            {{ etablissementNameFind(t.etablissements, etape.date) || t.nom }}
          </li>
        </ul>
        <p v-else class="h5 italic mb-s">Aucun amodiataire</p>
      </template>
    </EditHeritage>

    <hr />

    <h3 class="mb-s">Substances</h3>
    <p class="h6 italic mb-s">Optionnel</p>
    <EditHeritage :prop.sync="etape.heritageProps.substances">
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
          class="btn rnd-xs py-s px-m full-x flex h5 mb-s"
          @click="substanceAdd"
        >
          <span class="mt-xxs">Ajouter une substance</span
          ><i class="icon-24 icon-plus flex-right" />
        </button>

        <label v-if="substancesLength" class="h5">
          <input v-model="etape.incertitudes.substances" type="checkbox" />
          Donnée incertaine
        </label>
      </template>

      <template #read>
        <TagList
          v-if="
            etape.heritageProps.substances.etape &&
              etape.heritageProps.substances.etape.substances &&
              etape.heritageProps.substances.etape.substances.length
          "
          class="mb-s"
          :elements="
            etape.heritageProps.substances.etape.substances.map(s => s.nom)
          "
        />
        <p v-else class="h5 italic mb-s">Aucune substance</p>
      </template>
    </EditHeritage>

    <hr />
  </div>
</template>

<script>
import TagList from '../../_ui/tag-list.vue'
import InputDate from '../../_ui/input-date.vue'
import InputNumber from '../../_ui/input-number.vue'
import EditHeritage from './edit-heritage.vue'
import PropDuree from './prop-duree.vue'

import { etablissementNameFind } from '../../../utils/entreprise'

export default {
  components: { InputDate, InputNumber, EditHeritage, TagList, PropDuree },

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
