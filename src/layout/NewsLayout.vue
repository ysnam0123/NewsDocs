<script setup>
import MenuSidebar from '@/components/common/MenuSidebar.vue'
</script>
<template>
  <div class="flex h-screen">
    <MenuSidebar class="h-full w-[20%]" />
    <div class="w-[75%]">
      <router-view />
    </div>
  </div>
</template>
