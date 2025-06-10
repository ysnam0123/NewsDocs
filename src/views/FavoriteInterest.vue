<script setup>
import InterestCard from '@/components/interest/InterestCard.vue'
import { userAuthStore } from '@/stores/authStore'
import { useInterestStore } from '@/stores/interestStore'
import supabase from '@/utils/supabase'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useToast } from 'vue-toastification'
const toast = useToast()
const store = useInterestStore()
const auth = userAuthStore()
const userId = auth.user?.id
const nickname = ref(auth.user?.nickname || '사용자')
const router = useRouter()

const pageMounted = ref(false)
onMounted(() => {
  setTimeout(() => {
    pageMounted.value = true
  }, 500)
})

//카테고리 id랑 맵핑
const categoryIdMap = {
  politics: 1, // 정치
  sports: 2, // 스포츠
  entertain: 3, // 연예
  culture: 4, // 문화
  abroad: 5, // 해외
  society: 6, // 사회
  economy: 7, // 경제
  etc: 8, // 임시 ID// etc는 DB에 없음 -> 뭐로 지정할 지 추후 논의
}

const addFavorite = (item) => {
  const selectedId = item.id
  if (store.favoriteInterest !== '') {
    if (store.favoriteInterest === selectedId) {
      store.favoriteInterest = ''
    } else {
      //console.log(`이미 선택됨!: ${store.favoriteInterest}`)
      return
    }
  } else {
    store.favoriteInterest = selectedId
  }

  //console.log('현재 선택:', store.favoriteInterest)
}

const saveInterests = async () => {
  if (!userId) {
    toast('로그인이 필요합니다.')
    router.push('/login')
    return
  }
  if (store.favoriteInterest === '') {
    alert('최대 관심사를 선택해주세요!')
    return
  }
  try {
    //기존 관심사 삭제
    await supabase.from('user_interests').delete().eq('user_id', userId)

    const dataToSave = {
      user_id: userId,
      interests: store.interest
        .filter((interest) => interest.id !== 'etc') // etc 제외 (논의 필요 시 주석 해제)
        .map((interest) => ({
          category_id: categoryIdMap[interest.id],
          is_highest: interest.id === store.favoriteInterest,
        })),
    }

    const { error } = await supabase.from('user_interests').insert(
      dataToSave.interests.map((interest) => ({
        user_id: userId,
        category_id: interest.category_id,
        is_highest: interest.is_highest,
      })),
    )

    if (error) throw error

    const { error: profileError } = await supabase
      .from('profiles')
      .update({ set_interest: true })
      .eq('user_id', userId)

    if (profileError) throw profileError

    //console.log('관심사 저장 완료!', dataToSave)
    toast('저장되었습니다.')
    router.push('/')
  } catch (error) {
    console.error('관심사 저장 오류:', error)
    toast('관심사 저장에 실패했습니다.')
  }
}
</script>
<template>
  <transition name="fade">
    <div v-if="pageMounted" class="fixed inset-0 flex justify-center items-center">
      <div class="w-[444px] h-[284px]">
        <!-- 제목 -->
        <h1 class="text-[18px] font-semibold mb-[22px]">
          마지막으로 {{ nickname }}님의 <br />
          <span class="text-[#7537E3]">최대 관심사</span>를 1개 선택해주세요
        </h1>

        <!-- 카드 -->
        <div class="flex flex-col flex-wrap justify-center gap-[12px]">
          <div class="flex gap-[12px]">
            <InterestCard
              v-for="item in store.interest.slice(0, 4)"
              :key="item.id"
              :id="item.id"
              :label="item.label"
              :icon="item.icon"
              :isSelected="store.favoriteInterest === item.id"
              @select="addFavorite"
            />
          </div>
          <div class="flex gap-[12px]">
            <InterestCard
              v-for="item in store.interest.slice(4)"
              :key="item.id"
              :id="item.id"
              :label="item.label"
              :icon="item.icon"
              :isSelected="store.favoriteInterest === item.id"
              @select="addFavorite"
            />
          </div>
        </div>
        <button
          :disabled="store.favoriteInterest === ''"
          :class="[
            'flex items-center justify-center w-[140px] h-[50px] text-[16px] font-semibold mt-[40px] rounded-[8px] ml-auto cursor-pointer ease-in-out duration-200 hover:scale-[1.025]',
            store.favoriteInterest !== ''
              ? 'bg-[#7537e3] text-white'
              : 'bg-[#f2f2f2] text-[#b3b3b3] cursor-not-allowed',
          ]"
          @click="saveInterests"
        >
          다음
        </button>
      </div>
    </div>
  </transition>
</template>
<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
}
.fade-enter-active {
  animation: fadeIn 0.5s ease forwards;
}
.fade-leave-active {
  animation: fadeOut 0.3s ease forwards;
}
.selectedInterest:hover {
  cursor: pointer;
  opacity: 0.7;
  color: white;
}
.selected {
  background-color: #f9ed00;
}
</style>
