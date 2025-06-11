<script setup>
import { onMounted } from 'vue'
import DefaultLayout from './layout/DefaultLayout.vue'
import { userAuthStore } from '@/stores/authStore'

const auth = userAuthStore()

onMounted(async () => {
  await auth.fetchUser()
})
</script>
<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>
