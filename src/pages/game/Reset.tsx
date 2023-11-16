import React, { useEffect } from 'react';
import styles from '@styles/pages/reset.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Reset = () => {
  const [searchParams] = useSearchParams();
  const pocketId = searchParams.get('pocketId');
  const chatId = searchParams.get('chatId');
  const navigate = useNavigate();

  useEffect(() => {
    const timerId = setTimeout(() => {
      navigate(`/chat?chatId=${chatId}&pocketId=${pocketId}`);
    }, 3000);

    return clearTimeout(timerId);
  }, []);
  return (
    <div className={styles.reset}>
      <p>
        밤 동안 <span>아무 일도</span> <br />
        일어나지 않았습니다...
      </p>
    </div>
  );
};

export default Reset;
