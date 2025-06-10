<script setup>
import HeaderView from '@/components/common/HeaderView.vue'
import FooterView from '@/components/common/FooterView.vue'
import { useRoute } from 'vue-router'
import HeaderBasic from '@/components/common/HeaderBasic.vue'

const route = useRoute()
</script>
<template>
  <HeaderBasic v-if="!route.meta.hideHeaderBasic" />
  <HeaderView v-if="!route.meta.hideHeader" />
  <div class="min-h-[100vh]">
    <slot></slot>
  </div>
  <FooterView v-if="!route.meta.hideFooter" />
</template>
