import styles from '@styles/pages/signup.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '@hooks/useForm';
import { signup } from '@api/signup';
import { useState } from 'react';
import { validateUser } from '@utils/validate';
import { idCheck } from '@api/idcheck';
import SignupModal from '@components/signup/SignupModal';
import { useAppSelector } from '@/hooks/redux';

const Signup = () => {
  const navigate = useNavigate();

  const [id, onChangeId] = useForm();
  const [name, onChangeName] = useForm();
  const [password, onChangePassword] = useForm();
  const [assurer, onChangeAssurer] = useForm();
  const [errors, setErrors] = useState<Errors>({});
  const [invalidId, setInvalidId] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const character = useAppSelector((state) => state.selectedGhost);

  const register = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const user = {
      id: id,
      name: name,
      password: password,
      assurer: assurer,
      picture: character,
    };
    const newErrors = validateUser(user);

    if (Object.keys(newErrors).length === 0) {
      const validId = await idCheck(user.id);
      console.log(validId);
      if (!validId && character) {
        await signup(id, password, name, character);
        navigate('/');
      } else {
        setInvalidId(true);
      }
    }
    setErrors(newErrors);
  };

  const setProfileStyle = {
    backgroundImage: character
      ? `url(${character})`
      : `url("/src/assets/images/profile.jpeg")`,
  };


  const handleModal: () => void = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.signup}>
      <div className={styles.signup__profile_container}>
        <button
          onClick={() => setIsModalOpen(true)}
          style={setProfileStyle}
          className={styles.signup__profile}></button>
        <p>프로필 선택</p>
      </div>
      <div className={styles.signup__container}>
        <form className={styles.signup__form}>
          <input
            type="text"
            placeholder="ID"
            value={id}
            onChange={onChangeId}
          />
          {errors?.id && (
            <span className={styles.signup__form_error}>{errors?.id}</span>
          )}
          {invalidId && (
            <span className={styles.signup__form_error}>이미 존재하는 아이디입니다.</span>
          )}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={onChangeName}
          />
          {errors?.name && (
            <span className={styles.signup__form_error}>{errors?.name}</span>
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={onChangePassword}
          />
          {errors?.password && (
            <span className={styles.signup__form_error}>{errors?.password}</span>
          )}
          <input
            type="password"
            placeholder="Password"
            value={assurer}
            onChange={onChangeAssurer}
          />
          {errors?.assurer && (
            <span className={styles.signup__form_error}>{errors?.assurer}</span>
          )}
          <button
            className={styles.signup__btn}
            onClick={(event) => register(event)}>
            회원가입
          </button>
        </form>
      </div>
      <div className={styles.signin__link}>
        <Link to="/">로그인하러 가기</Link>
      </div>
      {isModalOpen ? <SignupModal handleModal={handleModal} /> : null}
    </div>
  );
};

export default Signup;

interface Errors {
  id?: string;
  password?: string;
  assurer?: string;
  name?: string;
  validId?: boolean;
}
