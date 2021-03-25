<template>
  <Loader v-if="!loaded" class="content" />
  <div v-else class="content">
    <div id="etat" class="mb-xxl mt">
      <h2>État du domaine minier sur les granulats marins en temps réel</h2>
      <span class="separator" />
      <p>
        Les données affichées ici sont celles contenues dans la base de donnée
        Camino. Elles sont susceptibles d’évoluer chaque jour au grès des
        décisions et de la fin de validité des titres et autorisations.
      </p>
      <p>
        Les surfaces cumulées concernées par un titre ou une autorisation
        n’impliquent pas qu’elles sont effectivement explorées ou exploitées sur
        tout ou partie de l'année. Les travaux miniers font l’objet de
        déclarations ou d’autorisations distinctes portant sur une partie
        seulement de la surface des titres miniers.
      </p>
      <div class="mb-xxl">
        <h3>Titres d’exploration</h3>
        <hr />
        <div class="tablet-blobs">
          <div class="tablet-blob-1-3">
            <p class="h0 text-center">
              {{ statistiquesGranulatsMarins.titresInstructionExploration }}
            </p>
            <div
              v-if="
                statistiquesGranulatsMarins.titresInstructionExploration > 1
              "
            >
              <p class="bold text-center">
                Demandes en cours d'instruction (initiale et modification en
                instance)
              </p>
            </div>
            <div v-else>
              <p class="bold text-center">
                Demande en cours d'instruction (initiale et modification en
                instance)
              </p>
            </div>
            <p class="h5 text-center">
              <RouterLink
                :to="{
                  name: 'titres',
                  query: {
                    domainesIds: 'w',
                    typesIds: 'ar,ap,pr',
                    statutsIds: 'dmi,mod',
                    vue: 'liste'
                  }
                }"
              >
                Voir les titres
              </RouterLink>
            </p>
          </div>
          <div class="tablet-blob-1-3">
            <p class="h0 text-center">
              {{ statistiquesGranulatsMarins.titresValPrw }}
            </p>
            <p class="bold text-center">Permis exclusifs de recherches</p>
            <p class="h5 text-center">
              <RouterLink
                :to="{
                  name: 'titres',
                  query: {
                    domainesIds: 'w',
                    typesIds: 'pr',
                    statutsIds: 'val',
                    vue: 'liste'
                  }
                }"
              >
                Voir les titres
              </RouterLink>
            </p>
          </div>
          <div class="tablet-blob-1-3">
            <p class="h0 text-center">
              {{ numberFormat(statistiquesGranulatsMarins.surfaceExploration) }}
              ha
            </p>
            <p class="bold text-center">
              Surfaces cumulées des titres pouvant faire l'objet d'une activité
              d’exploration
            </p>
          </div>
        </div>
      </div>
      <div class="mb-xxl">
        <h3>Titres d’exploitation</h3>
        <hr />
        <div class="tablet-blobs">
          <div class="tablet-blob-1-3">
            <p class="h0 text-center">
              {{ statistiquesGranulatsMarins.titresInstructionExploitation }}
            </p>
            <div
              v-if="
                statistiquesGranulatsMarins.titresInstructionExploitation > 1
              "
            >
              <p class="bold text-center">
                Demandes en cours d'instruction (initiale et modification en
                instance)
              </p>
            </div>
            <div v-else>
              <p class="bold text-center">
                Demande en cours d'instruction (initiale et modification en
                instance)
              </p>
            </div>
            <p class="h5 text-center">
              <RouterLink
                :to="{
                  name: 'titres',
                  query: {
                    domainesIds: 'w',
                    typesIds: 'ax,cx,px',
                    statutsIds: 'dmi,mod',
                    vue: 'liste'
                  }
                }"
              >
                Voir les titres
              </RouterLink>
            </p>
          </div>
          <div class="tablet-blob-1-3">
            <p class="h0 text-center">
              {{ statistiquesGranulatsMarins.titresValCxw }}
            </p>
            <div v-if="statistiquesGranulatsMarins.titresValCxw > 1">
              <p class="bold text-center">
                Concessions
              </p>
            </div>
            <div v-else>
              <p class="bold text-center">
                Concession
              </p>
            </div>
            <p class="h5 text-center">
              <RouterLink
                :to="{
                  name: 'titres',
                  query: {
                    domainesIds: 'w',
                    typesIds: 'cx',
                    statutsIds: 'val',
                    vue: 'liste'
                  }
                }"
              >
                Voir les titres
              </RouterLink>
            </p>
          </div>
          <div class="tablet-blob-1-3">
            <p class="h0 text-center">
              {{
                numberFormat(statistiquesGranulatsMarins.surfaceExploitation)
              }}
              ha
            </p>
            <p class="bold text-center">
              Surfaces cumulées des titres pouvant faire l'objet d'une activité
              d’exploitation
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="line-neutral width-full mb" />

    <h2>Production annuelle de granulats marins</h2>
    <span class="separator" />
    <p class="mb-xl">
      Données contenues dans la base de données Camino, stabilisées pour l’année
      n-1.
    </p>

    <div class="tablet-pt-s pb-s">
      <BarChart
        :data="
          statsBarFormat(
            statsAnneesAfter2010,
            'granulatsExtrait',
            'volumeGranulatsExtrait',
            'masseGranulatsExtrait',
            'Volume de production annuelle de granulats marins en m³',
            'Tonnage produit'
          )
        "
        :suggested-max="suggestedMaxProduction"
      />
    </div>

    <div class="line-neutral width-full mb-xl" />
    <h6>Sélectionner une année</h6>

    <select v-model="anneeActive" class="p-s mb-l full" @change="anneeSelect">
      <option v-for="annee in annees" :key="annee.id" :value="annee.id">
        {{ annee.nom }}
      </option>
    </select>

    <GranulatsMarinsActivite
      :statistique-granulats-marins="statistiques[anneeActive]"
      :en-construction="annees.find(t => t.id === anneeActive).enConstruction"
      class="mb-xxl"
    />
    <div class="line-neutral width-full mb-xl" />

    <div id="evolution" class="mb-xxl">
      <h2>
        Titres octroyés et surface
      </h2>
      <span class="separator" />
      <p>
        Données contenues dans la base de données Camino, concernant
        exclusivement le territoire français.
      </p>
      <h3>
        Nombre et surfaces des permis exclusif de recherche (PER) octroyés
      </h3>
      <hr />
      <div class="tablet-float-blobs clearfix">
        <div class="tablet-float-blob-1-3 mb-xl mt">
          <p class="h0 text-center">
            {{ statistiques[anneeCurrent - 1].titresPrw.quantite }}
          </p>
          <p>Permis exclusifs de recherches octroyés l’an dernier</p>
        </div>
        <div class="tablet-float-blob-2-3 relative mb-xl">
          <BarChart
            :data="
              statsBarFormat(
                statistiquesGranulatsMarins.annees,
                'titresPrw',
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
      <div v-if="pexAnneeCurrent">
        <h3>
          Nombre et surfaces des permis d'exploitation (PEX) octroyés
        </h3>
        <hr />
        <div class="tablet-float-blobs clearfix">
          <div class="tablet-float-blob-1-3 mb-xl mt">
            <p class="h0 text-center">
              {{ statistiques[anneeCurrent - 1].titresPxw.quantite }}
            </p>
            <p>permis d’exploitation octroyés l’an dernier</p>
          </div>
          <div class="tablet-float-blob-2-3 relative mb-xl">
            <BarChart
              :data="
                statsBarFormat(
                  statistiquesGranulatsMarins.annees,
                  'titresPxw',
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
      </div>
      <h3>
        Nombre et surfaces des concessions octroyées
      </h3>
      <hr />
      <div class="tablet-float-blobs clearfix">
        <div class="tablet-float-blob-1-3 mb-xl mt">
          <p class="h0 text-center">
            {{ statistiques[anneeCurrent - 1].titresCxw.quantite }}
          </p>
          <p>Concessions octroyées l’an dernier</p>
        </div>
        <div class="tablet-float-blob-2-3 relative mb-xl">
          <BarChart
            :data="
              statsBarFormat(
                statistiquesGranulatsMarins.annees,
                'titresCxw',
                'quantite',
                'surface',
                'Concessions',
                'Surfaces des concessions (ha)'
              )
            "
            :suggested-max="suggestedMaxTitres"
          />
        </div>
      </div>
      <h3>
        Nombre et surface des concessions valides
      </h3>
      <hr />
      <BarChart
        :data="
          statsBarFormat(
            statistiquesGranulatsMarins.annees,
            'concessionsValides',
            'quantite',
            'surface',
            'Concessions',
            'Surfaces des concessions (ha)'
          )
        "
        :suggested-max="suggestedMaxTitres"
      />
    </div>
  </div>
</template>

<script>
import Loader from '../_ui/loader.vue'
import GranulatsMarinsActivite from './granulats-marins-activite.vue'
import BarChart from '../_charts/bar.vue'
import { suggestedMaxCalc, statsBarFormat } from './_utils'
import numberFormat from '@/utils/number-format'

export default {
  name: 'TableauBordGranulatsMarins',

  components: { Loader, GranulatsMarinsActivite, BarChart },

  data() {
    return {
      loaded: false,
      anneeActive: 0
    }
  },

  computed: {
    statistiquesGranulatsMarins() {
      return this.$store.state.statistiques.granulatsMarins
    },

    statistiques() {
      return this.statistiquesGranulatsMarins.annees.reduce(
        (acc, statsAnnee) => {
          acc[statsAnnee.annee] = statsAnnee

          return acc
        },
        {}
      )
    },

    anneeCurrent() {
      return new Date().getFullYear()
    },

    annees() {
      return this.statsAnneesAfter2010.map(annee => {
        const id = annee.annee
        return {
          id,
          nom: id.toString(),
          enConstruction: id === this.anneeCurrent - 1 // l'année en cours n'étant pas affichée, seule l'année précédente est affichée à partir du 1er avril de l'année courante
        }
      })
    },

    suggestedMaxTitres() {
      return suggestedMaxCalc(this.statistiquesGranulatsMarins.annees, [
        'titresPrw',
        'titresPxw',
        'titresCxw'
      ])
    },

    suggestedMaxProduction() {
      return suggestedMaxCalc(this.statsAnneesAfter2010, ['granulatsExtrait'])
    },

    statsAnneesAfter2010() {
      const statsAnneesAfter2010 = this.statistiquesGranulatsMarins.annees.filter(
        annee => annee.annee >= 2010 && annee.annee < this.anneeCurrent
      )

      // affichage des données de l'année n-2 à partir du 1er avril de l'année en cours
      const toggleDate = new Date(this.anneeCurrent, 3, 1)
      const beforeToggleDate =
        Date.parse(new Date()) < Date.parse(toggleDate.toString())

      return beforeToggleDate
        ? statsAnneesAfter2010.filter(
            annee => annee.annee < this.anneeCurrent - 1
          )
        : statsAnneesAfter2010
    },

    pexAnneeCurrent() {
      const statistiquesGranulatsMarinsAnneeCurrent = this.statistiquesGranulatsMarins.annees.find(
        annee => annee.annee === this.anneeCurrent
      )
      return statistiquesGranulatsMarinsAnneeCurrent.titresPxw.quantite > 0
    }
  },

  async created() {
    this.anneeActive = this.anneeCurrent - 2
    await this.get()
  },

  methods: {
    async get() {
      await this.$store.dispatch('statistiques/get', 'granulatsMarins')

      if (!this.loaded) {
        this.loaded = true
      }
    },

    anneeSelect(event) {
      this.anneeActive = Number(event.target.value)
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
