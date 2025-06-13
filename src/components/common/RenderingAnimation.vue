<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import lottie from 'lottie-web'

// Props 정의
const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    default: '500px',
  },
  height: {
    type: String,
    default: '500px',
  },
  loop: {
    type: Boolean,
    default: true,
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  renderer: {
    type: String,
    default: 'svg',
    validator: (value) => ['svg', 'canvas', 'html'].includes(value),
  },
})

const container = ref(null)
let animation = null

onMounted(() => {
  if (container.value) {
    animation = lottie.loadAnimation({
      container: container.value,
      renderer: props.renderer,
      loop: props.loop,
      autoplay: props.autoplay,
      path: props.path,
    })
  } else {
    console.error('Lottie container not found')
  }
})

onUnmounted(() => {
  if (animation) {
    animation.destroy()
  }
})
</script>

<template>
  <div ref="container" :style="{ width, height }"></div>
</template>
