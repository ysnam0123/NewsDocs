import Typed from 'typed.js'
import { ref, nextTick } from 'vue'

export const useTyping = () => {
  const typedTarget = ref(null)
  let typedInstance = null
  const runTyped = async (text) => {
    console.log('nextTick 전:', typedTarget.value)
    await nextTick()

    console.log('nextTick 후:', typedTarget.value)
    if (typedTarget.value) {
      if (typedInstance) {
        typedInstance.destroy()
      }
      typedTarget.value.innerText = ''
      typedInstance = new Typed(typedTarget.value, {
        strings: [text],
        typeSpeed: 20,
        showCursor: false,
      })
    } else {
      console.warn('!!typedTarget is null!!')
    }
  }

  return {
    typedTarget,
    runTyped,
  }
}
