<script setup>
import HeaderView from '@/components/common/HeaderView.vue'
import FooterVue from '@/components/common/FooterVue.vue'
</script>
<template>
  <HeaderView />
  <div class="slotWrapper">
    <slot></slot>
  </div>
  <FooterVue />
</template>
<style scoped>
.slotWrapper {
  min-height: 100vh;
}
</style>
