<script setup>
import HeaderView from '@/components/common/HeaderView.vue'
import FooterView from '@/components/common/FooterView.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<template>
  <HeaderView v-if="!route.meta.hideHeader" />
  <div class="min-h-[100vh]">
    <slot></slot>
  </div>
  <FooterView v-if="!route.meta.hideFooter" />
</template>
