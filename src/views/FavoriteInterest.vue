<script setup>
import InterestCard from '@/components/interest/InterestCard.vue'
import { useInterestStore } from '@/stores/interestStore'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const store = useInterestStore()

const pageMounted = ref(false)
onMounted(() => {
  setTimeout(() => {
    pageMounted.value = true
  }, 500)
})

const addFavorite = (item) => {
  const selectedId = item.id
  if (store.favoriteInterest !== '') {
    if (store.favoriteInterest === selectedId) {
      store.favoriteInterest = ''
    } else {
      console.log(`이미 선택됨!: ${store.favoriteInterest}`)
      return
    }
  } else {
    store.favoriteInterest = selectedId
  }

  console.log('현재 선택:', store.favoriteInterest)
}

const router = useRouter()
const myInterest = () => {
  router.push('/myinterest')
}
</script>
<template>
  <transition name="fade">
    <div v-if="pageMounted" class="fixed inset-0 flex justify-center items-center">
      <div class="w-[530px] h-[284px]">
        <!-- 제목 -->
        <h1 class="text-[18px] font-semibold mb-[22px]">
          마지막으로 00님의 <br />
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
          @select="chooseFavorite"
          @click="myInterest"
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
