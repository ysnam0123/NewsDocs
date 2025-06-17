<script setup>
import { useInterestStore } from '@/stores/interestStore'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const interestStore = useInterestStore()
const interestList = computed(() => interestStore.interestList)
const router = useRouter()
const route = useRoute()

const allCategory = computed(() => !route.params.categoryName)

const showAllCategory = () => {
  router.push('/news')
}
function goToCategory(category) {
  router.push({ name: 'Category', params: { categoryName: category } })
}
</script>
<template>
  <section class="w-full mt-6">
    <div class="w-full">
      <ul class="flex items-center">
        <li
          class="text-black px-4 py-2 rounded-lg mr-3 cursor-pointer transition duration-300"
          :class="[
            allCategory
              ? 'bg-black text-white  dark:bg-[#7846D2] '
              : 'bg-[#F3F3F3]  dark:bg-[#363636] dark:text-white',
          ]"
          @click="showAllCategory"
        >
          전체
        </li>
        <li
          v-for="category in interestList"
          :key="category.id"
          class="text-black px-4 py-2 rounded-lg mr-3 cursor-pointer transition duration-300"
          :class="[
            route.params.categoryName === category.id
              ? 'bg-black text-white  dark:bg-[#7846D2] '
              : 'bg-[#F3F3F3]  dark:bg-[#363636] dark:text-white',
          ]"
          @click="goToCategory(category.id)"
        >
          {{ category.label }}
        </li>
      </ul>
    </div>
  </section>
</template>
<style scoped></style>
