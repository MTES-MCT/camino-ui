<template>
  <PureDashboard
    v-if="hasEntreprises"
    :get-entreprises-titres="getEntreprisesTitres"
    :display-activites="activites"
  />
  <div v-else>Loading</div>
</template>

<script setup lang="ts">
import PureDashboard from '@/components/dashboard/pure-dashboard.vue'

import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { titres } from '@/api/titres'

const store = useStore()
const router = useRouter()

const user = store.state.user.element
const activites = user?.sections?.activites ?? false

const entreprisesIds: string[] = []
const hasEntreprises: boolean = store.getters['user/hasEntreprises']
if (hasEntreprises) {
  // TODO 2022-03-17: type the store
  const entreprises = store.getters['user/user']?.entreprises ?? []
  entreprisesIds.push(
    ...entreprises.map((entreprise: { id: string }) => entreprise.id)
  )
} else {
  store.commit('titres/reset')
  store.dispatch('titres/init')
  router.push({name: 'titres'})
}

const getEntreprisesTitres = async () => {
  return (await titres({ entreprisesIds: entreprisesIds })).elements
}
</script>
