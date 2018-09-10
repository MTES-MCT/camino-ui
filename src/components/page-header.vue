<template>
  <div class="tablet-blobs">
    <div class="tablet-blob-1-2 large-blob-1-3">
      <router-link
        :to="{ name: 'titres' }"
        class="pt pr-m mb-xs inline-block full-x"
      >
        <img src="../../public/img/logo-camino.svg">
      </router-link>
      <p class="h5 color-neutral">Le cadastre minier numérique ouvert</p>
    </div>
    <div class="tablet-blob-1-2  large-blob-2-3 menu hide">
      <ul>
        <li :class="{ active: $route.name === 'titres' || $route.name === 'titre' }">
          <router-link
            :to="{ name: 'titres' }"
            class="btn-menu px pb-m pt"
          >Titres</router-link>
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
