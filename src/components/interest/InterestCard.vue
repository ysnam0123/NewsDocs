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
    ? 'bg-[#f5f2fa] border border-[#7537e3] hover:bg-[#ede4fd]'
    : 'border border-[#efefef] hover:bg-[#F5F2FA] hover:border-[#EDE8F6]',
)
</script>

<template>
  <div
    :id="id"
    class="cursor-pointer w-[102px] h-[126px] text-[8px] rounded-[8px] flex flex-col items-center justify-center pt-[21px] pb-[16px] px-[32px]"
    :class="cardClass"
    @click="$emit('select', { id, label, icon })"
  >
    <img :src="icon" :alt="id" class="w-[40px] h-[40px] mb-[21px]" />
    <div class="flex flex-col gap-[4px] text-center">
      <h1 class="text-center text-[13px]">{{ label }}</h1>
      <p class="text-[12px] text-[#929292]">{{ id }}</p>
    </div>
  </div>
</template>
