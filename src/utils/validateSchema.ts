import * as yup from 'yup';
import { publicApi } from '../libs/axios';

const validationSchema = yup.object({
  id: yup
    .string()
    .matches(/^[a-zA-Z0-9]*$/, '영문 + 숫자로만 가능합니다.')
    .required('아이디는 필수 입니다.')
    .test('checkIdUnique', '이미 등록된 아이디 입니다.', (value) => {
      if (/^[a-zA-Z0-9]*$/.test(value) === false) {
        return false;
      }

      return publicApi.post('check/id', { id: value }).then(async (res) => {
        const isDuplicated = await res.data.isDuplicated;
        return !isDuplicated;
      });
    }),
  password: yup
    .string()
    .min(5, '비밀번호는 최소 5자 이상으로 입력해주세요')
    .required('비밀번호는 필수 입니다.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호는 필수 입니다.'),
});

export const validationSchema2 = yup.object({
  name: yup
    .string()
    .max(20, '이름은 최대 20자 까지 가능합니다.')
    .required('이름은 필수 입니다.'),
});

export const newChatValidationSchema = yup.object({
  name: yup.string().required('채팅방 이름을 입력해주세요'),
  isPrivate: yup.boolean(),
});

export default validationSchema;
