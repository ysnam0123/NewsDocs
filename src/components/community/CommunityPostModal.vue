<!-- 게시글 수정,삭제 아직 미완료입니다! -->
<script setup>
import { ref } from 'vue'
import { EllipsisVertical, PencilLine, Trash2 } from 'lucide-vue-next'
const props = defineProps({ postId: Number })
const emit = defineEmits(['delete', 'edit'])
const isPostModalOpen = ref(false)
const togglePostModal = () => {
  isPostModalOpen.value = !isPostModalOpen.value
}
const editHandler = () => {
  emit('edit')
  isPostModalOpen.value = false
}
const deleteHandler = () => {
  emit('delete', props.postId)
  isPostModalOpen.value = false
}
</script>
<template>
  <div class="relative">
    <button
      @click="togglePostModal"
      class="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 bg-[#FFFFFF] dark:bg-[#262626] hover:bg-[#F6F6F6] dark:hover:bg-[#363636] active:bg-[#ECECEC] dark:active:bg-[#404040]"
    >
      <EllipsisVertical class="w-[20px] h-[20px] text-[#161616] dark:text-[#FFFFFF]" />
    </button>
    <div
      v-if="isPostModalOpen"
      class="absolute top-[44px] right-[0px] w-[157px] min-h-[128px] bg-[#FFFFFF] dark:bg-[#363636] shadow-[0_4px_10px_rgba(0,0,0,0.16)] rounded-[8px] z-40"
    >
      <ul class="w-full text-[12px] text-[#C9C9C9] dark:text-[#7A7A7A]">
        <span class="ml-3 mt-3 block">내 게시글</span>
        <li
          @click="editHandler"
          class="flex items-center gap-[6px] w-full h-[46px] mt-[7px] px-3 py-[13px] cursor-pointer text-[14px] text-[#191919] dark:text-[#FFFFFF] hover:bg-gray-100 dark:hover:bg-[#404040] transition-all duration-300"
        >
          <PencilLine class="w-4 h-4 dark:text-[#FFFFFF]" />
          수정하기
        </li>
        <li
          @click="deleteHandler"
          class="flex items-center gap-[6px] w-full h-[46px] px-3 py-[13px] cursor-pointer text-[14px] text-[#E03333] dark:text-[#FF4D4D] hover:bg-gray-100 dark:hover:bg-[#404040] transition-all duration-300"
        >
          <Trash2 class="w-4 h-4" />
          삭제하기
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped></style>
