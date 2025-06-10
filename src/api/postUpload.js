import supabase from '@/utils/supabase'
import { ref } from 'vue'
import { getCurrentUser } from './getCurrentUser'

//uploadPost
export const postUpload = () => {
  const isUploading = ref(false)
  const imageUrl = ref('') //supabase에서 이미지 불러오는 url
  const file = ref(null) //이미지 원본 파일

  const uploadImage = async (fileObj) => {
    const fileName = `${Date.now()}_${fileObj.name}`
    const { error: imageError } = await supabase.storage
      .from('post-images')
      .upload(fileName, fileObj)

    if (imageError) {
      alert('이미지 업로드 실패')
      throw new Error('이미지 업로드 실패')
    }
    const { data } = supabase.storage.from('post-images').getPublicUrl(fileName)
    return data.publicUrl
  } //이미지 업로드& 불러오기

  const uploadPost = async ({ categoryId, title, content }) => {
    const user = await getCurrentUser()

    isUploading.value = true

    try {
      if (file.value) {
        imageUrl.value = await uploadImage(file.value)
      }

      const { error: insertError } = await supabase.from('post').insert([
        {
          user_id: user.id,
          category_id: categoryId,
          title: title.value,
          contents: content.value,
          content_image: imageUrl.value,
        },
      ])

      if (insertError) {
        alert('게시글 업로드 실패!')
        throw new Error('게시글 저장 실패')
      }
    } finally {
      isUploading.value = false
    }
  }
  return {
    isUploading,
    imageUrl,
    file,
    uploadPost,
  }
}
