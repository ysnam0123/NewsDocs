import { useNotiStore } from '@/stores/useNotiStore'
import supabase from '@/utils/supabase'

export const realTimeAlarm = (userId, onInsert) => {
  // const latestNoti = ref(null)
  const notiStore = useNotiStore()

  const notiChannel = supabase
    .channel('notiChanges')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      },

      (payload) => {
        const newNoti = payload.new //최근 업로드된 알림 하나 받아오기
        // notiStore.addNoti(latestNoti.value)
        console.log('새 알림 도착:', newNoti)
        if (onInsert) onInsert(newNoti)
      },
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        const updatedNoti = payload.new
        console.log('알림읽음처리감지:', updatedNoti)
        notiStore.updateNoti(updatedNoti)
      },
    )
    .subscribe()
  return { notiChannel }
}
