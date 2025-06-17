import supabase from '@/utils/supabase'

export const fetchNoti = async (userId) => {
  const { data: notiData, error: notiError } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (notiError) {
    console.error('알림 불러오기 실패', notiError)
    return []
  }
  return notiData
}

export const fetchSingleNoti = async (notiId) => {
  const { data: singleData, error: singleError } = await supabase
    .from('notifications')
    .select()
    .eq('noti_id', notiId)
    .single()
  if (singleError) {
    console.error('알림 한개 불러오기 실패', singleError)
    return {}
  }
  return singleData
}

export const notiUpload = async (actorId, userId, postId, commentId, type) => {
  const { error: uploadError } = await supabase
    .from('notifications')
    .insert([
      {
        user_id: userId,
        actor_id: actorId,
        post_id: postId,
        comments_id: commentId ?? null,
        type: type,
      },
    ])
    .select()
  if (uploadError) {
    alert('알림 업로드 실패!')
    console.error('알림 업로드 실패!:', uploadError)
    throw new Error(' 알림 저장 실패')
  } else {
    console.log('알림업로드완료(발신인,수신인):', actorId, userId)
  }
}

export const setRead = async (notiId) => {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('noti_id', notiId)

  if (error) {
    console.error('알림 읽음 처리 실패:', error)
  } else {
    console.log('알림 읽음 처리 성공')
  }
}

export const setAllRead = async (userId) => {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', userId)
    .eq('is_read', false)

  if (error) {
    console.error('알림 모두 읽음 처리 실패:', error)
  } else {
    console.log('알림 모두 읽음 성공!')
  }
}
