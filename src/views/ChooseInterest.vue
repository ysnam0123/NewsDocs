<script setup>
import { useInterestStore } from '@/stores/interestStore'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const store = useInterestStore()

const addInterest = (e) => {
  const interest = e.target.innerText
  if (store.interest.includes(interest)) {
    store.interest = store.interest.filter((item) => item != interest)
    console.log(`${interest}가 삭제됨!`)
  } else {
    store.interest.push(interest)
    console.log(`${interest}가 추가됨!`)
  }
  console.log(store.interest)
}

const router = useRouter()
const chooseFavorite = () => {
  router.push('/choosefavorite')
}
const pageMounted = ref(false)
onMounted(() => {
  setTimeout(() => {
    pageMounted.value = true
  }, 300)
})
</script>
<template>
  <transition name="fade">
    <div v-if="pageMounted" class="w-[50%] m-auto mt-[5%]">
      <div class="flex items-center gap-[50px] mb-[130px]">
        <img src="../assets/icons/newspaperDog.svg" alt="newsPaperDog" class="w-[120px]" />
        <h1 class="text-[30px] font-bold">
          당신의 <span class="text-[#7537E3]">관심사</span>를 선택해주세요 (최소 3개)
        </h1>
      </div>
      <div>
        <div class="interestRow">
          <div
            class="interest"
            :class="{ clicked: store.interest.includes('정치') }"
            @click="addInterest"
          >
            정치
          </div>
          <div
            class="interest"
            :class="{ clicked: store.interest.includes('스포츠') }"
            @click="addInterest"
          >
            스포츠
          </div>
          <div
            class="interest"
            :class="{ clicked: store.interest.includes('연예') }"
            @click="addInterest"
          >
            연예
          </div>
          <div
            class="interest"
            :class="{ clicked: store.interest.includes('문화') }"
            @click="addInterest"
          >
            문화
          </div>
        </div>
        <div class="interestRow">
          <div
            class="interest"
            :class="{ clicked: store.interest.includes('해외') }"
            @click="addInterest"
          >
            해외
          </div>
          <div
            class="interest"
            :class="{ clicked: store.interest.includes('사회') }"
            @click="addInterest"
          >
            사회
          </div>
          <div
            class="interest"
            :class="{ clicked: store.interest.includes('경제') }"
            @click="addInterest"
          >
            경제
          </div>
          <div
            class="interest"
            :class="{ clicked: store.interest.includes('그 외') }"
            @click="addInterest"
          >
            그 외
          </div>
        </div>
      </div>
      <transition name="fade">
        <button
          v-if="store.interest.length >= 3"
          class="flex items-center justify-center w-[150px] h-[55px] text-xl font-bold mt-[200px] ml-auto border-2 border-[black] rounded-2xl hover:text-[#7537E3] cursor-pointer ease-in-out duration-200 hover:scale-[1.025]"
          @click="chooseFavorite"
        >
          다음
        </button>
      </transition>
    </div>
  </transition>
</template>
<style scoped>
.interest {
  width: 186px;
  background-color: #f8f4ff;
  /* color: #727070; */
  font-size: 30px;
  text-align: center;
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.interest:hover {
  background-color: #e3daf4;
}
.interestRow {
  display: flex;
  gap: 70px;
  margin-bottom: 75px;
}
.clicked {
  background-color: #7537e3;
  color: white;
  font-weight: 700;
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
