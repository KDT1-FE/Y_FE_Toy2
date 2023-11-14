export const validateUser = (user) => {
  const newErrors: {
    id?: string;
    password?: string;
    assurer?: string;
    name?: string;
  } = {};

  if (!user.id) {
    newErrors.id = '아이디를 입력해주세요.';
  } else if (!/^[a-zA-Z0-9]+$/.test(user.id)) {
    newErrors.id = '아이디는 영문과 숫자 조합으로 입력해주세요.';
  }
  if (!user.password) {
    newErrors.password = '비밀번호를 입력해주세요.';
  } else if (user.password.length < 5) {
    newErrors.password = '비밀번호는 5글자 이상 입력해주세요.';
  }
  if (!user.assurer) {
    newErrors.assurer = '비밀번호를 확인해주세요.';
  } else if (user.assurer.length < 5 || user.password !== user.assurer) {
    newErrors.assurer = '비밀번호를 다시 확인해주세요.';
  }
  if (!user.name) {
    newErrors.name = '닉네임을 입력해주세요.';
  } else if (user.name.length > 20) {
    newErrors.name = '닉네임은 20글자 이하로 입력해주세요.';
  }

  return newErrors;
};
