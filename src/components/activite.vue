<template>
  <Loader v-if="!loaded" />
  <div v-else>
    <h6>Activité</h6>
    <h1 class="cap-first">
      {{ activite.titre.nom }}
    </h1>
    <Accordion
      class="mb"
      sub="true"
    >
      <template slot="section">
        {{ activite.date | dateFormat }}
      </template>

      <template slot="title">
        <h6>
          <span class="cap-first">{{ activite.type.nom }}</span>
        </h6>
        <h3>
          <span class="cap-first"><span v-if="activite.periode && activite.periode.nom">{{ activite.periode.nom }} </span> {{ activite.annee }}</span>
        </h3>
        <div class="mb-xs">
          <Statut
            :color="activite.statut.couleur"
            :nom="activite.statut.nom"
            :mini="true"
          />
        </div>
      </template>

      <template slot="buttons">
        <ActiviteButton
          v-if="activite.modification"
          :activite="activite"
          context="activite"
          class="btn-alt py-s px-m"
        />
      </template>

      <template slot="sub">
        <div>
          <div
            v-if="activite.dateSaisie"
            class="border-b-s px-m pt-m"
          >
            <h6>Date de {{ activite.statut.id === 'dep' ? 'dépôt' : 'modification' }}</h6>
            <p>{{ activite.dateSaisie | dateFormat }}</p>
          </div>
          <div v-if="activite.contenu && activite.sections">
            <Section
              v-for="s in activite.sections"
              :key="s.id"
              class="border-b-s px-m pt-m"
              :section="s"
              :contenu="activite.contenu[s.id]"
              :date="activite.date"
            />
          </div>
        </div>
      </template>
    </Accordion>
  </div>
</template>

<script>
import Loader from './_ui/loader.vue'
import Accordion from './_ui/accordion.vue'
import ActiviteButton from './activite/button.vue'
import Section from './_common/section.vue'
import Statut from './_common/statut.vue'

export default {
  components: {
    Loader,
    Statut,
    Accordion,
    ActiviteButton,
    Section
  },

  computed: {
    activite() {
      return this.$store.state.titreActivite.current
    },

    user() {
      return this.$store.state.user.current
    },

    loaded() {
      return !!this.activite
    }
  },

  watch: {
    $route: 'get',

    user: 'get'
  },

  created() {
    this.get()
  },

  beforeDestroy() {
    this.$store.commit('titreActivite/reset')
  },

  methods: {
    async get() {
      await this.$store.dispatch('titreActivite/get', this.$route.params.id)
    }
  }
}
</script>
