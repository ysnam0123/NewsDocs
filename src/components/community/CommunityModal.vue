<script setup>
import { useModalStore } from '@/stores/newPostStore'
import { ref } from 'vue'
const modalStore = useModalStore()
const handleModal = () => {
  modalStore.closeModal()
}
const isSortOpen = ref(false)
const selectedCategory = ref('카테고리 선택')
const categories = ['정치/경제', '연예/스포츠', '사회/문화', '해외/기타']

const toggleModal = () => {
  isSortOpen.value = !isSortOpen.value
}

const categoryHandler = (category) => {
  selectedCategory.value = category
  isSortOpen.value = false
}
</script>
<template>
  <div class="fixed inset-0 bg-[#000000]/30 flex justify-center items-center z-20">
    <div class="w-250 h-[1022px] border border-[#000000] bg-[#ffffff] rounded-[15px] px-[38px]">
      <div
        class="flex flex-col justify-center h-[42px] min-w-[267px] mt-[25px] font-semibold text-[35px]"
      >
        제목을 입력하세요
      </div>
      <div class="flex mt-[13px]">
        <div>
          <div class="w-[150px] h-[10px] bg-[#ECE1FF]"></div>
          <div class="relative w-[184px] mt-6">
            <button
              @click="toggleModal"
              class="flex justify-between items-center gap-[11px] w-full h-[45px] rounded-[10px] border border-[#BABABA] cursor-pointer px-[20px] text-xl"
            >
              <span>{{ selectedCategory }}</span>
              <font-awesome-icon :icon="['fas', 'caret-down']" />
            </button>
            <!-- 정렬 모달 -->
            <div
              v-if="isSortOpen"
              class="absolute top-[100%] mt-2 w-46 bg-[#ffffff] border border-[#BABABA] rounded-[10px] shadow-md z-40"
            >
              <ul class="py-2">
                <li
                  v-for="category in categories"
                  :key="category"
                  @click="categoryHandler(category)"
                  class="flex flex-col items-center justify-center px-4 py-2 text-[18px] cursor-pointer"
                >
                  {{ category }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 이미지업로드 -->
        <div
          class="flex flex-col items-center justify-center w-[419px] h-[178px] ml-[153px] border border-dashed"
        >
          <img src="../../assets/icons/imageAdd.svg" alt="이미지 업로드" />
          <p class="w-full mt-4 text-xl text-center">이미지 업로드</p>
        </div>
      </div>
      <div class="mt-6 w-230">
        <!-- 게시글 입력 -->
        <textarea
          class="w-full h-[543px] rounded-[10px] border border-[#AFAFAF] px-[27px] py-[26px]"
          placeholder="의견을 자유롭게 나눠보세요!"
        />
        <!-- 취소,저장버튼 -->
        <div class="flex justify-end mt-28 w-full h-[50px] gap-[14px]">
          <button
            @click="handleModal"
            class="flex items-center justify-center border border-[#C9C9C9] w-[121px] h-[50px] rounded-lg cursor-pointer text-xl text-[#E70808]"
          >
            취소
          </button>
          <button
            @click="handleModal"
            class="flex items-center justify-center border border-[#C9C9C9] w-[121px] h-[50px] rounded-lg cursor-pointer text-xl text-[#6046CF]"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>
<style scoped></style>
