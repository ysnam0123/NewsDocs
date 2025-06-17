import { useNotiStore } from '@/stores/useNotiStore'
import { fetchNoti } from '@/api/community/notification'
import { realTimeAlarm } from '@/api/community/realTimeAlarm'

export const setupNoti = async (userId) => {
  const notiStore = useNotiStore()

  if (!userId) {
    console.warn('userId 없음')
    return
  }

  try {
    await notiStore.removeChannel()

    const notiData = await fetchNoti(userId)
    notiStore.setNotis(notiData)

    const { notiChannel } = realTimeAlarm(userId, (newNoti) => {
      notiStore.addNoti(newNoti)
    })

    notiStore.setChannel(notiChannel)
  } catch (err) {
    console.error('setupNoti 오류', err)
  }
}
