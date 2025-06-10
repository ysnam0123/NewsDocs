<script setup>
import HotDocsComponent from '@/components/NewsComponents/HotDocsComponent.vue'
import NewsComponent10 from '@/components/NewsComponents/NewsComponent10.vue'
import NewsComponent2 from '@/components/NewsComponents/NewsComponent2.vue'
import NewsComponent5 from '@/components/NewsComponents/NewsComponent5.vue'
import NewsComponent6 from '@/components/NewsComponents/NewsComponent6.vue'
import NewsComponent7 from '@/components/NewsComponents/NewsComponent7.vue'
import NewsComponent8 from '@/components/NewsComponents/NewsComponent8.vue'
import NewsComponent9 from '@/components/NewsComponents/NewsComponent9.vue'
import NewsComponentCommunity from '@/components/NewsComponents/NewsComponentCommunity.vue'
import SlideNewsComponent from '@/components/NewsComponents/SlideNewsComponent.vue'

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
<template>
  <div class="mx-auto max-w-[1240px] pt-[50px]">
    <!-- 섹션 1: 스포츠 -->
    <div class="section1 mb-[44px]">
      <!-- 제목 -->
      <div class="select-none flex items-center gap-[20px] font-semibold mb-[30px]">
        <h1 class="flex gap-[10px] items-center">
          <img src="../assets/icons/sportsIcon.svg" alt="politics" />
          <p class="text-[30px] text-[var(--text-title)] font-bold">스포츠</p>
        </h1>
        <div class="flex">
          <h2 class="text-[var(--text-sub-purple)] text-[16px]">내가 가장 관심있는</h2>
        </div>
        <div class="ml-auto cursor-pointer">
          <h3 class="text-[16px] text-[var(--show-more)] underline font-medium select-none">
            더보기
          </h3>
        </div>
      </div>
      <div class="flex gap-[40px] mb-[50px]">
        <div class="flex gap-[20px]">
          <NewsComponent8 />
          <NewsComponent8 />
        </div>
        <div class="flex flex-col gap-[24px]">
          <NewsComponent2 />
          <NewsComponent2 />
          <NewsComponent2 />
        </div>
      </div>

      <div class="flex justify-between ]">
        <NewsComponent9 />
        <NewsComponent9 />
        <NewsComponent9 />
        <NewsComponent9 />
      </div>
    </div>
    <!-- 섹션 2 : 커뮤니티로 접근 -->
    <div
      class="rounded-[24px] bg-[var(--section-contents-bg)] w-[1240px] h-[510px] px-[60px] py-[53px] mb-[60px]"
    >
      <h1 class="text-[30px] text-[var(--text-title)] font-bold mb-[32px] select-none">
        나의 관심사에 대해 사람들과 이야기해보세요!
      </h1>
      <div class="flex flex-row justify-between gap-[24px]">
        <NewsComponentCommunity />
        <NewsComponentCommunity />
        <NewsComponentCommunity />
      </div>
      <button
        class="select-none mx-auto mt-[42px] flex rounded-[8px] justify-center items-center w-[194px] h-[50px] text-white font-bold text-[16px] bg-[#7537E3] cursor-pointer hover:bg-[#b394e7] active:scale-[0.98]"
      >
        글쓰러 가기
      </button>
    </div>
    <!-- 섹션 3 : 슬라이드 카드뉴스 -->
    <div class="h-[524px]">
      <!-- 제목 -->
      <div class="select-none flex items-center gap-[20px] font-semibold mb-[30px]">
        <h1 class="flex gap-[10px] items-center">
          <img src="../assets/icons/politicsIcon.svg" alt="politics" />
          <p class="text-[30px] text-[var(--text-title)] font-bold">정치</p>
        </h1>
        <div class="flex">
          <h2 class="text-[var(--text-sub-purple)] text-[16px]">나의 관심사</h2>
        </div>
        <div class="ml-auto cursor-pointer">
          <h3 class="text-[16px] text-[var(--show-more)] underline font-medium select-none">
            더보기
          </h3>
        </div>
      </div>
      <div class="flex gap-[24px] overflow-x-scroll">
        <!-- 슬라이드 아직 구현 안함 -->
        <SlideNewsComponent />
        <SlideNewsComponent />
        <SlideNewsComponent />
        <SlideNewsComponent />
      </div>
    </div>
    <!-- 섹션 4,5 연예, 핫독스 -->
    <div class="flex gap-[72px] mb-[50px]">
      <!-- 섹션 4 : 연예 -->
      <div class="w-[608px]">
        <!-- 제목 -->
        <div class="select-none flex items-center gap-[20px] font-semibold mb-[30px]">
          <h1 class="flex gap-[10px] items-center">
            <img src="" alt="politics" />
            <p class="text-[30px] text-[var(--text-title)] font-bold">연예</p>
          </h1>
          <div class="flex">
            <h2 class="text-[var(--text-sub-purple)] text-[16px]">나의 관심사</h2>
          </div>
          <div class="ml-auto cursor-pointer">
            <h3 class="text-[16px] text-[var(--show-more)] underline font-medium select-none">
              더보기
            </h3>
          </div>
        </div>
        <div class="flex flex-wrap gap-[24px] h-[792px]">
          <NewsComponent10 />
          <NewsComponent10 />
          <NewsComponent10 />
          <NewsComponent10 />
        </div>
      </div>

      <!-- 섹션 5 : 오늘의 핫 독스 -->
      <div class="w-[560px]">
        <!-- 제목 -->
        <div class="select-none flex items-center gap-[20px] font-semibold mb-[30px]">
          <h1 class="flex gap-[10px] items-center">
            <img src="../assets/icons/hotDocsIcon.svg" alt="hotDocs" />
            <p class="text-[30px] text-[var(--text-title)] font-bold">오늘의 핫 독스</p>
          </h1>
          <div class="flex">
            <h2 class="text-[var(--text-sub-purple)] text-[16px]">세상은 지금</h2>
          </div>
        </div>
        <HotDocsComponent />
      </div>
    </div>
    <!-- 섹션 6, 7 -->
    <div class="flex gap-[40px] mb-[50px]">
      <!-- 섹션 6: 경제 -->
      <div class="w-[600px]">
        <!-- 제목 -->
        <div class="select-none flex items-center gap-[20px] font-semibold mb-[30px]">
          <h1 class="flex gap-[10px] items-center">
            <img src="../assets/icons/economyIcon.svg" alt="economy" />
            <p class="text-[30px] text-[var(--text-title)] font-bold">경제</p>
          </h1>
          <div class="flex">
            <h2 class="text-[var(--text-sub-purple)] text-[16px]">나의 관심사</h2>
          </div>
          <div class="ml-auto cursor-pointer">
            <h3 class="text-[16px] text-[var(--show-more)] underline font-medium select-none">
              더보기
            </h3>
          </div>
        </div>
        <div class="flex flex-col gap-[15px]">
          <NewsComponent5 />
          <NewsComponent5 />
        </div>
      </div>
      <!-- 섹션 7 : 문화 -->
      <div class="w-[600px]">
        <!-- 제목 -->
        <div class="select-none flex items-center gap-[20px] font-semibold mb-[30px]">
          <h1 class="flex gap-[10px] items-center">
            <img src="../assets/icons/cultureIcon.svg" alt="economy" />
            <p class="text-[30px] text-[var(--text-title)] font-bold">문화</p>
          </h1>
          <div class="flex">
            <h2 class="text-[var(--text-sub-purple)] text-[16px]">나의 관심사</h2>
          </div>
          <div class="ml-auto cursor-pointer">
            <h3 class="text-[16px] text-[var(--show-more)] underline font-medium select-none">
              더보기
            </h3>
          </div>
        </div>
        <div class="flex flex-col gap-[15px]">
          <NewsComponent6 />
          <NewsComponent6 />
        </div>
      </div>
    </div>
    <!-- 섹션 8: 해외 -->
    <div class="w-[600px]">
      <!-- 제목 -->
      <div class="select-none flex items-center gap-[20px] font-semibold mb-[30px]">
        <h1 class="flex gap-[10px] items-center">
          <img src="../assets/icons/worldIcon.svg" alt="world" />
          <p class="text-[30px] text-[var(--text-title)] font-bold">해외</p>
        </h1>
        <div class="flex">
          <h2 class="text-[var(--text-sub-purple)] text-[16px]">나의 관심사</h2>
        </div>
        <div class="ml-auto cursor-pointer">
          <h3 class="text-[16px] text-[var(--show-more)] underline font-medium select-none">
            더보기
          </h3>
        </div>
      </div>
      <div class="flex flex-col gap-[15px]">
        <NewsComponent7 />
        <NewsComponent7 />
      </div>
    </div>

    <!-- 탑으로 이동 버튼 -->
    <div>
      <img
        src="@/assets/icons/moveToTop.svg"
        alt="move to top Button"
        class="cursor-pointer fixed bottom-0 right-[30px]"
        @click="scrollToTop"
      />
    </div>
  </div>
  <br />
  <br />
  <br />
</template>
<style scoped></style>
