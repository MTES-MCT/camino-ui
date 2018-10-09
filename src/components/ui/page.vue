<template>
  <div class="page relative">
    <div class="menu-top bg-bg hide">
      <div class="container">
        menu top
      </div>
    </div>

    <header class="topbar">
      <div class="container">
        <slot name="header" />
      </div>
    </header>
    <main class="main">
      <div class="container">
        <slot />
      </div>
    </main>
    <footer class="footer">
      <div class="container">
        <slot name="footer" />
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'UiPage'
}
</script>
