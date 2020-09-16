<template>
  <div class="page relative">
    <div v-if="$slots.banner" class="banner">
      <div class="container py-m">
        <slot name="banner" />
      </div>
    </div>

    <Transition name="slide" mode="out-in">
      <slot name="menu" />
    </Transition>

    <header class="header">
      <div class="container">
        <slot name="header" />
      </div>
    </header>

    <main class="main">
      <div class="container">
        <slot />
      </div>
    </main>

    <div class="messages">
      <slot name="messages" />
    </div>

    <Transition name="fade">
      <div v-if="$slots.popup" class="absolute full bg-inverse-alpha z-2" />
    </Transition>

    <Transition name="slide-top">
      <slot name="popup" />
    </Transition>

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
