<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const moreViewHandler = (post) => {
  router.push(`/community/${post.id}`)
}
</script>
<template>
  <div>
    <div class="flex mb-10 justify-between">
      <h2 class="text-xl font-bold justify-between">
        <span class="text-[#7537E3]">'스포츠' </span>에 대한 다른 유저의 생각
      </h2>
      <button
        class="text-sm cursor-pointer mt-0.5 underline underline-offset-2"
        @click="moreViewHandler"
      >
        더보기
      </button>
    </div>
    <!-- v-for="post in posts" :key="post.id" -->
    <div class="border-1 border-gray-200 rounded-2xl pt-5 mb-4">
      <div class="h-26">
        <div class="block mt-1 ml-4">
          <p class="text-lg text-gray-600 text-left">안녕하세여</p>
          <p class="mt-5 text-left">여러분 투표는 누구에게 하셨나여????????? 아무튼 화이팅</p>
        </div>
        <hr class="text-gray-300 mt-4" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
