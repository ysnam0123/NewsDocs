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
import { ArrowUpToLine, ChevronDown, Image, Trash2 } from 'lucide-vue-next'
import supabase from '@/utils/supabase'
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

const imageUrl = ref('')
const isUploading = ref(false)
const fileInputRef = ref(null)
const file = ref(null)

const title = ref('')
const content = ref('')

const handleDivClick = () => {
  fileInputRef.value?.click()
}
const handleDeleteImg = () => {
  imageUrl.value = ''
  file.value = null
  fileInputRef.value.value = ''
}
const handleImgUpload = (e) => {
  file.value = e.target.files[0]
  if (!file.value) return
  imageUrl.value = URL.createObjectURL(file.value)
}

const handleFinalUpload = async () => {
  if (!file.value&&!content.value.trim()) {
    alert('내용 또는 이미지를 작성해주세요.')
    return
  }

  isUploading.value = true

  let fileName=''
  if(file.value){
  fileName = `${Date.now()}_${file.value.name}`
  const { error:imageError } = await supabase.storage.from('post-images').upload(fileName, file.value)

  if (imageError) {
    alert('이미지 업로드 실패!') //토스트 메시지
    isUploading.value = false
    console.error(imageError)
    return
  }
  const { data: publicData } = supabase.storage.from('post-images').getPublicUrl(fileName)
  console.log(publicData.publicUrl)
  imageUrl.value = publicData.publicUrl
  }
  const {error:insertError}=await supabase
    .from('post')
    .insert([{
      user_id: ,
      category_id:,
      title:title.value,
      contents:content.value,
      content_image:imageUrl.value,
    }])

    if(insertError){
      alert('게시글 업로드 실패!')
    }else{
      alert('게시글 업로드 성공!')
      content.value=''
      imageUrl.value=''
      file.value=null
    }
  isUploading.value = false
}
</script>
<template>
  <div class="fixed inset-0 bg-[#000000]/30 flex justify-center items-center z-20">
    <div class="flex flex-col w-120 h-[679px] bg-[#ffffff] dark:bg-[#262626] rounded-[16px] p-8">
      <div class="relative inline-block">
        <button
          @click="toggleModal"
          class="flex relative w-[132px] h-[46px] justify-between items-center rounded-[8px] border border-gray-200 dark:border-[#4D4D4D] cursor-pointer px-[10px] hover:border-[#BBBBBB] dark:hover:border-[#797979]"
        >
          <p
            class="flex items-center gap-2 text-[14px] dark:text-[#D7D7D7] leading-[40px]"
            :class="selectedCategory !== '카테고리 선택' ? 'text-[#191919] ' : 'text-gray-300'"
          >
            <img
              v-if="selectedCategoryIcon"
              :src="selectedCategoryIcon"
              alt="icon"
              class="w-4 h-4"
            />
            {{ selectedCategory }}
          </p>
          <ChevronDown class="flex items-center w-4 h-4 dark:stroke-[#D7D7D7]" />
        </button>
        <!-- 정렬 모달 -->
        <div
          v-if="isSortOpen"
          class="absolute top-[100%] pt-[12px] w-[132px] bg-[#ffffff] dark:bg-[#363636] rounded-[8px] shadow-[0_4px_10px_rgba(0,0,0,0.16)] z-40"
        >
          <ul>
            <li
              v-for="category in categories"
              :key="category.name"
              @click="categoryHandler(category.name)"
              class="flex items-center gap-1 px-[12px] py-[14px] text-[14px] dark:text-[#ffffff] cursor-pointer hover:bg-[#F6F6F6] dark:hover:bg-[#404040]"
            >
              <img :src="category.icon" alt="icon" class="w-[18px] h-[18px] mr-1" />
              {{ category.name }}
            </li>
          </ul>
        </div>
      </div>
      <div
        class="flex flex-col h-[49px] w-[416px] mt-6 border-b border-b-[#DFDFDF] dark:border-b-[#4D4D4D] group hover:border-b-[#BBBBBB] dark:hover:border-b-[#797979] focus-within:!border-b-[#191919] dark:focus-within:!border-b-[#ffffff]"
      >
        <input
          v-model="title"
          class="min-w-[172px] h-[34px] mb-[15px] text-[24px] text-[#191919] dark:text-[#ffffff] placeholder-gray-300 dark:placeholder-[#585858] group-hover:placeholder-[#BBBBBB] dark:group-hover:placeholder-[#797979] focus:outline-none"
          placeholder="제목을 입력하세요"
        />
      </div>

      <!-- 이미지업로드 -->
      <div
        @click="handleDivClick"
        class="flex flex-col items-center justify-center w-[416px] min-h-[197px] mt-6 border border-[#EAEAEA] dark:border-[#343434] rounded-[12px] bg-[#F6F6F6] dark:bg-[#2C2C2C] hover:bg-[#ECECEC] dark:hover:bg-[#1F1F1F] cursor-pointer overflow-hidden"
      >
        <input
          type="file"
          accept="image/*"
          @change="handleImgUpload"
          ref="fileInputRef"
          class="hidden"
        />

        <template v-if="isUploading">
          <p class="text-[#BBBBBB]>">업로드중...</p>
        </template>

        <template v-else-if="imageUrl">
          <div class="relative w-full h-full">
            <img
              :src="imageUrl"
              alt="업로드 이미지"
              class="w-full h-full rounded-[12px] object-cover object-center"
            />

            <!-- 재업로드,삭제 버튼-->
            <div class="absolute top-4 right-4 flex gap-[6px] z-10">
              <div
                class="flex items-center justify-center w-8 h-8 rounded-full bg-[#000000]/60 cursor-pointer"
              >
                <ArrowUpToLine @click.stop="handleDivClick" class="w-4 h-4 stroke-[#FFFFFF]" />
              </div>
              <div
                class="flex items-center justify-center w-8 h-8 rounded-full bg-[#000000]/60 cursor-pointer"
              >
                <Trash2 @click.stop="handleDeleteImg" class="w-4 h-4 stroke-[#FFFFFF]" />
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <Image class="w-5 h-5 text-[#BBBBBB]" />
          <p class="min-w-[116px] mt-[6px] text-[14px] text-[#BBBBBB] text-center">
            눌러서 이미지 업로드
          </p>
        </template>
      </div>

      <div class="mt-4 w-104">
        <!-- 게시글 입력 -->
        <textarea
          v-model="content"
          class="w-full h-[197px] rounded-[12px] text-[14px] text-[#191919] dark:text-[#ffffff] placeholder-gray-300 dark:placeholder-[#585858] border border-gray-200 dark:border-[#343434] p-4 focus:outline-none"
          placeholder="나누고 싶은 의견을 작성하세요"
        />
        <!-- 취소, 업로드 버튼 -->
        <div class="flex justify-end mt-6 w-full h-11 gap-[10px]">
          <button
            @click="handleModal"
            class="flex items-center justify-center w-[110px] h-11 rounded-[8px] bg-[#F6F6F6] dark:bg-[#2D2D2D] hover:bg-[#DFDFDF] dark:hover:bg-[#404040] cursor-pointer text-[14px] text-[#191919] dark:text-[#ffffff] transition-all duration-300"
          >
            취소
          </button>
          <button
            @click="handleFinalUpload"
            class="flex items-center justify-center w-[110px] h-11 rounded-[8px] bg-[#7537E3] dark:bg-[#7846D2] hover:bg-[#601ED5] dark:hover:bg-[#6524D9] cursor-pointer text-[14px] text-[#FFFFFF] transition-all duration-300"
          >
            업로드
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
