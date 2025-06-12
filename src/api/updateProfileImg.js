import supabase from '@/utils/supabase'

// 프로필 이미지 업로드 + DB 업데이트
export const updateProfileImg = async (userId, fileObj) => {
  try {
    // 1. 파일명 만들기
    const fileName = `profile_${userId}_${Date.now()}_${fileObj.name}`

    // 2. Storage에 이미지 업로드
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('post-images') // post-images 버킷 사용
      .upload(`profile/${fileName}`, fileObj) // profile/ 경로 사용해 분리

    if (uploadError) {
      console.error('이미지 업로드 실패:', uploadError)
      throw new Error('이미지 업로드 실패')
    } else {
      console.log('이미지 업로드 성공!:', uploadData)
    }

    // 3. 퍼블릭 URL 가져오기
    const { data: publicUrlData } = supabase.storage
      .from('post-images')
      .getPublicUrl(`profile/${fileName}`)

    const publicUrl = publicUrlData.publicUrl
    console.log('업로드된 이미지 URL:', publicUrl)

    // 4. profiles 테이블에 URL 저장
    const { data: updatedUser, error: updateError } = await supabase
      .from('profiles')
      .update({ profile_img: publicUrl }) // 여기가 핵심
      .eq('user_id', userId)

    if (updateError) {
      console.error('프로필 업데이트 실패:', updateError)
      throw new Error('프로필 업데이트 실패')
    }

    return updatedUser
  } catch (err) {
    alert(err.message)
    return null
  }
}
