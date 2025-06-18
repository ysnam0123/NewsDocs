<script setup>
import HeaderView from '@/components/common/HeaderView.vue'
import FooterView from '@/components/common/FooterView.vue'
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import HeaderMobileBasic from '@/components/common/HeaderMobileBasic.vue'

const route = useRoute()
const isMobile = ref(window.innerWidth < 640)
window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth < 640
})

const showHeaderView = computed(() => !route.meta.hideHeader && !isMobile.value)
const showHeaderBasic = computed(() => !route.meta.hideHeaderBasic && !isMobile.value)
const showMobileHeader = computed(() => isMobile.value && !route.meta.hideHeader)
</script>
<template>
  <HeaderView v-if="showHeaderView" />
  <HeaderBasic v-else-if="showHeaderBasic" />
  <!-- 모바일 헤더 -->
  <HeaderMobileBasic v-if="showMobileHeader" />
  <div class="min-h-[100vh]">
    <slot></slot>
  </div>
  <FooterView v-if="!route.meta.hideFooter" />
</template>
