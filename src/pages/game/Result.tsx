
import React, { useEffect, useState } from 'react';
import styles from '@styles/pages/result.module.scss';
import { Link } from 'react-router-dom';

// 플레이한 모든 유저의 정보: 닉네임(이름)과 역할

// 게임 결과

const Result = ({ result }: { result?: string }) => {
  const [show, setShow] = useState(false);
  const [victory, setVictory] = useState(true);

  if (result === 'mafia') {
    setVictory(true);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.result}>
      <div className={styles.result__contents}>
        <h1
          className={styles.result__credits}
          style={{ color: `${victory ? 'red' : 'blue'}` }}>
          Credits
        </h1>
        <div className={styles.result__players}>players</div>
        <h1
          className={styles.result__victory_team}
          style={{ color: `${victory ? 'red' : 'blue'}` }}>
          {victory ? '마피아 승리' : '시민 승리'}
        </h1>
        <div className={styles.result__result_text}>
          {victory ? (
            <p>
              시민들은 마피아의 손에 모두 학살 당했습니다.
              <br />
              <br />
              마피아들의 학살은 다시 시작됩니다......
            </p>
          ) : (
            <p>
              시민들은 마피아의 난동 속에서 <br />
              <br /> 마을을 지켜냈습니다.
              <br />
              <br />
              시민들은 평화롭게 일상으로 돌아갔습니다......
            </p>
          )}
        </div>
      </div>
      <div className={styles.result__goback}>
        {show && <Link to="/lobby">돌아가기</Link>}
      </div>
    </div>
  );
};

export default Result