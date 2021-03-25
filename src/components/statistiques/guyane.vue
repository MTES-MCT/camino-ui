<template>
  <Loader v-if="!loaded" class="content" />
  <div v-else class="content">
    <div id="etat" class="mb-xxl mt">
      <h2>État du domaine minier en Guyane en temps réel</h2>
      <span class="separator" />
      <p>
        Les données affichées ici sont celles contenues dans la base de donnée
        Camino. Elles sont susceptibles d’évoluer chaque jour au grès des
        décisions et de la fin de validité des titres et autorisations. Ces
        données concernent exclusivement le territoire guyanais.
      </p>
      <p>
        Les surfaces cumulées concernées par un titre ou une autorisation
        d’exploration et ou d’exploitation n’impliquent pas qu’elles sont
        effectivement explorées ou exploitées sur tout ou partie de l'année. Les
        travaux miniers font l’objet de déclarations ou d’autorisations
        distinctes portant sur une partie seulement de la surface des titres
        miniers.
      </p>
      <div class="mb-xxl">
        <h3>Autorisations et titres d’exploration</h3>
        <hr />
        <div class="tablet-blobs">
          <div class="tablet-blob-1-4">
            <p class="h0 text-center">
              {{ statistiquesGuyane.titresArm }}
            </p>
            <p class="bold text-center">Autorisations de recherche</p>
            <p class="h5 text-center">
              <RouterLink
                :to="{
                  name: 'titres',
                  query: {
                    domainesIds: 'm',
                    typesIds: 'ar',
                    statutsIds: 'val,mod',
                    territoires: 'guyane',
                    vue: 'liste'
                  }
                }"
              >
                Voir les titres
              </RouterLink>
            </p>
          </div>
          <div class="tablet-blob-1-4">
            <p class="h0 text-center">
              {{ statistiquesGuyane.titresPrm }}
            </p>
            <p class="bold text-center">Permis exclusifs de recherches</p>
            <p class="h5 text-center">
              <RouterLink
                :to="{
                  name: 'titres',
                  query: {
                    domainesIds: 'm',
                    typesIds: 'pr',
                    statutsIds: 'val,mod',
                    territoires: 'guyane',
                    vue: 'liste'
                  }
                }"
              >
                Voir les titres
              </RouterLink>
            </p>
          </div>
          <div class="tablet-blob-1-2">
            <p class="h0 text-center">
              {{ numberFormat(statistiquesGuyane.surfaceExploration) }} ha
            </p>
            <p class="bold text-center">
              Surfaces cumulées des titres pouvant faire l'objet d'une activité
              d’exploration
            </p>
          </div>
        </div>
      </div>
      <div class="mb-xxl">
        <h3>Autorisations et titres d’exploitation</h3>
        <hr />
        <div class="tablet-blobs">
          <div class="tablet-blob-1-4">
            <p class="h0 text-center">
              {{ statistiquesGuyane.titresAxm }}
            </p>
            <p class="bold text-center">Autorisations d'exploitation</p>
            <p class="h5 text-center">
              <RouterLink
                :to="{
                  name: 'titres',
                  query: {
                    domainesIds: 'm',
                    typesIds: 'ax',
                    statutsIds: 'val,mod',
                    territoires: 'guyane',
                    vue: 'liste'
                  }
                }"
              >
                Voir les titres
              </RouterLink>
            </p>
          </div>
          <div class="tablet-blob-1-4">
            <p class="h0 text-center">
              {{ statistiquesGuyane.titresPxm }}
            </p>
            <p class="bold text-center">Permis d'exploitation</p>
            <p class="h5 text-center">
              <RouterLink
                :to="{
                  name: 'titres',
                  query: {
                    domainesIds: 'm',
                    typesIds: 'px',
                    statutsIds: 'val,mod',
                    territoires: 'guyane',
                    vue: 'liste'
                  }
                }"
              >
                Voir les titres
              </RouterLink>
            </p>
          </div>
          <div class="tablet-blob-1-4">
            <p class="h0 text-center">
              {{ statistiquesGuyane.titresCxm }}
            </p>
            <p class="bold text-center">Concessions</p>
            <p class="h5 text-center">
              <RouterLink
                :to="{
                  name: 'titres',
                  query: {
                    domainesIds: 'm',
                    typesIds: 'cx',
                    statutsIds: 'val,mod',
                    territoires: 'guyane',
                    vue: 'liste'
                  }
                }"
              >
                Voir les titres
              </RouterLink>
            </p>
          </div>
          <div class="tablet-blob-1-4">
            <p class="h0 text-center">
              {{ numberFormat(statistiquesGuyane.surfaceExploitation) }} ha
            </p>
            <p class="bold text-center">
              Surfaces cumulées des titres pouvant faire l'objet d'une activité
              d’exploitation
            </p>
          </div>
        </div>
      </div>
    </div>

    <h2>Indicateurs annuels de production et d’activité minière légales</h2>
    <span class="separator" />
    <p class="mb-xl">
      Les données affichées ici sont celles contenues dans la base de donnée
      Camino. Elles sont stabilisées pour l’année n-2 mais sont susceptibles
      d’évoluer jusqu’à la cloture de la collecte des déclarations
      règlementaires de l’année précédente et l'année en cours. Ces données
      concernent exclusivement le territoire guyanais.
    </p>

    <div class="flex">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="mr-xs"
        :class="{ active: tabActive === tab.id }"
      >
        <div class="p-m btn-tab rnd-t-s" @click="tabToggle(tab.id)">
          {{ tab.nom }}
        </div>
      </div>
    </div>

    <div class="line-neutral width-full mb" />
    <GuyaneActivite
      :statistique-guyane="statistiques[tabActive]"
      :en-construction="tabs.find(t => t.id === tabActive).enConstruction"
      class="mb-xxl"
    />
    <div class="line-neutral width-full mb-xl" />
    <div id="evolution" class="mb-xxl">
      <h2>
        Évolution de l’activité sur le domaine minier de Guyane
      </h2>
      <span class="separator" />
      <p>
        Les données affichées ici sont celles contenues dans la base de donnée
        Camino. Les données antérieures à 2018 reprises d’anciens systèmes
        peuvent ne pas être exhautives. Ces données concernent exclusivement le
        territoire guyanais.
      </p>
      <div class="hide">
        <h3>Évolution de la production annuelle d’or nette</h3>
        <hr />
        <div class="tablet-float-blobs clearfix">
          <div class="tablet-float-blob-1-3 mb-xl mt">
            <p class="h0 text-center">
              {{ numberFormat(statistiques[anneeCurrent - 1].orNet) }} kg
            </p>
            <p>
              Production d’or nette (après affinage) issue des mines en Guyane
              l'an dernier
            </p>
          </div>
          <div class="tablet-float-blob-2-3 relative mb-xl">
            <LineChart
              :data="
                statsLineFormat(
                  statistiquesGuyane.annees,
                  'orNet',
                  'Or net extrait en Kg'
                )
              "
            />
          </div>
        </div>
      </div>
      <h3>
        Évolution du nombre et des surfaces des autorisations de recherche
        octroyées
      </h3>
      <hr />
      <div class="tablet-float-blobs clearfix">
        <div class="tablet-float-blob-1-3 mb-xl mt">
          <p class="h0 text-center">
            {{ statistiques[anneeCurrent - 1].titresArm.quantite }}
          </p>
          <p>autorisations de recherches octroyées l’an dernier</p>
        </div>
        <div class="tablet-float-blob-2-3 relative mb-xl">
          <BarChart
            :data="
              statsBarFormat(
                statistiquesGuyane.annees,
                'titresArm',
                'quantite',
                'surface',
                'Autorisations de recherche',
                'Surface des autorisations de recherche (ha)'
              )
            "
            :suggested-max="suggestedMaxTitres"
          />
        </div>
      </div>
      <h3>
        Évolution du nombre et des surfaces des permis de recherches octroyés
      </h3>
      <hr />
      <div class="tablet-float-blobs clearfix">
        <div class="tablet-float-blob-1-3 mb-xl mt">
          <p class="h0 text-center">
            {{ statistiques[anneeCurrent - 1].titresPrm.quantite }}
          </p>
          <p>permis exclusifs de recherches octroyés l’an dernier</p>
        </div>
        <div class="tablet-float-blob-2-3 relative mb-xl">
          <BarChart
            :data="
              statsBarFormat(
                statistiquesGuyane.annees,
                'titresPrm',
                'quantite',
                'surface',
                'Permis de recherches',
                'Surface des permis de recherches (ha)'
              )
            "
            :suggested-max="suggestedMaxTitres"
          />
        </div>
      </div>
      <h3>
        Évolution du nombre et des surfaces des autorisations d'exploitation
        octroyées
      </h3>
      <hr />
      <div class="tablet-float-blobs clearfix">
        <div class="tablet-float-blob-1-3 mb-xl mt">
          <p class="h0 text-center">
            {{ statistiques[anneeCurrent - 1].titresAxm.quantite }}
          </p>
          <p>autorisations d’exploitation octroyées l’an dernier</p>
        </div>
        <div class="tablet-float-blob-2-3 relative mb-xl">
          <BarChart
            :data="
              statsBarFormat(
                statistiquesGuyane.annees,
                'titresAxm',
                'quantite',
                'surface',
                'Autorisations d\'exploitation',
                'Surface des autorisations de recherche (ha)'
              )
            "
            :suggested-max="suggestedMaxTitres"
          />
        </div>
      </div>
      <h3>
        Évolution du nombre et des surfaces des permis d'exploitation octroyés
      </h3>
      <hr />
      <div class="tablet-float-blobs clearfix">
        <div class="tablet-float-blob-1-3 mb-xl mt">
          <p class="h0 text-center">
            {{ statistiques[anneeCurrent - 1].titresPxm.quantite }}
          </p>
          <p>permis d’exploitation octroyés l’an dernier</p>
        </div>
        <div class="tablet-float-blob-2-3 relative mb-xl">
          <BarChart
            :data="
              statsBarFormat(
                statistiquesGuyane.annees,
                'titresPxm',
                'quantite',
                'surface',
                'Permis d\'exploitation',
                'Surface des permis d\'exploitation (ha)'
              )
            "
            :suggested-max="suggestedMaxTitres"
          />
        </div>
      </div>
      <h3>Évolution du nombre et des surfaces des concessions octroyées</h3>
      <hr />
      <div class="tablet-float-blobs clearfix">
        <div class="tablet-float-blob-1-3 mb-xl mt">
          <p class="h0 text-center">
            {{ statistiques[anneeCurrent - 1].titresCxm.quantite }}
          </p>
          <p>concessions octroyées l’an dernier</p>
        </div>
        <div class="tablet-float-blob-2-3 relative mb-xl">
          <BarChart
            :data="
              statsBarFormat(
                statistiquesGuyane.annees,
                'titresCxm',
                'quantite',
                'surface',
                'Concessions',
                'Surface des concessions (ha)'
              )
            "
            :suggested-max="suggestedMaxTitres"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../_ui/loader.vue'
import GuyaneActivite from './guyane-activite.vue'
import BarChart from '../_charts/bar.vue'
import LineChart from '../_charts/line.vue'
import { suggestedMaxCalc, statsBarFormat, statsLineFormat } from './_utils'
import numberFormat from '@/utils/number-format'

export default {
  name: 'TableauBordGuyane',

  components: { Loader, GuyaneActivite, LineChart, BarChart },

  data() {
    return {
      loaded: false,
      tabActive: 0
    }
  },

  computed: {
    statistiquesGuyane() {
      return this.$store.state.statistiques.guyane
    },

    statistiques() {
      return this.statistiquesGuyane.annees.reduce((acc, statsAnnee) => {
        acc[statsAnnee.annee] = statsAnnee

        return acc
      }, {})
    },

    anneeCurrent() {
      return new Date().getFullYear()
    },

    tabs() {
      return [
        {
          id: this.anneeCurrent - 2,
          nom: (this.anneeCurrent - 2).toString()
        },
        {
          id: this.anneeCurrent - 1,
          nom: (this.anneeCurrent - 1).toString(),
          enConstruction: true
        },
        {
          id: this.anneeCurrent,
          nom: this.anneeCurrent.toString(),
          enConstruction: true
        }
      ]
    },

    suggestedMaxTitres() {
      return suggestedMaxCalc(this.statistiquesGuyane.annees, [
        'titresArm',
        'titresPrm',
        'titresAxm',
        'titresPxm',
        'titresCxm'
      ])
    }
  },

  async created() {
    this.tabToggle(this.anneeCurrent - 2)
    await this.get()
  },

  methods: {
    async get() {
      await this.$store.dispatch('statistiques/get', 'guyane')

      if (!this.loaded) {
        this.loaded = true
      }
    },

    tabToggle(tabId) {
      this.tabActive = tabId
    },

    statsLineFormat(annees, id, label) {
      return statsLineFormat(annees, id, label)
    },

    statsBarFormat(annees, id, bar, line, labelBar, labelLine) {
      return statsBarFormat(annees, id, bar, line, labelBar, labelLine)
    },

    numberFormat(number) {
      return numberFormat(number)
    }
  }
}
</script>
