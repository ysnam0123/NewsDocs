<script setup>
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { Dices } from 'lucide-vue-next'

const props = defineProps({
  schema: { type: Object, required: true },
  initialValues: { type: Object, default: () => ({}) },
  showEmail: { type: Boolean, default: true },
  showName: { type: Boolean, default: true },
  showSignupBtn: { type: Boolean, default: true },
  showPasswordFields: { type: Boolean, default: true },
  onCheckEmail: { type: Function, default: null },
  onCheckNickname: { type: Function, default: null },
  isEmailAvailable: { type: Boolean, default: false },
  isNicknameAvailable: { type: Boolean, default: false },
})

const { handleSubmit, errors, defineField, values, setFieldError } = useForm({
  validationSchema: toTypedSchema(props.schema),
  initialValues: props.initialValues,
})

const [email, emailAttrs] = defineField('email')
const [name, nameAttrs] = defineField('name')
const [nickname, nicknameAttrs] = defineField('nickname')
const [password, passwordAttrs] = defineField('password')
const [passwordCheck, passwordCheckAttrs] = defineField('passwordCheck')

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})

const emit = defineEmits(['submit'])

const adjectives = [
  '소심한',
  '용감한',
  '행복한',
  '귀여운',
  '느긋한',
  '활발한',
  '신중한',
  '엉뚱한',
  '영리한',
  '온순한',
  '겁많은',
  '재빠른',
  '낙천적',
  '정직한',
  '상냥한',
  '단호한',
  '유쾌한',
  '침착한',
  '털털한',
  '순수한',
  '깜찍한',
  '차가운',
  '따뜻한',
  '튼튼한',
  '은은한',
  '화려한',
  '날렵한',
  '기특한',
  '재미난',
  '똑똑한',
  '친절한',
  '명랑한',
  '조용한',
  '느린',
  '용맹한',
  '섬세한',
  '솔직한',
  '명석한',
  '부드러운',
  '차분한',
  '긍정적인',
  '활기찬',
  '조심스러운',
  '자상한',
  '담대한',
  '낙천적인',
  '사나운',
  '현명한',
  '감성적인',
  '열정적인',
]

const animals = [
  '사자',
  '호랑이',
  '토끼',
  '여우',
  '강아지',
  '고양이',
  '거북이',
  '하마',
  '고래',
  '수달',
  '펭귄',
  '코끼리',
  '늑대',
  '두더지',
  '다람쥐',
  '곰',
  '부엉이',
  '치타',
  '올빼미',
  '캥거루',
  '낙타',
  '족제비',
  '돼지',
  '말',
  '염소',
  '닭',
  '사슴',
  '판다',
  '너구리',
  '청설모',
  '원숭이',
  '다람쥐',
  '버팔로',
  '얼룩말',
  '물개',
  '바다사자',
  '코뿔소',
  '코알라',
  '악어',
  '뱀',
  '도마뱀',
  '비버',
  '오리',
  '까치',
  '학',
  '독수리',
  '소',
  '쿼카',
  '해달',
  '햄스터',
]

function generateRandomNickname() {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const animal = animals[Math.floor(Math.random() * animals.length)]
  return `${adjective}${animal}`
}

//컴포넌트에 마운트될 때 초기화
defineExpose({ errors, values, setFieldError })
</script>

<template>
  <form @submit.prevent="onSubmit" id="edit-form" class="flex flex-col items-center w-full">
    <div v-if="showEmail" class="mb-5 w-full flex flex-col items-center">
      <label
        class="block text-[14px] font-semibold mb-2 w-[364px] text-left text-[#191919] dark:text-white"
        >이메일</label
      >
      <div class="relative flex flex-col">
        <div class="flex items-center relative">
          <input
            type="email"
            v-model="email"
            v-bind="emailAttrs"
            placeholder="이메일 입력"
            required
            :class="[
              'w-[364px] h-[50px] text-[16px] border rounded-[8px] px-3 py-2 focus:outline-none dark:text-white',
              errors.email
                ? 'border-[#F34040]'
                : isEmailAvailable
                  ? 'border-[#00D62B]'
                  : 'border-[#DFDFDF] dark:border-[#4D4D4D]',
            ]"
          />
          <button
            v-if="onCheckEmail"
            type="button"
            @click="onCheckEmail"
            class="w-[51px] h-[28px] text-[#7537e3] text-[13px] rounded-[6px] border font-medium border-[#7537e3] absolute top-1/2 -translate-y-1/2 right-[10px] cursor-pointer dark:text-[#B185FF] dark:border-[#B185FF] dark:hover:border-[#6524D9] dark:hover:bg-[#6524D9] hover:dark:text-white transition-all duration-300"
          >
            확인
          </button>
        </div>
        <p v-if="errors.email" class="text-[#F34040] text-[11px] mt-[6px] ml-1 leading-[1.5]">
          {{ errors.email }}
        </p>
        <p
          v-else-if="isEmailAvailable"
          class="text-[#00D62B] text-[11px] mt-[6px] ml-1 leading-[1.5]"
        >
          사용 가능한 이메일입니다.
        </p>
      </div>
    </div>
    <div v-if="showName" class="mb-5 w-full flex flex-col items-center">
      <label
        class="block text-[14px] font-semibold mb-2 w-[364px] text-left text-[#191919] dark:text-white"
        >이름</label
      >
      <div class="relative flex flex-col">
        <input
          type="text"
          v-model="name"
          v-bind="nameAttrs"
          placeholder="이름 입력"
          required
          :class="[
            'w-[364px] h-[50px] text-[16px] border rounded-[8px] px-3 py-2 focus:outline-none dark:text-white',
            errors.name ? 'border-[#F34040]' : 'border-[#DFDFDF] dark:border-[#4D4D4D]',
          ]"
        />
        <p v-if="errors.name" class="text-[#F34040] text-[11px] mt-[6px] ml-1 leading-[1.5]">
          {{ errors.name }}
        </p>
      </div>
    </div>
    <div class="mb-5 w-full flex flex-col items-center">
      <label
        class="block text-[14px] font-semibold mb-2 w-[364px] text-left text-[#191919] dark:text-white"
        >닉네임</label
      >
      <div class="relative flex flex-col">
        <div class="flex items-center relative">
          <button
            type="button"
            class="absolute left-[-35px]"
            @click="nickname = generateRandomNickname()"
          >
            <Dices class="cursor-pointer dark:text-white" />
          </button>
          <input
            type="text"
            v-model="nickname"
            v-bind="nicknameAttrs"
            placeholder="특수문자, 공백 제외 2-8글자"
            required
            :class="[
              'w-[364px] h-[50px] text-[16px] border rounded-[8px] px-3 py-2 focus:outline-none dark:text-white',
              errors.nickname
                ? 'border-[#F34040]'
                : isNicknameAvailable
                  ? 'border-[#00D62B]'
                  : 'border-[#DFDFDF] dark:border-[#4D4D4D]',
            ]"
          />
          <button
            v-if="onCheckNickname"
            type="button"
            @click="onCheckNickname"
            class="w-[51px] h-[28px] text-[#7537e3] text-[13px] rounded-[6px] border font-medium border-[#7537e3] absolute top-1/2 -translate-y-1/2 right-[10px] cursor-pointer dark:text-[#B185FF] dark:border-[#B185FF] dark:hover:border-[#6524D9] dark:hover:bg-[#6524D9] hover:dark:text-white transition-all duration-300"
          >
            확인
          </button>
        </div>
        <p v-if="errors.nickname" class="text-[#F34040] text-[11px] mt-[6px] ml-1 leading-[1.5]">
          {{ errors.nickname }}
        </p>
        <p
          v-else-if="isNicknameAvailable"
          class="text-[#00D62B] text-[11px] mt-[6px] ml-1 leading-[1.5]"
        >
          사용 가능한 닉네임입니다.
        </p>
      </div>
    </div>
    <div v-if="showPasswordFields" class="mb-5 w-full flex flex-col items-center">
      <label
        class="block text-[14px] font-semibold mb-2 w-[364px] text-left text-[#191919] dark:text-white"
        >비밀번호</label
      >
      <div class="relative flex flex-col">
        <input
          type="password"
          v-model="password"
          v-bind="passwordAttrs"
          placeholder="비밀번호 입력"
          :required="!!password"
          :class="[
            'w-[364px] h-[50px] text-[16px] border rounded-[8px] px-3 py-2 focus:outline-none dark:text-white',
            errors.password ? 'border-[#F34040]' : 'border-[#DFDFDF] dark:border-[#4D4D4D]',
          ]"
        />
        <p v-if="errors.password" class="text-[#F34040] text-[11px] mt-[6px] ml-1 leading-[1.5]">
          {{ errors.password }}
        </p>
      </div>
    </div>
    <div v-if="showPasswordFields" class="mb-5 w-full flex flex-col items-center">
      <label
        class="block text-[14px] font-semibold mb-2 w-[364px] text-left text-[#191919] dark:text-white"
        >비밀번호 확인</label
      >
      <div class="relative flex flex-col">
        <input
          type="password"
          v-model="passwordCheck"
          v-bind="passwordCheckAttrs"
          placeholder="비밀번호 확인"
          :required="!!password"
          :class="[
            'w-[364px] h-[50px] text-[16px] border rounded-[8px] px-3 py-2 focus:outline-none dark:text-white',
            errors.passwordCheck ? 'border-[#F34040]' : 'border-[#DFDFDF] dark:border-[#4D4D4D]',
          ]"
        />
        <p
          v-if="errors.passwordCheck"
          class="text-[#F34040] text-[11px] mt-[6px] ml-1 leading-[1.5]"
        >
          {{ errors.passwordCheck }}
        </p>
      </div>
    </div>
    <button
      v-if="showSignupBtn"
      type="submit"
      :disabled="$attrs.disabled"
      class="w-[360px] h-[50px] bg-[#7537e3] text-white text-[16px] font-semibold rounded-[8px] mt-[10px] mx-[40px] hover:bg-[#601ED5] cursor-pointer transition-colors duration-300 disabled:bg-[#F2F2F2] disabled:text-[#B3B3B3] dark:disabled:bg-[#363636] disabled:cursor-not-allowed"
    >
      <slot name="submit">회원가입</slot>
    </button>
  </form>
</template>
