<template>
  <div class="page relative">

    <transition name="slide">
      <div
        v-if="$slots.menu"
        class="menu bg-bg"
      >
        <slot name="menu" />
      </div>
    </transition>

    <header class="header">
      <div class="container">
        <slot name="header" />
      </div>
    </header>

    <div class="messages">
      <slot name="messages" />
    </div>

    <main class="main">
      <div class="container">
        <slot />
      </div>
    </main>

    <transition name="slide-top">
      <slot name="popup" />
    </transition>

    <transition name="fade">
      <div
        v-if="$slots.popup"
        class="absolute full bg-inverse-alpha" 
      />
    </transition>

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
