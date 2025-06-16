<script setup>
import { setAllRead } from '@/api/community/notification'
import { getCurrentUser } from '@/api/getCurrentUser'
import { onMounted, ref } from 'vue'
import CommunityAlarmBlock from './CommunityAlarmBlock.vue'
import { useToast } from 'vue-toastification'
import { useNotiStore } from '@/stores/useNotiStore'
import { AlarmClock } from 'lucide-vue-next'
const toast = useToast()
// const notification = ref([])
const currentUser = ref(null)
const { allNoti, markAllAsRead } = useNotiStore()
// const handleAllRead = async () => {
//   const success = await setAllRead(currentUser.value.id)
//   if (success) {
//     notification.value.forEach((n) => (n.is_read = true))
//     checkAllRead()
//   }
// }
// const checkAllRead = () => {
//   console.log('모든 알림 확인중')
//   const allRead = notification.value.every((n) => n.is_read)
//   if (allRead) {
//     console.log('모든알림 읽음!emit실행하쇼')
//     emit('all-read')
//   }
// }
// const handleSingleRead = (notiId) => {
//   const target = notification.value.find((n) => n.noti_id === notiId)
//   if (target && !target.is_read) {
//     console.log('handleSingleRead읽음처리', target)
//     target.is_read = true
//     checkAllRead()
//   }
//}

onMounted(async () => {
  try {
    const userData = await getCurrentUser()
    currentUser.value = userData
  } catch (err) {
    console.error('알림:현재 사용자 찾기 실패', err)
  }
})

const markAllRead = async () => {
  try {
    if (!currentUser.value?.id) return
    await setAllRead(currentUser.value.id) // Supabase에 업데이트
    markAllAsRead() //notiStore에서 allNoti처리
    toast.success('모든 알림을 읽음 처리했습니다.')
  } catch (err) {
    toast.error('모두 읽음 처리 실패')
    console.error('DB 업데이트 에러:', err)
  }
}
// onMounted(async () => {
//   try {
//     const userData = await getCurrentUser()
//     currentUser.value = userData
//     if (!userData || !userData.id) {
//       toast.warn('로그인이 필요합니다.')
//       console.warn('로그인 정보 없음,알림중단')
//       return
//     }
//     if (userData) {
//       notification.value = await fetchNoti(userData.id)
//     }
//   } catch (err) {
//     toast.error('알림 불러오기에 실패했습니다.')
//     console.error('알림 로딩 에러:', err)
//   }
// })
</script>
<template>
  <div class="relative">
    <div
      class="absolute top-[50px] right-[-5px] w-[300px] h-[380px] z-[100] rounded-[12px] shadow-[0_4px_10px_rgba(0,0,0,0.16)] bg-[#FFFFFF] dark:bg-[#343434]"
    >
      <div class="flex items-center w-full ml-[20px] h-[50px] text-[18px] dark:text-[#D7D7D7]">
        <AlarmClock class="w-5 h-5 mr-5" />
        알림
      </div>
      <!-- 알림 내용 -->
      <div class="h-[280px] overflow-y-auto relative z-[100] scrollbar">
        <div v-for="noti in allNoti" :key="noti.noti_id" class="max-h-[300px]">
          <CommunityAlarmBlock :noti="noti" />
        </div>
      </div>
      <div
        class="w-full flex items-center justify-end h-[50px] border-t border-t-gray-200 dark:border-[#4D4D4D]"
      >
        <div class="flex items-center">
          <button
            @click="markAllRead"
            class="flex justify-center items-center w-[60px] h-[25px] cursor-pointer text-[12px] dark:text-[#D7D7D7] hover:text-[#601ED5] dark:hover:text-[#6524D9]"
          >
            모두 읽음
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.scrollbar::-webkit-scrollbar {
  width: 10px;
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: #d4d4d4;
  border-radius: 5px;
}

.scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.dark .scrollbar::-webkit-scrollbar-thumb {
  background-color: #4d4d4d;
}
</style>
