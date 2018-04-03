<template>
  <div class="page">
    <div class="topbar bg-bg">
      <div class="container">
        <slot name="header" />
      </div>
    </div>
    <main class="content container pt">
      <slot />
    </main>
    <div class="footer">
      <div class="container">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiPage'
}
</script>
