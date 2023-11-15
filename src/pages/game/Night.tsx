import React from 'react';
import styles from '@styles/pages/night.module.scss';
import GameHeader from '@components/common/GameHeader';

const Night = () => {
  return (
    <div className={styles.night}>
      <GameHeader started={true} title="" timer={5} />
      <div className={styles.night__text}>
        <span>
          밤이 <br /> 되었습니다...
        </span>
      </div>
      <div className={styles.night__img}></div>
    </div>
  );
};

export default Night;
