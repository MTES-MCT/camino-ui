<template>
  <div class="flex">
    <div class="logo pb-m pt pr-m">Camino</div>
    <div class="menu">
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
