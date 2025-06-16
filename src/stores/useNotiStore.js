import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useNotiStore = defineStore('notis', () => {
  const latestNoti = ref(null) //
  const allNoti = ref([]) //알림목록

  const setNotis = (notiData) => {
    allNoti.value = [...notiData]
  }
  const addNoti = (newNoti) => {
    //새알림을 알림목록에 추가
    latestNoti.value = newNoti
    allNoti.value.unshift(newNoti)
  }
  const markAllAsRead = () => {
    //모든 알림 읽음 처리
    allNoti.value = allNoti.value.map((noti) => ({ ...noti, is_read: true }))
  }
  const updateNoti = (updatedNoti) => {
    const index = allNoti.value.findIndex((noti) => noti.noti_id === updatedNoti.noti_id)
    if (index !== -1) {
      allNoti.value = [
        ...allNoti.value.slice(0, index),
        updatedNoti,
        ...allNoti.value.slice(index + 1),
      ]
    }
  }

  const hasUnread = computed(() => {
    return allNoti.value.some((noti) => !noti.is_read)
  })
  return {
    latestNoti,
    allNoti,
    setNotis,
    addNoti,
    markAllAsRead,
    updateNoti,
    hasUnread,
  }
})
