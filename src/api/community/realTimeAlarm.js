import { useNotiStore } from '@/stores/useNotiStore'
import supabase from '@/utils/supabase'

export const realTimeAlarm = async (userId, onInsert) => {
  const notiStore = useNotiStore()

  const notiChannel = supabase.channel('notiChanges')
  //알림 업로드,읽음처리에 대한 리얼타임
  notiChannel
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        const newNoti = payload.new
        // console.log('새 알림 도착:', newNoti)
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
        // console.log('알림 읽음 처리 감지:', updatedNoti)
        notiStore.updateNoti(updatedNoti)
      },
    )

  const { error } = await notiChannel.subscribe()
  if (error) {
    console.error('알림 채널 구독 실패:', error)
  } else {
    // console.log('알림 채널 구독 완료')
  }

  return { notiChannel }
}
