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
    console.log('fileName:', fileName)
    const { data: uploadData, error: imageError } = await supabase.storage
      .from('post-images')
      .upload(fileName, fileObj)

    if (imageError) {
      alert('이미지 업로드 실패')
      console.log('imageError:', imageError)
      throw new Error('이미지 업로드 실패')
    } else {
      alert('이미지 업로드 성공!')
      console.log('이미지 업로드 성공!:', uploadData)
    }
    const { data: publicUrlData } = supabase.storage.from('post-images').getPublicUrl(fileName)
    return publicUrlData.publicUrl
  } //이미지 업로드& 불러오기

  const uploadPost = async ({ categoryId, title, content }) => {
    const user = await getCurrentUser()

    isUploading.value = true
    console.log('제목:', title)
    try {
      if (file.value) {
        imageUrl.value = await uploadImage(file.value)
      }

      const { data, error: insertError } = await supabase
        .from('post')
        .insert([
          {
            user_id: user.id,
            category_id: categoryId + 1,
            title: title,
            contents: content,
            content_image: imageUrl.value,
          },
        ])
        .select() //

      if (insertError) {
        alert('게시글 업로드 실패!')
        console.error('게시글 업로드 실패!:', insertError)
        throw new Error('게시글 저장 실패')
      }
      return data?.[0] //
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
