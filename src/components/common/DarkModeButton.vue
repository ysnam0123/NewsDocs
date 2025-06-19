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
    class="sm:w-[40px] sm:h-[40px] w-[32px] h-[32px] rounded-full bg-[#f6f6f6] dark:bg-[#363636] hover:bg-[#EDEDED] dark:hover:bg-[#4A4A4A] flex items-center justify-center transition-colors duration-300 cursor-pointer"
    @click="toggleDark()"
  >
    <Sun v-if="!isDark" color="#363636" sm:size="24" :size="18" />
    <Moon v-else color="#f6f6f6" sm:size="24" :size="18" />
  </button>
</template>
