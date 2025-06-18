<script setup>
import { onMounted, ref } from 'vue'
import DefaultLayout from './layout/DefaultLayout.vue'
import supabase from './utils/supabase'
// import { realTimeAlarm } from './api/community/realTimeAlarm'
// import { useNotiStore } from './stores/useNotiStore'
// import { fetchNoti } from './api/community/notification'
import { setupNoti } from './composables/useSetupNoti'
//import { userAuthStore } from './stores/authStore'
//const auth = userAuthStore()

// const notiStore = useNotiStore()
const user = ref(null)

// const setupNoti = async (userId) => {
//   if (!userId) {
//     console.warn('userId없음')
//     return
//   }
//   try {
//     //이전 채널 해제
//     await notiStore.removeChannel()
//     //알림 데이터 불러오기
//     const notiData = await fetchNoti(userId)
//     notiStore.setNotis(notiData) //notiStore에 supabase로부터 가져온 알림 데이터 저장해두고 꺼내 사용

//     //실시간 알림 구독 시작
//     const { notiChannel } = await realTimeAlarm(userId, (newNoti) => {
//       notiStore.addNoti(newNoti)
//     })
//     notiStore.setChannel(notiChannel)
//   } catch (err) {
//     console.error('setupNoti오류', err)
//   }
// }

const getLoginUser = async () => {
  const {
    data: { user: supaUser },
  } = await supabase.auth.getUser()
  user.value = supaUser
  console.log('App.vue 마운트 | 현재 로그인한 사용자:', user.value)
  if (user.value?.id) await setupNoti(user.value.id)
}

onMounted(async () => {
  //현재 로그인중인 사용자 정보
  await getLoginUser()

  //마운트된 상태에서 새롭게 로그인했을 때에도 알림 데이터 새롭게 불러오기
  // supabase.auth.onAuthStateChange(async (event, session) => {
  //   const supaUser = session?.user || null
  //   user.value = supaUser
  //   // console.log(`auth 상태 변경:${event}`, supaUser)

  //   if (supaUser?.id) {
  //     //사용자가있으면 알림불러오기
  //     await setupNoti(supaUser.id)
  //   } else {
  //     await notiStore.removeChannel()
  //     notiStore.clearNoti()
  //   }
  // })
})
</script>
<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>
