<template>
  <div>
    <div class="desktop-blobs">
      <div class="desktop-blob-1-2">
        <h1 class="mt-xs">
          {{ titre["nom"] }}
        </h1>
        <h4 class="mb">
          <Pill
            :color="`bg-title-domaine-${titre.domaine.id}`"
            class="mono mr-s mt--s"
          >
            {{ titre.domaine.id }}
          </Pill>
          <span class="cap-first">
            {{ titre.type.nom }}
          </span>
        </h4>
        <div v-if="titre.references">
          <h6>
            {{ titre.references.length > 1 ? "Références" : "Référence" }}
          </h6>
          <ul class="list-prefix">
            <li
              v-for="reference in titre.references"
              :key="reference.valeur"
            >
              <span
                v-if="reference.type"
                class="h5 word-break color-neutral fixed-width"
              >
                {{ reference.type }}
              </span>
              {{ reference.valeur }}
            </li>
          </ul>
        </div>
      </div>
      <div class="desktop-blob-1-2">
        <h6>Statut</h6>
        <h4>
          <Dot :color="`bg-${titre.statut.couleur}`" />
          <span class="cap-first">
            {{ titre.statut.nom }}
          </span>
        </h4>

        <div>
          <table class="table-xxs">
            <tr>
              <th />
              <th>Phase</th>
              <th>Début</th>
              <th>Fin</th>
            </tr>
            <tr
              v-for="demarche in titre.demarches.filter(d => d.phase)"
              :key="demarche.id"
            >
              <td><Dot :color="`bg-${demarche.phase.statut.couleur}`" /></td>
              <td>
                <span class="cap-first">
                  {{ demarche.type.nom }}
                </span>
              </td>
              <td>{{ demarche.phase.dateDebut | dateFormat }}</td>
              <td>{{ demarche.phase.dateFin | dateFormat }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="desktop-blobs">
      <div class="desktop-blob-1-2">
        <div v-if="titre.substances && titre.substances.length > 0">
          <h6>Substances</h6>
          <PillList :elements="titre.substances.map(s => s.nom)" />
        </div>
      </div>
      <div class="desktop-blob-1-2">
        <div v-if="titre.titulaires.length">
          <h6>
            {{ titre.titulaires.length > 1 ? "Titulaires" : "Titulaire" }}
          </h6>
          <ul class="list-prefix">
            <li
              v-for="titulaire in titre.titulaires"
              :key="titulaire.id"
            >
              {{ entrepriseNameFind(titulaire) }}
            </li>
          </ul>
        </div>

        <div v-if="titre.amodiataires.length">
          <h6>
            {{ titre.amodiataires.length > 1 ? "Amodiataires" : "Amodiataire" }}
          </h6>
          <ul class="list-prefix">
            <li
              v-for="amodiataire in titre.amodiataires"
              :key="amodiataire.id"
            >
              {{ entrepriseNameFind(amodiataire) }}
            </li>
          </ul>
        </div>


        <div v-if="titre.engagement">
          <h6>Engagement financier</h6>
          <p>{{ numberFormat(titre.engagement) }} {{ titre.engagementDevise.id }}</p>
        </div>

        <div v-if="titre['liens']">
          <h6>Liens</h6>
          <ul class="list-sans">
            <li
              v-for="link in titre['liens']"
              :key="link.id"
              class="mb-xs"
            >
              <RouterLink
                :to="{ name: 'titre', params: { id: link.id } }"
                class="btn h6 bold py-xs px-s rnd"
              >
                {{ link["type"] }} : {{ link["nom"] }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pill from '../ui/pill.vue'
import PillList from '../ui/pill-list.vue'
import Dot from '../ui/dot.vue'

export default {
  components: { Pill, Dot, PillList },

  props: {
    titre: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    entrepriseNameFind(entreprise) {
      return (
        entreprise.nom ||
        // trouve l'établissement le plus récent
        entreprise.etablissements.reduce(
          (res, e) =>
            res && this.dateFormat(res.dateDebut) > this.dateFormat(e.dateDebut)
              ? res
              : e,
          null
        ).nom
      )
    }
  }
}
</script>

