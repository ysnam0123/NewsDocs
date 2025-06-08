<script setup>
import { useModalStore } from '@/stores/newPostStore'
import { ref } from 'vue'
import icon1 from '@/assets/icons/communityDropdown/politics.svg'
import icon2 from '@/assets/icons/communityDropdown/sports.svg'
import icon3 from '@/assets/icons/communityDropdown/celeb.svg'
import icon4 from '@/assets/icons/communityDropdown/culture.svg'
import icon5 from '@/assets/icons/communityDropdown/global.svg'
import icon6 from '@/assets/icons/communityDropdown/social.svg'
import icon7 from '@/assets/icons/communityDropdown/economy.svg'

const modalStore = useModalStore()
const handleModal = () => {
  modalStore.closeModal()
}
const isSortOpen = ref(false)
const selectedCategory = ref('카테고리 선택')
const selectedCategoryIcon = ref(null)
const categories = [
  { name: '정치', icon: icon1 },
  { name: '스포츠', icon: icon2 },
  { name: '연예', icon: icon3 },
  { name: '문화', icon: icon4 },
  { name: '해외', icon: icon5 },
  { name: '사회', icon: icon6 },
  { name: '경제', icon: icon7 },
]
const toggleModal = () => {
  isSortOpen.value = !isSortOpen.value
}

const categoryHandler = (categoryName) => {
  const categoryObj = categories.find((a) => a.name === categoryName)
  selectedCategory.value = categoryName
  selectedCategoryIcon.value = categoryObj?.icon ?? null
  isSortOpen.value = false
}
</script>
<template>
  <div class="fixed inset-0 bg-[#000000]/30 flex justify-center items-center z-20">
    <div class="flex flex-col w-120 h-[679px] bg-[#ffffff] rounded-[16px] p-8">
      <div class="relative inline-block">
        <button
          @click="toggleModal"
          class="flex relative w-[132px] h-[46px] justify-between items-center rounded-[8px] border border-gray-200 cursor-pointer px-[10px] hover:border-[#BBBBBB]"
        >
          <p
            class="flex items-center gap-2 text-[14px] leading-[40px]"
            :class="selectedCategory !== '카테고리 선택' ? 'text-[#191919]' : 'text-gray-300'"
          >
            <img
              v-if="selectedCategoryIcon"
              :src="selectedCategoryIcon"
              alt="icon"
              class="w-4 h-4"
            />
            {{ selectedCategory }}
          </p>
          <img
            src="../../assets/icons/Chevron--down.svg"
            alt="카테고리 버튼"
            class="flex items-center w-4 h-4"
          />
        </button>
        <!-- 정렬 모달 -->
        <div
          v-if="isSortOpen"
          class="absolute top-[100%] mt-[12px] w-[132px] bg-[#ffffff] border border-gray-200 rounded-[8px] shadow-[0_4px_10px_rgba(0,0,0,0.16)] z-40"
        >
          <ul>
            <li
              v-for="category in categories"
              :key="category.name"
              @click="categoryHandler(category.name)"
              class="flex items-center gap-1 px-[12px] py-[14px] text-[14px] cursor-pointer hover:bg-[#F6F6F6]"
            >
              <img :src="category.icon" alt="icon" class="w-[18px] h-[18px] mr-1" />
              {{ category.name }}
            </li>
          </ul>
        </div>
      </div>
      <div
        class="flex flex-col h-[49px] w-[416px] mt-6 border-b border-b-[#DFDFDF] group hover:border-b-[#BBBBBB] focus-within:!border-b-[#191919]"
      >
        <input
          class="min-w-[172px] h-[34px] mb-[15px] text-[24px] text-[#191919] placeholder-gray-300 group-hover:placeholder-[#BBBBBB] focus:outline-none"
          placeholder="제목을 입력하세요"
        />
      </div>

      <!-- 이미지업로드 -->
      <div
        class="flex flex-col items-center justify-center w-[416px] min-h-[197px] mt-6 border border-[#EAEAEA] rounded-[12px] bg-[#F6F6F6] hover:bg-[#ECECEC] cursor-pointer"
      >
        <img
          src="../../assets/icons/Image.svg"
          alt="이미지 업로드"
          class="w-5 h-5 text-[#BBBBBB]"
        />
        <p class="min-w-[116px] mt-[6px] text-[14px] text-[#BBBBBB] text-center">
          눌러서 이미지 업로드
        </p>
      </div>

      <div class="mt-4 w-104">
        <!-- 게시글 입력 -->
        <textarea
          class="w-full h-[197px] rounded-[12px] text-[14px] text-[#191919] placeholder-gray-300 border border-gray-200 p-4"
          placeholder="나누고 싶은 의견을 작성하세요"
        />
        <!-- 취소,저장버튼 -->
        <div class="flex justify-end mt-6 w-full h-11 gap-[10px]">
          <button
            @click="handleModal"
            class="flex items-center justify-center w-[110px] h-11 rounded-[8px] bg-[#F6F6F6] hover:bg-[#DFDFDF] cursor-pointer text-[14px] text-[#191919] transition-all duration-300"
          >
            취소
          </button>
          <button
            @click="handleModal"
            class="flex items-center justify-center w-[110px] h-11 rounded-[8px] bg-[#7537E3] hover:bg-[#601ED5] cursor-pointer text-[14px] text-[#FFFFFF] transition-all duration-300"
          >
            업로드
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
