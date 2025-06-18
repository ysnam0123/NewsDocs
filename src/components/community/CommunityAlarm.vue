<script setup>
import { setAllRead } from '@/api/community/notification'
import { getCurrentUser } from '@/api/getCurrentUser'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import CommunityAlarmBlock from './CommunityAlarmBlock.vue'
import { useToast } from 'vue-toastification'
import { useNotiStore } from '@/stores/useNotiStore'
import sleepDog from '@/assets/img/sleepDog.svg'
import CommunityALarmSkel from './skeleton/CommunityALarmSkel.vue'

const props = defineProps({ close: Function })
const isLoading = ref(true)
const toast = useToast()
const currentUser = ref(null)
const { allNoti, markAllAsRead } = useNotiStore()
const alarmRef = ref(null)

const handleClickOutside = (e) => {
  if (alarmRef.value && !alarmRef.value.contains(e.target)) {
    props.close()
  }
}
onMounted(async () => {
  document.addEventListener('mousedown', handleClickOutside)
  try {
    const userData = await getCurrentUser()
    currentUser.value = userData
  } catch (err) {
    console.error('알림:현재 사용자 찾기 실패', err)
  }
  isLoading.value = false
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
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
    <div
      ref="alarmRef"
      class="absolute top-[80px] right-[180px] z-50 w-[300px] h-[380px] rounded-[12px] shadow-[0_4px_10px_rgba(0,0,0,0.16)] bg-[#FFFFFF] dark:bg-[#343434]"
    >
      <div class="flex items-center w-full ml-[20px] h-[50px] text-[18px] dark:text-[#D7D7D7]">
        알림
      </div>

      <!-- 알림 내용 -->
      <div class="h-[280px] overflow-y-auto relative scrollbar">
        <div v-if="isLoading">
          <div v-for="i in [0, 1, 2, 3]" :key="i">
            <CommunityALarmSkel />
          </div>
        </div>

        <div v-else-if="allNoti.length === 0" class="flex items-center justify-center h-full">
          <div class="flex flex-col items-center justify-center">
            <img :src="sleepDog" alt="알림없음" class="w-[60px] h-[42px]" />
            <p>알림이 없습니다.</p>
          </div>
        </div>
        <div v-else>
          <div v-for="noti in allNoti" :key="noti.noti_id" class="max-h-[300px]">
            <CommunityAlarmBlock :noti="noti" @closeModal="props.close" />
          </div>
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
