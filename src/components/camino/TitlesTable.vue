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
            <tag
              :color="`bg-title-domain-${title.domaine.code.toLowerCase()}`"
              class="mono">{{ title.domaine.code }}</tag>
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
          <td><title-status :status="title.statut" />{{ title.statut }}</td>
          <td>
            <tag-list
              v-if="title.substances && title.substances.principales"
              :elements="title.substances.principales"
              class="mb--xs" />
          </td>
        </router-link>
      </table>
    </div>
    <div class="tablet-blobs">
      <div class="tablet-blob-3-4">
        <ul class="list-inline mb-0">
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
      <div class="tablet-blob-1-4">
        <accordion>
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
import TagList from '@/components/ui/TagList.vue'
import Tag from '@/components/ui/Tag.vue'
import Accordion from '@/components/ui/Accordion.vue'
import TitleStatus from '@/components/camino/TitleStatus.vue'

export default {
  name: 'Titres',

  components: {
    TagList,
    Tag,
    Accordion,
    TitleStatus
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
      columns: [{
        type: 'domain',
        name: 'Domaine'
      }, {
        type: 'name',
        name: 'Nom'
      }, {
        type: 'owner',
        name: 'Titulaires'
      }, {
        type: 'type',
        name: 'Type'
      }, {
        type: 'status',
        name: 'Statut'
      }, {
        type: 'substances',
        name: 'Substances'
      }]
    }
  }

}
</script>
