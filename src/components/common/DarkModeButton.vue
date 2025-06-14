<script setup>
import { useThemeStore } from '@/stores/useDarkmode'
import { Sun, Moon } from 'lucide-vue-next'
import { computed } from 'vue'
const themeStore = useThemeStore()
const { toggleDark } = themeStore
const isDark = computed(() => themeStore.isDark)
</script>
<template>
  <button
    class="w-[40px] h-[40px] rounded-full bg-[#f6f6f6] dark:bg-[#363636] hover:bg-[#EDEDED] dark:hover:bg-[#4A4A4A] flex items-center justify-center transition-colors duration-300 cursor-pointer"
    @click="toggleDark()"
  >
    <Sun v-if="!isDark" color="#363636" :size="24" />
    <Moon v-else color="#f6f6f6" :size="24" />
  </button>
</template>
