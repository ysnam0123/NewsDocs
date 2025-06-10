<script setup>
import CommunityPost from '@/components/community/CommunityPost.vue'
import ProfileDog from '@/components/icon/profileDog.vue'
import NewsComponent8 from '@/components/NewsComponents/NewsComponent8.vue'
import SleepDog from '@/components/profile/SleepDog.vue'

const userScrapNewsMock = [
  {
    news_id: 'nws001',
    created_at: '2025-06-10T12:00:00Z',
    News_API: {
      title: '자바스크립트는 여전히 인기 1위',
      url: 'https://example.com/news/102',
      published_at: '2025-06-09',
    },
  },
  {
    news_id: 'nws002',
    created_at: '2025-06-08T10:00:00Z',
    News_API: {
      title: 'OpenAI, GPT-5 출시 임박',
      url: 'https://example.com/news/101',
      published_at: '2025-06-07',
    },
  },
  {
    news_id: 'nws003',
    created_at: '2025-06-08T10:00:00Z',
    News_API: {
      title: 'OpenAI, GPT-5 출시 임박',
      url: 'https://example.com/news/101',
      published_at: '2025-06-07',
    },
  },
]

const postMock = [
  {
    post_id: 'post001',
    user_id: 'user001',
    category_id: 'ct1',
    created_at: '2025-06-10T12:00:00Z',
    title: '자바스크립트는 여전히 인기 1위',
    content: '테스트 내용 테스트 내용 테스트 내용 테스트 내용 테스트 내용 테스트 내용 테스트 내용',
    published_at: '2025-06-09',
  },
  {
    post_id: 'post002',
    user_id: 'user002',
    category_id: 'ct1',
    created_at: '2025-06-10T12:00:00Z',
    title: '자바스크립트는 여전히 인기 2위',
    content: '테스트 내용 테스트 내용 테스트 내용 테스트 내용 테스트 내용 테스트 내용 테스트 내용',
    published_at: '2025-06-09',
  },
  {
    post_id: 'post003',
    user_id: 'user003',
    category_id: 'ct1',
    created_at: '2025-06-10T12:00:00Z',
    title: '자바스크립트는 여전히 인기 3위',
    content: '테스트 내용 테스트 내용 테스트 내용 테스트 내용 테스트 내용 테스트 내용 테스트 내용',
    published_at: '2025-06-09',
  },
]
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="max-w-[1200px] mx-auto">
      <div class="flex justify-between">
        <div class="flex space-x-5 mt-5">
          <ProfileDog />
          <div class="flex flex-col justify-center ml-3">
            <div class="text-[24px] font-semibold mb-1 dark:text-white">유저 닉네임</div>
            <div class="flex space-x-2">
              <div class="text-[#8F8F8F] text-sm"># 스포츠</div>
              <div class="text-[#8F8F8F] text-sm"># 사회</div>
              <div class="text-[#8F8F8F] text-sm"># 문화</div>
            </div>
            <div class="mt-3">
              <RouterLink to="/profile/edit">
                <button
                  class="w-[106px] h-[36px] bg-[#F6F6F6] text-center rounded-[8px] text-sm cursor-pointer hover:bg-[#EDEDED] dark:bg-[#363636] dark:text-white dark:hover:bg-[#4A4A4A]"
                >
                  내 정보 수정
                </button>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10 w-[735px]">
        <div class="flex justify-between">
          <div class="text-[20px] font-bold dark:text-white">내가 저장한 뉴스</div>
          <RouterLink to="/profile/news">
            <button class="text-[#191919] text-base cursor-pointer underline dark:text-white">
              더보기
            </button>
          </RouterLink>
        </div>
        <div>
          <SleepDog
            content="아직 저장한 뉴스가 없어요!"
            btnText="뉴스 보러가기"
            v-if="userScrapNewsMock.length === 0"
          />
          <div v-else-if="userScrapNewsMock.length !== 0" class="flex pt-12 space-x-[24px] w-full">
            <NewsComponent8
              v-for="(item, itemIndex) in userScrapNewsMock"
              :key="item + '-' + itemIndex"
              :news="item"
              class="w-[229px]"
            />
          </div>
        </div>
      </div>

      <div class="mt-10 w-[735px]">
        <div class="flex justify-between">
          <div class="text-[20px] font-bold dark:text-white">내가 작성한 글</div>
          <RouterLink to="/profile/write">
            <button class="text-[#191919] text-base cursor-pointer underline dark:text-white">
              더보기
            </button>
          </RouterLink>
        </div>
        <div>
          <SleepDog
            content="아직 작성한 글이 없어요!"
            btnText="글 쓰러가기"
            v-if="postMock.length === 0"
          />
          <div v-else-if="postMock.length !== 0" class="flex flex-col w-[735px]">
            <CommunityPost
              v-for="(item, itemIndex) in postMock"
              :key="item + '-' + itemIndex"
              :post="item"
              class="w-full border-b border-b-gray-200 dark:border-b-gray-500 last:border-b-0"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
