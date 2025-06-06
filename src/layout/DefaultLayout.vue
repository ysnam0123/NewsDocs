<script setup>
import HeaderView from '@/components/common/HeaderView.vue'
import FooterView from '@/components/common/FooterVue.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<template>
  <HeaderView v-if="!route.meta.hideHeader" />
  <div class="slotWrapper">
    <slot></slot>
  </div>
  <FooterView />
</template>
<style scoped>
.slotWrapper {
  min-height: 100vh;
}
</style>
