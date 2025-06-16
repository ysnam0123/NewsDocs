<script setup>
import { onMounted, ref, watch } from 'vue'
import DefaultLayout from './layout/DefaultLayout.vue'
import supabase from './utils/supabase'
import { realTimeAlarm } from './api/community/realTimeAlarm'
import { useNotiStore } from './stores/useNotiStore'
import { fetchNoti } from './api/community/notification'
//import { userAuthStore } from './stores/authStore'
//const auth = userAuthStore()
const notiChannel = ref(null) //알림/
const notiStore = useNotiStore()
const user = ref(null)
onMounted(async () => {
  const {
    data: { user: supaUser },
  } = await supabase.auth.getUser()
  user.value = supaUser
  console.log('App.vue 마운트 | 현재 로그인한 사용자:', user.value)

  if (user.value?.id) {
    // 알림 데이터 불러오기
    const notiData = await fetchNoti(user.value.id)
    notiStore.setNotis(notiData)

    // 실시간 알림 구독
    const { latestNoti, notiChannel: channel } = await realTimeAlarm(user.value.id)
    notiChannel.value = channel // 해제용

    // 새로운 알림이 오면 notiStore에 저장
    watch(latestNoti, (newNoti) => {
      if (newNoti && newNoti.actor_id !== user.value.id) {
        notiStore.addNoti(newNoti)
        console.log('새로운 알림 도착')
      }
    })
  }
})
</script>
<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>
