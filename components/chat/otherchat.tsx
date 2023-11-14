// OtherMessage.js
import React from 'react';
import Image from 'next/image';
import styles from './Chat.module.scss';

function OtherMessage() {
  return (
    <div className={styles.otherFlex}>
      <div className={styles.userInfo}>
        <Image
          src="https://avatars.githubusercontent.com/u/66263916?v=4"
          alt="프로필 이미지"
          className={styles.profileImage}
        />
        <span className={styles.username}>이름</span>
      </div>
      <div className={styles.otherMessage}>
        <div className={styles.content}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <span>현재시간</span>
      </div>
    </div>
  );
}

export default OtherMessage;
