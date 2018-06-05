<template>
  <div>
    <div class="overflow-scroll-x mb">
      <table>
        <tr>
          <th />
          <th>Nom</th>
          <th>Titulaires</th>
          <th>Type</th>
          <th>Statut</th>
          <th>Substances</th>
        </tr>
        <router-link
          v-for="titre in titres"
          :key="titre.id"
          :to="{ name: 'titre', params: { id: titre.id }}"
          tag="tr"
          class="tr-link">
          <td>
            <pill
              :color="`bg-title-domain-${titre.domaine.id}`"
              class="mono">{{ titre.domaine.id }}</pill>
          </td>
          <td class="bold">{{ titre.nom }}</td>
          <td v-if="titre.titulaires">
            <div
              v-for="titulaire in titre.titulaires"
              :key="titulaire.id">
              {{ titulaire.nom }}
            </div>
          </td>
          <td>{{ titre.type.nom }}</td>
          <td><dot :coulor="titre.statut.couleur" />{{ titre.statut.nom }}</td>
          <td>
            <pill-list
              v-if="titre.substancesPrincipales"
              :elements="titre.substancesPrincipales.map(s=>s.nom)"
              class="mb--xs" />
          </td>
        </router-link>
      </table>
    </div>
    <div class="desktop-blobs">
      <div class="desktop-blob-3-4">
        <ul class="list-inline">
          <li
            v-for="page in pages"
            :key="page"
            :class="{ active: pageActive === page }"
            class="mb-0">
            <a
              href="#"
              class="btn-border px-m py-s">
              {{ page }}
            </a>
          </li>
        </ul>
      </div>
      <div class="desktop-blob-1-4">
        <accordion class="mb">
          <template slot="title">Affichage</template>
          <ul class="list-sans">
            <li
              v-for="colonne in colonnes"
              :key="colonne.type">
              <label>
                <input
                  type="checkbox"
                  class="mr-s">
                {{ colonne.name }}
              </label>
            </li>
          </ul>
        </accordion>
      </div>
    </div>
  </div>
</template>

<script>
import PillList from '@/components/ui/PillList.vue'
import Pill from '@/components/ui/Pill.vue'
import Accordion from '@/components/ui/Accordion.vue'
import Dot from '@/components/ui/Dot.vue'

export default {
  name: 'Titres',

  components: {
    PillList,
    Pill,
    Accordion,
    Dot
  },

  props: {
    titres: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      pages: [1, 2, 3, 4, 5],
      pageActive: 1,
      colonnes: [
        {
          type: 'domain',
          name: 'Domaine'
        },
        {
          type: 'name',
          name: 'Nom'
        },
        {
          type: 'owner',
          name: 'Titulaires'
        },
        {
          type: 'type',
          name: 'Type'
        },
        {
          type: 'status',
          name: 'Statut'
        },
        {
          type: 'substances',
          name: 'Substances'
        }
      ]
    }
  }
}
</script>
