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
          v-for="titre in titresPages[pageActive]"
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
        <pagination
          :page-active="pageActive"
          :pages-length="titresPages.length"
          @page-change="pageChange" />
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
import PillList from '@/components/ui/pill-list.vue'
import Pill from '@/components/ui/pill.vue'
import Accordion from '@/components/ui/accordion.vue'
import Dot from '@/components/ui/dot.vue'
import Pagination from '@/components/ui/pagination.vue'

export default {
  name: 'Titres',

  components: {
    PillList,
    Pill,
    Accordion,
    Dot,
    Pagination
  },

  props: {
    titres: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      pageActive: 1,
      elementsParPage: 10,
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
  },

  computed: {
    titresPages () {
      return this.titres.reduce((res, cur, i) => {
        const page = Math.ceil((i + 1) / this.elementsParPage)

        res[page] = res[page] || []
        res[page].push(cur)
        return res
      }, [])
    }
  },

  methods: {
    pageChange (p) {

      this.pageActive = p
    }
  }


}
</script>
