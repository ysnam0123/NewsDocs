<script setup>
import DefaultLayout from './layout/DefaultLayout.vue'

import Vue3Toastify from 'vue3-toastify'
</script>
<template>
  <DefaultLayout>
    <RouterView />
    <Vue3Toastify />
  </DefaultLayout>
</template>
<style scoped></style>
