<script setup>
import { onMounted, ref } from 'vue'
import DefaultLayout from './layout/DefaultLayout.vue'
import supabase from './utils/supabase'
import { realTimeAlarm } from './api/community/realTimeAlarm'
import { useNotiStore } from './stores/useNotiStore'
import { fetchNoti } from './api/community/notification'
//import { userAuthStore } from './stores/authStore'
//const auth = userAuthStore()

const notiStore = useNotiStore()
const user = ref(null)

const setupNoti = async (userId) => {
  console.log('setupNoti')
  if (!userId) {
    console.warn('userId없음')
    return
  }
  try {
    //이전 채널 해제
    await notiStore.removeChannel()

    //알림 데이터 불러오기
    const notiData = await fetchNoti(userId)
    notiStore.setNotis(notiData)

    //실시간 알림 구독 시작
    const { notiChannel } = realTimeAlarm(userId, (newNoti) => {
      console.log('새로운 알림 도착', newNoti)
      notiStore.addNoti(newNoti)
    })
    notiStore.setChannel(notiChannel)
    console.log('채널명:', notiChannel)
    //새로운 알림이 오면 notiStore에 저장
    // watch(
    //   latestNoti,
    //   (newNoti) => {
    //     const currentUserId = user.value?.id
    //     console.log(newNoti.user_id)
    //     if (newNoti && newNoti.user_id === currentUserId) {
    //       console.log('add호출전', notiStore.allNoti.length)
    //       notiStore.addNoti(newNoti)
    //       console.log('add호출후', notiStore.allNoti.length)
    //       console.log('새로운 알림 도착', newNoti)
    //     }
    //   },
    //   { flush: 'post' }, // 혹시 몰라 명시
    // )
  } catch (err) {
    console.error('setupNoti오류', err)
  }
}

const getLoginUser = async () => {
  const {
    data: { user: supaUser },
  } = await supabase.auth.getUser()
  user.value = supaUser
  console.log('App.vue 마운트 | 현재 로그인한 사용자:', user.value)

  if (user.value?.id) await setupNoti(user.value.id)
}

onMounted(async () => {
  await getLoginUser()

  //마운트된 상태에서 새롭게 로그인했을 때에도 알림 데이터 새롭게 불러오기
  supabase.auth.onAuthStateChange(async (event, session) => {
    const supaUser = session?.user || null
    user.value = supaUser
    // console.log(`auth 상태 변경:${event}`, supaUser)

    if (supaUser?.id) {
      await setupNoti(supaUser.id)
    } else {
      await notiStore.removeChannel()
      notiStore.clearNoti()
    }
  })
})
</script>
<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>
