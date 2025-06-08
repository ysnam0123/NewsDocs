<script setup>
import { useInterestStore } from '@/stores/interestStore'
import { onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'

const store = useInterestStore()

const pageMounted = ref(false)
onMounted(() => {
  setTimeout(() => {
    pageMounted.value = true
  }, 500)
})

const addFavorite = (e) => {
  const selectedCard = e.target.innerText
  if (store.favoriteInterest === '') {
    store.favoriteInterest = selectedCard
    console.log(store.favoriteInterest)
  } else if (store.favoriteInterest === selectedCard) {
    store.favoriteInterest = ''
    console.log('선택 취소됨!')
  } else {
    toast.error('하나만 선택해주세요!', {
      toastClassName: 'interestToastWrapper',
      bodyClassName: 'interestToast',
    })
    return
  }
}
</script>
<template>
  <transition name="fade">
    <div v-if="pageMounted" class="w-[50%] mt-[5%] m-auto">
      <div class="flex items-center gap-[50px] mb-[130px]">
        <img src="../assets/icons/newspaperDog.svg" alt="newsPaperDog" class="w-[120px]" />
        <h1 class="text-[30px] font-bold">
          당신의 <span class="text-[#7537E3]">최대 관심사</span>를 선택해주세요
        </h1>
      </div>
      <div class="flex flex-wrap gap-[15px] justify-center">
        <div
          v-for="item in store.interest"
          :key="item"
          @click="addFavorite"
          :class="{ selected: store.favoriteInterest === item }"
          class="selectedInterest w-[200px] h-[200px] flex items-center justify-center bg-[#7537e3] rounded-2xl text-white text-[25px] font-bold"
        >
          {{ item }}
        </div>
      </div>
      <transition name="fade">
        <button
          v-if="store.favoriteInterest"
          class="flex items-center justify-center w-[210px] h-[60px] text-xl font-bold mt-[200px] ml-auto border-2 border-[black] rounded-2xl hover:text-[#7537E3] cursor-pointer ease-in-out duration-200 hover:scale-[1.025]"
        >
          newsDocs 시작하기
        </button>
      </transition>
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
