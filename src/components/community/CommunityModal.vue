<script setup>
import { useModalStore } from '@/stores/newPostStore'
import { computed, onMounted, ref } from 'vue'
import icon1 from '@/assets/icons/communityDropdown/politics.svg'
import icon2 from '@/assets/icons/communityDropdown/sports.svg'
import icon3 from '@/assets/icons/communityDropdown/celeb.svg'
import icon4 from '@/assets/icons/communityDropdown/culture.svg'
import icon5 from '@/assets/icons/communityDropdown/global.svg'
import icon6 from '@/assets/icons/communityDropdown/social.svg'
import icon7 from '@/assets/icons/communityDropdown/economy.svg'
import icon8 from '@/assets/icons/communityDropdown/etc.svg'
import { ArrowUpToLine, Trash2, ChevronDown, Image } from 'lucide-vue-next'
import { postUpload, updatePost } from '@/api/community/post'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const props = defineProps({
  mode: { type: String, default: 'create' }, // create / edit
  initialData: { type: Object, default: () => ({}) },
})
const emit = defineEmits(['editSubmit', 'close'])

const router = useRouter()
const toast = useToast()
const modalStore = useModalStore()

const isSortOpen = ref(false)
const selectedCategory = ref('카테고리 선택')
const selectedCategoryIcon = ref(null)
//
const title = ref('')
const content = ref('')
const fileInputRef = ref(null)

//
const categories = [
  { name: '정치', icon: icon1 },
  { name: '스포츠', icon: icon2 },
  { name: '연예', icon: icon3 },
  { name: '문화', icon: icon4 },
  { name: '해외', icon: icon5 },
  { name: '사회', icon: icon6 },
  { name: '경제', icon: icon7 },
  { name: '그 외', icon: icon8 },
]

//창 닫기
const handleModal = () => {
  modalStore.closeModal()
  emit('close')
}
const categoryId = computed(() =>
  categories.findIndex((category) => category.name === selectedCategory.value),
)
onMounted(() => {
  if (props.mode === 'edit' && props.initialData) {
    title.value = props.initialData.title
    content.value = props.initialData.content
    imageUrl.value = props.initialData.img
    selectedCategory.value = props.initialData.category || '카테고리 선택'

    const categoryObj = categories.find((cat) => cat.name === props.initialData.category)
    selectedCategoryIcon.value = categoryObj?.icon ?? null
  }
})

//카테고리 모달
const toggleModal = () => {
  isSortOpen.value = !isSortOpen.value
}
const categoryHandler = (categoryName) => {
  // console.log('클릭한 카테고리:',categoryName)
  const categoryObj = categories.find((a) => a.name === categoryName)
  selectedCategory.value = categoryName
  selectedCategoryIcon.value = categoryObj?.icon ?? null
  isSortOpen.value = false
}

//이미지 업로드
const { isUploading, imageUrl, file, uploadPost } = postUpload()

const handleDivClick = () => {
  fileInputRef.value?.click()
}

const handleUploadClick = () => {
  if (isUploading.value) return
  handleDivClick()
}
const handleDeleteImg = async () => {
  imageUrl.value = null
  file.value = null
  fileInputRef.value = null
}

const handleImgUpload = async (e) => {
  isUploading.value = true
  const selected = e.target.files[0]
  if (!selected) return
  file.value = selected
  imageUrl.value = URL.createObjectURL(file.value)
  isUploading.value = false
} //이미지 임시 업로드

const handleFinalUpload = async () => {
  if (!file.value && !content.value.trim()) {
    toast.warn('내용 또는 이미지를 작성해주세요.')
    return
  } else if (selectedCategory.value === '카테고리 선택') {
    toast.warn('카테고리를 선택해주세요')
    return
  }
  try {
    if (props.mode === 'edit') {
      await updatePost(props.initialData.id, {
        title: title.value,
        contents: content.value,
        category_id: categoryId.value + 1,
        content_image: imageUrl.value,
      })
      toast.success('게시글이 수정되었습니다!')
      emit('editSubmit')
    } else {
      const newPost = await uploadPost({
        categoryId: categoryId.value,
        title: title.value,
        content: content.value,
      })
      toast.success('게시글이 업로드 되었습니다')
      content.value = ''
      title.value = ''
      imageUrl.value = ''
      file.value = null
      modalStore.closeModal()
      router.push(`/community/${newPost.post_id}`)
    }
  } catch (err) {
    toast.error(err.message || '업로드 중 오류 발생')
    console.error(err)
  }
}

onMounted
</script>
<template>
  <Teleport to="body">
    <div class="fixed inset-0 bg-[#000000]/30 flex items-center justify-center">
      <div
        class="flex flex-col w-full sm:w-120 h-full sm:h-[679px] bg-[#ffffff] dark:bg-[#262626] sm:rounded-[16px] pt-[10px] px-[30px] sm:p-8"
      >
        <div class="relative inline-block">
          <button
            @click="toggleModal"
            class="flex relative w-[132px] h-[40px] sm:h-[46px] justify-between items-center rounded-[8px] border border-gray-200 dark:border-[#4D4D4D] cursor-pointer px-[10px] hover:border-[#BBBBBB] dark:hover:border-[#797979]"
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
            class="absolute top-[100%] pt-[12px] w-[132px] bg-[#ffffff] dark:bg-[#363636] rounded-[8px] shadow-[0_4px_10px_rgba(0,0,0,0.16)] z-[999]"
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
          class="flex flex-col min-h-[49px] w-full sm:w-[416px] mt-6 border-b border-b-[#DFDFDF] dark:border-b-[#4D4D4D] group hover:border-b-[#BBBBBB] dark:hover:border-b-[#797979] focus-within:!border-b-[#191919] dark:focus-within:!border-b-[#ffffff]"
        >
          <input
            v-model="title"
            class="min-w-[172px] h-[34px] mb-[15px] text-[24px] text-[#191919] dark:text-[#ffffff] placeholder-gray-300 dark:placeholder-[#585858] group-hover:placeholder-[#BBBBBB] dark:group-hover:placeholder-[#797979] focus:outline-none"
            placeholder="제목을 입력하세요"
          />
        </div>

        <!-- 이미지업로드 -->
        <div
          @click="handleUploadClick"
          :class="[
            'flex flex-col items-center justify-center w-full sm:w-[416px] min-h-[197px] flex-shrink-0  mt-6 border border-[#EAEAEA] dark:border-[#343434] rounded-[12px] bg-[#F6F6F6] dark:bg-[#2C2C2C] hover:bg-[#ECECEC] dark:hover:bg-[#1F1F1F] cursor-pointer overflow-hidden',
            isUploading
              ? 'pointer-events-none opacity-50 cursor-not-allowed bg-gray-300 animate-pulse'
              : '',
          ]"
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
            <p class="w-full sm:min-w-[116px] mt-[6px] text-[14px] text-[#BBBBBB] text-center">
              눌러서 이미지 업로드
            </p>
          </template>
        </div>

        <div class="flex-1 mt-4 w-full sm:w-104 flex">
          <!-- 게시글 입력 -->
          <textarea
            v-model="content"
            class="w-full min-h-[197px] mb-[80px] sm:mb-0 rounded-[12px] text-[14px] text-[#191919] dark:text-[#ffffff] placeholder-gray-300 dark:placeholder-[#585858] border border-gray-200 dark:border-[#343434] p-4 focus:outline-none"
            placeholder="나누고 싶은 의견을 작성하세요"
          />
        </div>
        <!-- 취소, 업로드 버튼 -->
        <div
          class="flex justify-center sm:justify-end mt-6 w-full h-11 gap-[10px] py-5 sm:py-0 bg-[#ffffff] dark:bg-[#262626] absolute bottom-[36px] left-0 sm:static px-[30px] sm:px-0"
        >
          <button
            @click="handleModal"
            class="flex items-center justify-center w-full sm:w-[110px] h-[50px] sm:h-11 rounded-[8px] bg-[#F6F6F6] dark:bg-[#2D2D2D] hover:bg-[#DFDFDF] dark:hover:bg-[#404040] cursor-pointer text-[14px] text-[#191919] dark:text-[#ffffff] transition-all duration-300"
          >
            취소
          </button>

          <button
            @click="handleFinalUpload"
            class="flex items-center justify-center w-full sm:w-[110px] h-[50px] sm:h-11 rounded-[8px] bg-[#7537E3] dark:bg-[#7846D2] hover:bg-[#601ED5] dark:hover:bg-[#6524D9] cursor-pointer text-[14px] text-[#FFFFFF] transition-all duration-300"
          >
            {{ props.mode === 'edit' ? '수정' : '업로드' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<style scoped></style>
