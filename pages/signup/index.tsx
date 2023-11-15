import instance from '@/apis/axios';
import SignUpModal from '@/components/signup/SignUpModal';
import app from '@/utils/firebaseConfig';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import styles from './signUp.module.scss';

interface RequestBody {
  id: string; // 사용자 아이디 (필수!, 영어와 숫자만)
  password: string; // 사용자 비밀번호, 5자 이상 (필수!)
  name: string; // 사용자 이름, 20자 이하 (필수!)
}

interface FormTypes extends RequestBody {
  passwordConfirm: string;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setError,
    getValues,
  } = useForm<FormTypes>({ mode: 'onChange' });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [portalElement, setPotalElement] = useState<Element | null>(null);
  const [formData, setFormData] = useState<RequestBody>({
    id: '',
    password: '',
    name: '',
  });
  const [defaultImgUrl, setDefaultImgUrl] = useState<string | null>(null);
  const [checkId, setCheckId] = useState(false);
  const [checkIdMessage, setCheckIdMessage] = useState('');
  const storage = getStorage(app);

  const getDefaultImageUrl = async () => {
    const defaultImageRef = ref(storage, 'images/default.jpg');
    await getDownloadURL(defaultImageRef).then(url => {
      return setDefaultImgUrl(url);
    });
  };

  const checkDuplicateId = async (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.preventDefault();
    const isValid = await trigger('id');
    if (!isValid) {
      return;
    }
    try {
      const response = await instance.post('/check/id', { id });
      if (response.data.isDuplicated) {
        setCheckId(false);
        setError(
          'id',
          { message: '이미 등록된 아이디입니다.' },
          { shouldFocus: true },
        );
      } else {
        setCheckId(true);
        setCheckIdMessage('사용가능한 아이디입니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDefaultImageUrl();
  }, []);

  useEffect(() => {
    setPotalElement(document.getElementById('modal-root'));
  }, [isModal]);

  const handleTerms = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeToTerms(e.target.checked);
  };

  const handleModal = () => {
    setIsModal(!isModal);
  };

  const onValid: SubmitHandler<FormTypes> = (data, e) => {
    e?.preventDefault();
    const { id, password, name, passwordConfirm } = data;
    if (agreeToTerms && password === passwordConfirm && checkId) {
      setFormData(prev => ({
        ...prev,
        id,
        password,
        name,
      }));
      handleModal();
    }
  };

  const onInValid = () => {
    console.log('유효하지 않는 입력이다.');
  };

  return (
    <>
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
                  pattern: {
                    value: /^[가-힣a-zA-Z]{2,20}$/,
                    message:
                      '2자 이상 20자 이하의 한글 또는 영어만 입력해주세요.',
                  },
                })}
                id="name"
                type="text"
                placeholder="2자 이상 20자 이하로 입력해주세요"
              />
              <span>{errors.name?.message}</span>
              <label htmlFor="id">아이디</label>
              <div className={styles.idBox}>
                <input
                  {...register('id', {
                    required: '아이디를 입력하세요.',
                    pattern: {
                      value: /^[a-zA-Z0-9]{5,}$/,
                      message: '2자이상 20자 이하로 입력해주세요.',
                    },
                    onChange: () => {
                      if (checkId) {
                        setCheckId(false);
                      }
                    },
                  })}
                  id="id"
                  type="text"
                  placeholder="영어와 숫자만 입력해주세요"
                />
                <button
                  type="button"
                  onClick={e => checkDuplicateId(getValues('id'), e)}
                >
                  중복체크
                </button>
              </div>
              {checkId ? (
                <span>{checkIdMessage}</span>
              ) : (
                <span>{errors.id?.message}</span>
              )}
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
                  validate: {
                    pwConfirm: value =>
                      getValues('password') !== value
                        ? '비밀번호와 일치하지 않습니다.'
                        : true,
                  },
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
              <div className={styles.back_link}>
                <Link href="/" className={styles.link}>
                  뒤로가기
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      {isModal && portalElement
        ? createPortal(
            <SignUpModal
              handleModal={handleModal}
              formData={formData}
              defaultImgUrl={defaultImgUrl}
            />,
            portalElement,
          )
        : null}
    </>
  );
}
