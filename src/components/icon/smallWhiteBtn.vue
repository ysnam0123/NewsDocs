<script setup>
defineProps({
  textColor: {
    type: String,
    default: '#000000',
  },
})
</script>

<template>
  <button
    class="w-[120px] h-[50px] text-center rounded-[8px] text-xl cursor-pointer border-[1px] border-[#C9C9C9] bg-white"
    :style="{ color: textColor }"
  >
    <slot />
  </button>
</template>
