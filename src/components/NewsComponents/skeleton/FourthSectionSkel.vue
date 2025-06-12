<script setup></script>
<template>
  <div class="flex flex-col gap-2 rounded-2xl">
    <div v-for="n in 2" :key="n" class="flex gap-[20px] rounded-2xl animate-pulse">
      <div class="w-[200px] h-[184px] bg-gray-300 rounded-xl"></div>
      <div class="flex flex-col gap-[10px]">
        <div class="w-[400px] h-[50px] bg-gray-200 rounded-md"></div>
        <div class="w-[350px] h-[40px] bg-gray-200 rounded-md"></div>
      </div>
    </div>
  </div>
</template>
