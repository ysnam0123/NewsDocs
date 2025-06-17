<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: String,
  icon: String,
  label: String,
  isSelected: Boolean,
})

const cardClass = computed(() =>
  props.isSelected
    ? 'bg-[#f5f2fa] border dark:border-[#7846D2]  border-[#7537e3]  dark:hover:border-[#7846D2] dark:bg-[#2D2837] hover:bg-[#ede4fd] dark:hover:borer-[#7846D2] dark:hover:bg-[#3A3247]'
    : 'border border-[#efefef] dark:border-[#6F6F6F] hover:bg-[#F5F2FA] dark:hover:border-[#7846D2] dark:hover:bg-[#3A3247] hover:border-[#EDE8F6]',
)
</script>

<template>
  <div
    :id="id"
    class="cursor-pointer w-[122px] h-[146px] text-[8px] rounded-[8px] flex flex-col items-center justify-center pt-[21px] pb-[16px] px-[32px] select-none"
    :class="cardClass"
    @click="$emit('select', { id, label, icon })"
  >
    <img :src="icon" :alt="id" class="w-[40px] h-[40px] mb-[21px]" />
    <div class="flex flex-col gap-[4px] text-center">
      <h1 class="text-center dark:text-[white] text-[15px]">{{ label }}</h1>
      <p class="text-[14px] dark:text-[#6F6F6F] text-[#929292]">{{ id }}</p>
    </div>
  </div>
</template>
