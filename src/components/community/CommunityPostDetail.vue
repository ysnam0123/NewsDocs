<script setup>
import { useRouter } from 'vue-router'
import profileDefault from '../../assets/img/communityImg/profileDefault.svg'
import CommunityPostModal from './CommunityPostModal.vue'
import { ref } from 'vue'
import CommunityModal from './CommunityModal.vue'
import { deletePost } from '@/api/community/post'
import { useToast } from 'vue-toastification'
import { fetchPostDetail } from '@/api/community/fetchPostDetail'

const props = defineProps({
  postId: String,
  img: String,
  title: String,
  content: String,
  category: String,
  userId: String,
  userName: String,
  userImg: String,
  currentUserId: String,
})
const categoryWithId = ['정치', '스포츠', '연예', '문화', '해외', '사회', '경제', '그 외']
const router = useRouter()
const toast = useToast()
const isEditModalOpen = ref(false) //게시글 수정 모달
const updated = ref(null)

const handleProfile = () => {
  router.push(`/profile/${props.userId}`)
}
//게시글 삭제
const deleteHandler = async () => {
  try {
    await deletePost(props.postId)
    toast('게시글이 삭제되었습니다.')
    router.push('/community')
  } catch (err) {
    toast.error('삭제 중 오류가 발생했습니다')
    console.error('게시글 삭제 오류:', err)
  }
}

//게시글 수정
const editHandler = () => {
  isEditModalOpen.value = true //수정하기 누르면 수정모달창 열기
}
const handleEditSubmit = async () => {
  isEditModalOpen.value = false
  updated.value = await fetchPostDetail(props.postId)
}
</script>
<template>
  <div
    class="relative flex flex-col w-full sm:w-[830px] h-auto sm:max-h-[846px] sm:px-10 rounded-[12px] sm:rounded-[16px] sm:border sm:border-gray-200 sm:dark:bg-[#242424] sm:dark:border-[#333333]"
  >
    <!-- 작성자 -->
    <div class="flex w-full items-center justify-between mt-4 sm:mt-8">
      <div @click="handleProfile" class="flex gap-[10px] items-center cursor-pointer">
        <img
          :src="userImg ? userImg : profileDefault"
          alt="사용자 이미지"
          class="w-10 sm:w-12 h-10 sm:h-12 rounded-full"
        />
        <p class="sm:ml-[10px] text-[14px] sm:text-lg text-[#191919] dark:text-[#FFFFFF]">
          {{ userName }}
        </p>
      </div>
      <div class="flex items-center w-fit gap-[11px]">
        <span class="text-[14px] sm:text-[16px] text-[#7537E3] flex items-center"
          >#{{ updated ? categoryWithId[updated.category_id - 1] : props?.category }}</span
        >
        <span v-if="props.currentUserId == props.userId">
          <CommunityPostModal :postId="props.postId" @delete="deleteHandler" @edit="editHandler" />
        </span>
      </div>
    </div>
    <img
      v-if="props.img"
      :src="updated?.content_image || props.img"
      alt="게시글 이미지"
      class="mt-4 sm:mt-6 w-auto h-auto max-w-[320px] sm:max-w-[750px] max-h-[202px] sm:max-h-[361px] object-contain rounded-[12px] mx-auto"
    />
    <!-- 제목 -->
    <div class="mt-6 sm:mt-8 text-xl sm:text-2xl dark:text-[#FFFFFF]">
      {{ updated?.title || props?.title }}
    </div>
    <!-- 내용 -->
    <div
      class="w-[320px] sm:w-[750px] h-auto sm:min-h-[100px] mt-[12px] sm:mt-[14px] mb-6 sm:mb-10 text-[16px] sm:text-[18px] text-[#191919] dark:text-[#FFFFFF]"
    >
      <p>
        {{ updated?.contents || props?.content }}
      </p>
    </div>

    <!-- 수정 모달 -->
    <CommunityModal
      v-if="isEditModalOpen"
      :mode="'edit'"
      :initialData="{
        id: props.postId,
        title: props.title,
        content: props.content,
        img: props.img,
        category: props.category,
      }"
      @editSubmit="handleEditSubmit"
      @close="isEditModalOpen = false"
    />
  </div>
</template>
<style scoped></style>
