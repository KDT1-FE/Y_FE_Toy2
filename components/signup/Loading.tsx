import Image from 'next/image';
import React from 'react';
import style from './Loading.module.scss';

export default function Loading() {
  return (
    <div className={style.container}>
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
