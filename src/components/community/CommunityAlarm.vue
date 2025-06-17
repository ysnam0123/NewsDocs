<script setup>
import { setAllRead } from '@/api/community/notification'
import { getCurrentUser } from '@/api/getCurrentUser'
import { onMounted, ref } from 'vue'
import CommunityAlarmBlock from './CommunityAlarmBlock.vue'
import { useToast } from 'vue-toastification'
import { useNotiStore } from '@/stores/useNotiStore'
const toast = useToast()
// const notification = ref([])
const currentUser = ref(null)
const { allNoti, markAllAsRead } = useNotiStore()

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
    toast.success('모든 알림을 읽었습니다.')
  } catch (err) {
    console.error('알림 읽음 업데이트 에러:', err)
  }
}
</script>
<template>
  <Teleport to="body">
    <!-- <div class="relative"> -->
    <div
      class="absolute top-[80px] right-[180px] w-[300px] h-[380px] rounded-[12px] shadow-[0_4px_10px_rgba(0,0,0,0.16)] bg-[#FFFFFF] dark:bg-[#343434]"
    >
      <div class="flex items-center w-full ml-[20px] h-[50px] text-[18px] dark:text-[#D7D7D7]">
        알림
      </div>
      <!-- 알림 내용 -->
      <div class="h-[280px] overflow-y-auto relative scrollbar">
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
    <!-- </div> -->
  </Teleport>
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
