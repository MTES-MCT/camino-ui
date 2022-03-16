<template>
  <div :class="{ active: menuActive }" class="flex">
    <button
      v-if="user"
      id="cmn-user-button-menu"
      class="btn-menu text-decoration-none bold p-0"
      aria-label="profil utilisateur"
      @click="$emit('onUserClicked')"
    >
      {{ user.prenom || '–' }} {{ user.nom || '–' }}
    </button>
    <button
      v-else
      id="cmn-user-button-connexion"
      class="btn btn-primary small lh-2"
      @click="$emit('onConnectionClicked')"
    >
      Connexion
    </button>
  </div>
</template>

<script setup lang="ts">
import { User } from '@/components/user/user'

defineProps<{
  user?: User
  menuActive: boolean
}>()

defineEmits<{
  (e: 'onConnectionClicked'): void
  (e: 'onUserClicked'): void
}>()
</script>
