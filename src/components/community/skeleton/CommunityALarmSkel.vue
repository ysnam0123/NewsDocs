<script setup></script>
<template>
  <div
    class="absolute top-[80px] right-[180px] w-[300px] h-[380px] rounded-[12px] shadow-[0_4px_10px_rgba(0,0,0,0.16)] bg-[#FFFFFF] dark:bg-[#343434]"
  >
    <div class="flex items-center w-full ml-[20px] h-[50px] text-[18px] dark:text-[#D7D7D7]">
      알림
    </div>
    <!-- 알림 내용 -->
    <div class="h-[280px] overflow-y-auto relative scrollbar">
      <div v-for="noti in allNoti" :key="noti.noti_id" class="max-h-[300px]">
        <CommunityAlarmBlock :noti="noti" />
      </div>
    </div>
    <div
      class="w-full flex items-center justify-end h-[50px] border-t border-t-gray-200 dark:border-[#4D4D4D]"
    >
      <div class="flex items-center">
        <button
          @click="markAllRead"
          class="flex justify-center items-center w-[60px] h-[25px] cursor-pointer text-[12px] dark:text-[#D7D7D7] hover:text-[#601ED5] dark:hover:text-[#6524D9]"
        >
          모두 읽음
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
