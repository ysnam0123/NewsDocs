<script setup>
import InterestCard from '@/components/interest/InterestCard.vue'
import { useInterestStore } from '@/stores/interestStore'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { interestMap } from '@/composables/useInterestMap'
import supabase from '@/utils/supabase'
const store = useInterestStore()

const interests = interestMap
const name = ref('사용자')
const pageMounted = ref(false)

onMounted(async () => {
  // 사용자 정보 및 이름 가져오기
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
  setTimeout(() => {
    pageMounted.value = true
  }, 300)
})

// 관심사 추가 (일단 피니아에 저장)
const addInterest = (item) => {
  const idx = store.interest.findIndex((interest) => interest.id === item.id)
  if (idx > -1) {
    store.interest.splice(idx, 1)
  } else if (store.interest.length < 6) {
    store.interest.push(item)
  }
  // 6개 이상일 때 저장 안함
}

const router = useRouter()
const chooseFavorite = () => {
  if (store.interest.length >= 3 && store.interest.length < 6) {
    router.push('/interest/fav')
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
      <div class="flex flex-col w-[500px] min-h-[400px]">
        <div class="flex gap-[50px] mb-[24px]">
          <h1 class="text-[18px] font-bold dark:text-white">
            {{ name }}님의 <span class="text-[#7537E3]">관심사</span>를 선택해주세요
            <span class="text-[#8b8b8b] text-[14px] font-medium">(최소 3개)</span>
          </h1>
        </div>
        <div>
          <div class="flex flex-col w-[500px] justify-center items-center gap-[12px]">
            <div class="flex flex-col gap-[12px]">
              <div class="flex gap-[12px]">
                <InterestCard
                  v-for="item in interests.slice(0, 4)"
                  :key="item.id"
                  :id="item.id"
                  :label="item.label"
                  :icon="item.icon"
                  :isSelected="store.interest.some((interest) => interest.id === item.id)"
                  @select="addInterest"
                />
              </div>
              <div class="flex gap-[12px]">
                <InterestCard
                  v-for="item in interests.slice(4)"
                  :key="item.id"
                  :id="item.id"
                  :label="item.label"
                  :icon="item.icon"
                  :isSelected="store.interest.some((interest) => interest.id === item.id)"
                  @select="addInterest"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          :disabled="store.interest.length < 3 || store.interest.length > 6"
          :class="[
            'flex items-center select-none justify-center w-[140px] h-[50px] text-[16px] font-semibold mt-[40px] rounded-[8px] ml-auto cursor-pointer ease-in-out duration-200 hover:scale-[1.025]',
            store.interest.length >= 3 && store.interest.length <= 5
              ? 'bg-[#7537e3] text-white'
              : 'bg-[#f2f2f2] text-[#b3b3b3] cursor-not-allowed',
          ]"
          @click="chooseFavorite"
        >
          다음
        </button>
      </div>
    </div>
  </transition>
</template>
<style scoped>
.clicked {
  background-color: #f5f2fa;
  border: 1px solid #7537e3;
}
.clicked:hover {
  background-color: #ede4fd;
}

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
</style>
