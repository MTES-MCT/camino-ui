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
          v-for="title in titles"
          :key="title.id"
          :to="{ name: 'titre', params: { id: title.id }}"
          tag="tr"
          class="tr-link">
          <td>
            <pill
              :color="`bg-title-domain-${titletitle['domaine']['code'].toLowerCase()}`"
              class="mono">{{ title['domaine']['code'] }}</pill>
          </td>
          <td class="bold">{{ title.nom }}</td>
          <td>
            <div
              v-for="titulaire in title.titulaires"
              :key="titulaire.id">
              {{ titulaire.nom }}
            </div>
          </td>
          <td>{{ title.type }}</td>
          <td><status-dot :status="title.statut" />{{ title.statut }}</td>
          <td>
            <pill-list
              v-if="title.substances && title.substances.principales"
              :elements="title.substances.principales"
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
              v-for="column in columns"
              :key="column.type">
              <label>
                <input
                  type="checkbox"
                  class="mr-s">
                {{ column.name }}
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
import StatusDot from '@/components/camino/StatusDot.vue'

export default {
  name: 'Titres',

  components: {
    PillList,
    Pill,
    Accordion,
    StatusDot
  },

  props: {
    titles: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      pages: [1, 2, 3, 4, 5],
      pageActive: 1,
      columns: [
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
