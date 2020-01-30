<template>
  <Card v-if="!loaded">
    <Loader />
  </Card>
  <Card v-else>
    <h6>Activité</h6>
    <h1 class="cap-first">
      {{ activite.type.nom }}
    </h1>
    <h3>{{ activite.titre.nom }}</h3>
    <Accordion
      class="mb"
      sub="true"
    >
      <template slot="section">
        {{ activite.date | dateFormat }}
      </template>

      <template slot="title">
        <Dot :color="`bg-${activite.statut.couleur}`" /> <span
          class="cap-first"
        ><span v-if="activite.periode && activite.periode.nom">{{ activite.periode.nom }} </span> {{ activite.annee }}
        </span>
      </template>

      <template slot="buttons">
        <ActiviteButton
          v-if="activite.editable"
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
              :section="s"
              :contenu="activite.contenu[s.id]"
            />
          </div>
        </div>
      </template>
    </Accordion>
  </Card>
</template>

<script>
import Card from './_ui/card.vue'
import Dot from './_ui/dot.vue'
import Loader from './_ui/loader.vue'
import Accordion from './_ui/accordion.vue'
import ActiviteButton from './activite/button.vue'
import Section from './_common/section.vue'

export default {
  components: {
    Loader,
    Card,
    Dot,
    Accordion,
    ActiviteButton,
    Section
  },

  computed: {
    activite() {
      return this.$store.state.activite.current
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
    this.$store.commit('activite/reset')
  },

  methods: {
    async get() {
      await this.$store.dispatch('activite/get', this.$route.params.id)
    }
  }
}
</script>
