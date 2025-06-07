<script setup>
// import { onMounted, ref } from 'vue'
// import { useRoute } from 'vue-router'
// import supabase from '@/utils/supabase'
import CommunityRecommend from './CommunityRecommend.vue'
import dummy2 from '@/assets/img/news_image/dummy2.png'

// const route = useRoute()
// const newsId = route.params.id
// const news = ref(null)

// onMounted(async () => {
//   const { data, error } = await supabase.from('news_data').select('*').eq('id', newsId).single()

//   if (error) {
//     console.error('뉴스 가져오기 실패', error)
//   } else {
//     news.value = data
//   }
// })
</script>
<template>
  <section class="w-[740px] flex-1 ml-2 my-20 justify-center rounded-xl">
    <div class="text-md text-[#7537E3] font-medium">
      <span># 연예</span>
    </div>
    <h1 class="text-[32px] my-4 text-bold">
      나는 자연인이다...붉은 빛 골짜기에서 찍은 자연인의 사장이 세간의 엄청난 화제로 떠올라 광고
    </h1>
    <span class="mr-2 text-sm text-[#A6A6A6]">2025.06.07</span>
    <span class="text-sm text-[#A6A6A6]">매일경제</span>
    <img :src="dummy2" class="mx-auto w-[680px] h-auto rounded-2xl mb-7.5" />
    <div class="block text-left">
      <button class="cursor-pointer px-4.5 py-3 rounded-lg bg-[#7537E3] text-white mr-2 mb-5">
        요약보기
      </button>
      <span class="bg-[#EFEFEF] py-1.5 pl-4 pr-2.5">뉴스독이 기사를 세 줄로 요약해드려요!</span>
    </div>
    <span class="leading-[29px] text-lg text-left">
      코스닥 시장 육성방안, 기업지배구조 모범규준, 기간산업안정자금 등 경제정책 입안 경험이 풍부해
      가계·소상공인 활력 제고, 공정한 경제구조 실현 등 이 대통령의 공약 이행을 뒷받침할 적임자라고
      대통령실은 설명했다. 강 실장은 "경제정책 전반에 높은 이해력과 국제감각을 가졌다"며 "코로나19
      당시 위기 대응을 담당한 경험을 가진 인사로, 민생 위기 극복을 위한 정책 집행에 적임자"라고
      소개했다. 이 대통령은 기존 경제수석의 명칭을 경제성장수석으로 변경하고 하준경 한양대 경제학부
      교수를 발탁했다. 하 수석은 한국은행 출신으로 실물경제와 이론을 두루 거쳤고, 2019~2021년 대통령
      직속 국민경제자문위원회에서 자문위원으로도 활동했다. 강 실장은 "거시경제와 산업 정책에 해박한
      학자로, 이 대통령의 공약...
    </span>
    <button class="cursor-pointer mb-10 text-gray-400">
      <a href="news.url" target="_blank">원문보기</a>
    </button>
    <CommunityRecommend />
  </section>
  <!-- <section v-else>
    <p>로딩중...</p>
  </section> -->
</template>
