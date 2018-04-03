<template>
  <div class="topbar bg-bg">
    <div class="container">
      <div class="flex">
        <div class="h2 p-m">Camino</div>
        <div class="menu">
          <ul>
            <li :class="{ active: $route.name === 'titres' }">
              <router-link
                :to="{ name: 'titres' }"
                class="btn-alt px py-m">Titres</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menubar'
}
</script>
