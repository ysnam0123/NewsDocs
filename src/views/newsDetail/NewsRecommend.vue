<script setup>
import NewsComponent2 from '@/components/NewsComponents/NewsComponent2.vue'
</script>
<template>
  <section class="h-full w-[407px] mt-20 overflow-hidden">
    <h2 class="text-xl mb-6">관심 가질만한 다른 뉴스</h2>
    <div class="sm:gap-2 md:gap-10 ml-14 mb-10">
      <NewsComponent2 class="border-1 border-gray-200 rounded-2xl" />
      <NewsComponent2 class="border-1 border-gray-200 rounded-2xl ml-10" />
    </div>
  </section>
</template>
<style scoped></style>
