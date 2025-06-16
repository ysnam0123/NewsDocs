<script setup>
import { onMounted, ref } from 'vue'
import DefaultLayout from './layout/DefaultLayout.vue'
import supabase from './utils/supabase'
const user = ref(null)
onMounted(async () => {
  const {
    data: { user: supaUser },
  } = await supabase.auth.getUser()
  user.value = supaUser
  console.log('App.vue 마운트 | 현재 로그인한 사용자:', user.value)
})
</script>
<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>
