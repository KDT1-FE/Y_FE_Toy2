import Image from 'next/image';
import React from 'react';
import styles from './SignupLoading.module.scss';

export default function SignupLoading() {
  return (
    <div className={styles.container}>
      <h3>회원가입 중입니다.</h3>
      <Image
        width={45}
        height={45}
        src="/images/Spin-1s-200px.gif"
        alt="loading"
      />
    </div>
  );
}
