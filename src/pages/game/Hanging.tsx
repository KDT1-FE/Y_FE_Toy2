import React from 'react';
import styles from '@styles/pages/hanging.module.scss';

const Hanging = () => {
  return (
    <div className={styles.hanging}>
      <p className={styles.hanging__result}>
        ‘까칠한영호띠’ 님은 <br />
        <span style={{ color: '#E5427C' }}>무고한 시민</span>이었습니다.
      </p>
      <p className={styles.hanging__message}>
        살려줘!!
        <br />난 아니야... 아니라고 했잖아!!...
      </p>
      <div className={styles.hanging__tree}></div>
      <div className={styles.hanging__leaves}></div>
    </div>
  );
};

export default Hanging;
