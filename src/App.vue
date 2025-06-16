<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import DefaultLayout from './layout/DefaultLayout.vue'
import { userAuthStore } from '@/stores/authStore'
import { getCurrentUser } from './api/getCurrentUser'
import { fetchNoti } from './api/community/notification'
import { realTimeAlarm } from './api/community/realTimeAlarm'
import supabase from './utils/supabase'
import { useNotiStore } from './stores/useNotiStore'
//현재 로그인한 사용자 정보를 콘솔로 출력하고 싶으시면 아래 주석 풀어주시면 됩니다.
//import supabase from './utils/supabase'
const auth = userAuthStore()
const notiChannel = ref(null) //알림
const notiStore = useNotiStore()

onMounted(async () => {
  await auth.fetchUser()
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()
  // if (!user) {
  //   console.log('로그인된 사용자가 없습니다.')
  //   return
  // }
  // // profiles 테이블에서 프로필 정보 가져오기
  // const profile = await fetchProfile(user.id)
  // console.log('현재 로그인한 사용자의 프로필 정보:', profile)

  const user = await getCurrentUser()

  if (user?.id) {
    // console.log('app user.id:', user?.id)
    const notiData = await fetchNoti(user.id)
    notiStore.setNotis(notiData)
    //실시간 알림 감시
    const { latestNoti, notiChannel: channel } = await realTimeAlarm(user.id)
    notiChannel.value = channel //나중에 channel해제하기 위해서

    //새로운 알림 추가되면 notiStore에 저장
    watch(latestNoti, (newNoti) => {
      if (newNoti && newNoti.actor_id !== user.id) {
        notiStore.addNoti(newNoti)
        console.log('새로운 알림 도착')
      }
    })
  }
})

onBeforeUnmount(() => {
  if (notiChannel.value) {
    supabase.removeChannel(notiChannel.value)
    console.log('알림 해제')
  }
})
</script>
<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>
