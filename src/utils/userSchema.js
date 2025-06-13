import * as z from 'zod'

//회원가입용 스키마
export const signUpSchema = z
  .object({
    email: z
      .string({ required_error: '이메일을 입력해주세요.' })
      .email('이메일 형식이 올바르지 않습니다.'),

    name: z
      .string({ required_error: '이름을 입력해주세요.' })
      .regex(/^[가-힣]{2,12}$/, '2-12글자 한글로 입력해주세요.'),
    nickname: z
      .string({ required_error: '닉네임을 입력해주세요.' })
      .regex(/^[A-Za-z0-9가-힣]{2,8}$/, '특수문자, 공백 제외 2~8글자로 입력해주세요.')
      .regex(/^(?!^\d+$).+$/, '영문이나 한글을 포함해 주세요.'),

    password: z
      .string({ required_error: '비밀번호를 입력해주세요.' })
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,14}$/,
        '8~14자 영문, 숫자, 특수기호를 포함해주세요.',
      ),

    passwordCheck: z.string({ required_error: '비밀번호 확인을 입력해주세요.' }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordCheck'],
  })

//프로필 정보 변경 스키마(닉네임이랑 비밀번호만 변경 가능)
export const editProfileSchema = z
  .object({
    nickname: z
      .string({ required_error: '닉네임을 입력해주세요.' })
      .regex(/^[A-Za-z0-9가-힣]{2,8}$/, '특수문자, 공백 제외 2~8글자로 입력해주세요.')
      .regex(/^(?!^\d+$).+$/, '영문이나 한글을 포함해 주세요.'),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,14}$/,
        '8~14자 영문, 숫자, 특수기호를 포함해주세요.',
      )
      .optional(),
    passwordCheck: z.string().optional(),
  })
  .refine((data) => !data.password || data.password === data.passwordCheck, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordCheck'],
  })
