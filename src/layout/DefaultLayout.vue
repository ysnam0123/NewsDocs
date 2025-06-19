<script setup>
import HeaderView from '@/components/common/HeaderView.vue'
// import FooterView from '@/components/common/FooterView.vue'
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import HeaderMobileBasic from '@/components/common/HeaderMobileBasic.vue'
import MobileFooter from '@/components/common/MobileFooter.vue'

const route = useRoute()
const isMobile = ref(window.innerWidth < 640)
window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth < 640
})

// const showHeaderView = computed(() => !route.meta.hideHeader  && !isMobile.value)
const showHeaderView = computed(() => !route.meta.hideHeader)
const showHeaderBasic = computed(() => !route.meta.hideHeaderBasic && !isMobile.value)
const showMobileHeader = computed(
  () => isMobile.value && !route.meta.hideHeader && !route.meta.hideMobileHeader,
)
const showMobileFooter = computed(() => isMobile.value)
</script>
<template>
  <HeaderView v-if="showHeaderView" />
  <HeaderBasic v-else-if="showHeaderBasic" />
  <!-- 모바일 헤더 -->
  <HeaderMobileBasic v-if="showMobileHeader" />
  <div class="min-h-[100vh] sm:pb-0 pb-[50px]">
    <slot></slot>
  </div>
  <MobileFooter v-if="showMobileFooter" class="fixed bottom-0 w-full z-50" />
</template>
