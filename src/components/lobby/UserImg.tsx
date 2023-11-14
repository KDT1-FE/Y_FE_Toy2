import React from 'react';

import styles from '@styles/components/lobby/userImg.module.scss';

const UserImg = () => {
  const tmpImg =
    'https://full-oil.pockethost.io/api/files/5who7j8fggfy5vg/eu5yc2nn8kv9d61/ghost01_3mNsoBR2XJ.svg?thumb=100x100&token=';

  return (
    <div className={styles.userImg}>
      <img src={tmpImg} alt="유저 프로필" />
    </div>
  );
};

export default UserImg;
