<script setup></script>
<template>
  <div class="flex items-center gap-[24px] w-full h-[237px] group cursor-pointer">
    <!-- 이미지 -->
    <img
      src="../../assets/img/communityPostImg.svg"
      class="w-[232px] h-[171px] rounded-[12px] bg-gray-300 group-hover:opacity-80 transition-all duration-300"
    />
    <div class="flex flex-col flex-grow">
      <!-- 게시글 내용 -->
      <div class="flex flex-col justify-center w-full h-[172px]">
        <!-- 작성자&태그 -->
        <div class="w-full h-10 flex items-center justify-between">
          <!-- 작성자 -->
          <div class="flex gap-[9.5px] items-center">
            <div class="w-10 h-10 rounded-full bg-gray-300"></div>
            <div class="text-[16px]">userName</div>
          </div>
          <!-- 태그 -->
          <p class="flex items-center text-[16px] text-[#7537E3]">#스포츠</p>
        </div>
        <!-- 내용 -->
        <div class="mt-5">
          <div
            class="text-xl group-hover:text-[#515151] text-[#191919] transition-all duration-300"
          >
            제목입니당
          </div>
          <div
            class="mt-[6px] text-[14px] group-hover:text-[#515151] text-[#191919] transition-all duration-300"
          >
            내용내용내용내용.내용내용내용내용내용내용내용내용내용내용내,
          </div>
        </div>

        <!-- 좋아요,댓글 -->
        <div class="flex items-center w-auto mt-auto h-[18px]">
          <img src="../../assets/img/Thumbs-up.svg" alt="좋아요" class="w-4 h-4 text-[#B7B7B7]" />
          <div class="text-[#B7B7B7] ml-[3px] text-[13px]">32</div>

          <img src="../../assets/img/Chat.svg" class="w-4 h-4 ml-[11px] text-[#B7B7B7]" />
          <div class="text-[#B7B7B7] ml-[3px] text-[13px]">124</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
