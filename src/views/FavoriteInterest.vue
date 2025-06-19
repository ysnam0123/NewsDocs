<script setup>
import InterestCard from '@/components/interest/InterestCard.vue'
import { categoryIdMap } from '@/composables/useCategoryMap'
import { useInterestStore } from '@/stores/interestStore'
import supabase from '@/utils/supabase'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()
const store = useInterestStore()
const router = useRouter()
const name = ref('사용자')
const pageMounted = ref(false)

onMounted(async () => {
  const { data } = await supabase.auth.getUser()
  const user = data?.user
  if (user) {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('name')
      .eq('user_id', user.id)
      .single()
    if (!profileError && profile) {
      name.value = profile.name || '사용자'
    }
  }
  setTimeout(() => (pageMounted.value = true), 500)
})

// 최대 관심사 토글
const addFavorite = (item) => {
  store.favoriteInterest = store.favoriteInterest === item.id ? '' : item.id
}

const saveInterests = async () => {
  if (!store.favoriteInterest) return

  // 인증 유저 확인
  const { data, error: authError } = await supabase.auth.getUser()
  if (authError || !data?.user) {
    toast.error('로그인이 필요합니다.')
    return
  }
  const userId = data.user.id

  // 선택한 관심사 category_id 배열
  const selectedCategoryIds = store.interest.map((i) => categoryIdMap[i.id]).filter(Boolean)
  const highestCategoryId = categoryIdMap[store.favoriteInterest]

  try {
    //기존에 선택하지 않은 관심사 삭제
    await supabase
      .from('user_interests')
      .delete()
      .eq('user_id', userId)
      .not('category_id', 'in', `(${selectedCategoryIds.join(',')})`)

    //선택한 관심사 upsert (최대 관심사만 is_highest true)
    const interestRows = selectedCategoryIds.map((categoryId) => ({
      user_id: userId,
      category_id: categoryId,
      is_highest: categoryId === highestCategoryId,
    }))

    const { error: interestError } = await supabase
      .from('user_interests')
      .upsert(interestRows, { onConflict: ['user_id', 'category_id'] })

    if (interestError) throw interestError

    // 3. 프로필 상태 업데이트
    await supabase.from('profiles').update({ set_interest: true }).eq('user_id', userId)

    toast.success('저장되었습니다!')
    store.clear()
    router.push('/')
  } catch (e) {
    toast.error('관심사 저장에 실패했습니다.')
    console.error(e)
  }
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="pageMounted"
      class="flex justify-center items-center"
      :style="{ minHeight: 'calc(100vh - 100px)' }"
    >
      <div class="w-[530px] h-[284px]">
        <!-- 제목 -->
        <h1 class="text-[18px] font-semibold mb-[22px] dark:text-white">
          마지막으로 {{ name }}님의 <br />
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
