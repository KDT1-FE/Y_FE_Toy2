import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import styles from './signUp.module.scss';

interface RequestBody {
  id: string; // 사용자 아이디 (필수!, 영어와 숫자만)
  password: string; // 사용자 비밀번호, 5자 이상 (필수!)
  name: string; // 사용자 이름, 20자 이하 (필수!)
  picture?: string; // 사용자 이미지(url or base64, under 1MB)
}

interface FormTypes extends RequestBody {
  passwordConfirm: string;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypes>({ mode: 'onBlur' });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const handleTerms = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeToTerms(e.target.checked);
  };

  const handleModal = () => {
    setIsModal(!isModal);
  };

  const onValid = (data: FormTypes) => {
    handleModal();
    console.log('유효한 입력이다.', data);
  };

  const onInValid = () => {
    console.log('유효하지 않는 입력이다.');
  };

  return (
    <div className={styles.signUp_container}>
      <div className={styles.signUp_box}>
        <Image
          src="/images/logo.png"
          alt="talkhaja_logo"
          width={200}
          height={80}
        />
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit(onValid, onInValid)}>
          <div className={styles.input_box}>
            <label htmlFor="name">이름</label>
            <input
              {...register('name', {
                required: '이름을 입력하세요.',
                minLength: {
                  value: 2,
                  message: '2자 이상 입력해주세요',
                },
                maxLength: { value: 20, message: '20자 이하로 입력해주세요.' },
              })}
              id="name"
              type="text"
              placeholder="20자 이하로 입력해주세요"
            />
            <span>{errors.name?.message}</span>

            <label htmlFor="id">아이디</label>
            <input
              {...register('id', {
                required: '아이디를 입력하세요.',
                minLength: { value: 5, message: '5자 이상 입력해주세요.' },
                maxLength: { value: 20, message: '20자 이하로 입력해주세요.' },
              })}
              id="id"
              type="text"
              placeholder="영어와 숫자만 입력해주세요"
            />
            <span>{errors.id?.message}</span>
            <label htmlFor="password">비밀번호</label>
            <input
              {...register('password', {
                required: '비밀번호를 입력하세요.',
                minLength: { value: 5, message: '5자 이상 입력해주세요.' },
              })}
              id="password"
              type="password"
              placeholder="5자 이상 입력해주세요"
            />
            <span>{errors.password?.message}</span>
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <input
              {...register('passwordConfirm', {
                required: '비밀번호를 재확인하세요.',
              })}
              id="passwordConfirm"
              type="password"
              placeholder="비밀번호를 한번 더 입력해주세요"
            />
            <span>{errors.passwordConfirm?.message}</span>
          </div>
          <div className={styles.terms_agree}>
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={handleTerms}
            />
            <p>톡하자 이용 약관 및 개인 정보 처리 방침에 동의합니다.</p>
          </div>
          <div className={styles.button_box}>
            <button type="submit">가입하기</button>
            <button type="button">뒤로가기</button>
          </div>
        </form>
      </div>
    </div>
  );
}
