<template>
  <div class="flex">
    <div class="flex flex-direction-column">
      <router-link
        :to="{ name: 'titres' }"
        class="logo pb-xs pt pr-m">
        <div class="logo mb-xs">Camino</div>
      </router-link>
      <p class="pr-m h5 color-highlight">Cadastre minier numérique ouvert</p>
    </div>
    <div class="menu hide">
      <ul>
        <li :class="{ active: $route.name === 'titres' || $route.name === 'titre' }">
          <router-link
            :to="{ name: 'titres' }"
            class="btn-menu px pb-m pt">Titres</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menubar'
}
</script>
